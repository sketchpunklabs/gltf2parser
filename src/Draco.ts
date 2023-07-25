/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Primitive }                       from './Mesh';
import { ComponentTypeMap, ComponentVarMap }    from './structs';
import Accessor                                 from './Accessor';


// https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
// https://codelabs.developers.google.com/codelabs/draco-3d/index.html#4
// https://snyk.io/advisor/npm-package/draco3d/functions/draco3d.createDecoderModule


export default class Draco{
    // #region MAIN
    mod     : any;
    decoder : any;

    mesh     : any;
    faceCnt  : number = 0;
    vertCnt  : number = 0;

    constructor( mod: any ){
        this.mod        = mod;
        this.decoder    = new this.mod.Decoder();
    }
    // #endregion

    // #region METHODS
    dispose(){
        this.mod.destroy( this.decoder );
        if( this.mesh ) this.mod.destroy( this.mesh );
        this.mod = null;
    }
    
    // Decode BIN data into Draco Mesh Data
    loadMesh( bin: ArrayBuffer, offset:number, len: number ): this{
        const slice = new Int8Array( bin, offset, len );    // Slice out the bin with what needs to be decoded
        const buf   = new this.mod.DecoderBuffer();
        buf.Init( slice, slice.byteLength );                // Load up Buffer

        this.mesh = new this.mod.Mesh();
        this.decoder.DecodeBufferToMesh( buf, this.mesh );  // Decode into mesh data
        this.mod.destroy( buf );                            // cleanup

        this.faceCnt = this.mesh.num_faces()
        this.vertCnt = this.mesh.num_points();

        // console.log( 'MeshFaces',   this.faceCnt );
        // console.log( 'MeshPoints',  this.vertCnt );
        return this;
    }
    // #endregion

    // #region HELPERS
    // Load all the attributes of a primitive
    loadPrimitive( prim: Primitive, dAttr: any, gAttr: any, json:any ): void{
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if( dAttr.POSITION   != undefined ) prim.position   = this.parseAttribute( dAttr.POSITION, gAttr.POSITION, json );
        if( dAttr.NORMAL     != undefined ) prim.normal     = this.parseAttribute( dAttr.NORMAL, gAttr.NORMAL, json );
        if( dAttr.TEXCOORD_0 != undefined ) prim.texcoord_0 = this.parseAttribute( dAttr.TEXCOORD_0, gAttr.TEXCOORD_0, json );
        
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Pull the indices data

        // TODO: fix up a way to test how many verts there are then toggle between Uint16 and Uint32
        const tAry = new Uint32Array( this.faceCnt * 3 );
        const dAry = new this.mod.DracoUInt32Array();
        let ii;
        for( let i=0; i < this.faceCnt; i++ ){
            this.decoder.GetFaceFromMesh( this.mesh, i, dAry );
            ii           = i * 3;
            tAry[ ii+0 ] = dAry.GetValue( 0 );
            tAry[ ii+1 ] = dAry.GetValue( 1 );
            tAry[ ii+2 ] = dAry.GetValue( 2 );
        }
        this.mod.destroy( dAry );
        
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Create final payload for indices
        prim.indices                = new Accessor();
        prim.indices.componentLen   = 1;
        prim.indices.elementCnt     = this.faceCnt;
        prim.indices.byteSize       = tAry.byteLength;
        prim.indices.data           = tAry;
        prim.indices.type           = 'UNSIGNED_INT';

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Cleanup
        this.mod.destroy( this.mesh );
        
        this.mesh    = undefined;
        this.faceCnt = 0;
        this.vertCnt = 0;
    }

    // Parse Mesh Attribute
    parseAttribute( dIdx:number, gIdx:number, json: any ): Accessor{
        // Get attribute's ID
        const accessor = json.accessors[ gIdx ];
        const id       = this.decoder.GetAttributeByUniqueId( this.mesh, dIdx );

        // Setup Accessor
        const out        = new Accessor();
        const compByte   = ComponentTypeMap[ accessor.componentType ][0]; // How many bytes for 1 component
        const dType      = ComponentTypeMap[ accessor.componentType ][3]; // Data Type Name

        out.componentLen = ComponentVarMap[ accessor.type ];               // How many Components in Value
        out.elementCnt   = accessor.count;                                 // Like, How many Vector3s exist?
        out.byteSize     = out.elementCnt * out.componentLen * compByte;
        out.boundMin     = ( accessor.min )? accessor.min.slice( 0 ) : null;
        out.boundMax     = ( accessor.max )? accessor.max.slice( 0 ) : null;
        out.type         = ComponentTypeMap[ accessor.componentType ][2];

        // Decode data from mesh
        out.data         = this.decodeAttributeData( id, dType, out.componentLen * this.vertCnt );

        return out;
    }

    // Decoding attribute data from DracoMesh
    decodeAttributeData( id: any, type:string, len:number ){
        let tAry: any;
        let dAry: any;
        switch( type ){
            case 'BYTE':
                tAry = new Uint8Array( len );
                dAry = new this.mod.DracoInt8Array();
                this.decoder.GetAttributeInt8ForAllPoints( this.mesh, id, dAry );
                return dAry;

            case 'UNSIGNED_BYTE':
                tAry = new Int16Array( len );
                dAry = new this.mod.DracoUInt8Array();
                this.decoder.GetAttributeUInt8ForAllPoints( this.mesh, id, dAry );
                break;

            case 'SHORT':
                tAry = new Int16Array( len );
                dAry = new this.mod.DracoInt16Array();
                this.decoder.GetAttributeInt16ForAllPoints( this.mesh, id, dAry );
                break;

            case 'UNSIGNED_SHORT':
                tAry = new Uint16Array( len );
                dAry = new this.mod.DracoUInt16Array();
                this.decoder.GetAttributeUInt16ForAllPoints( this.mesh, id, dAry );
                break;

            case 'UNSIGNED_INT':
                tAry = new Uint32Array( len );
                dAry = new this.mod.DracoUInt32Array();
                this.decoder.GetAttributeUInt32ForAllPoints( this.mesh, id, dAry );
                break;

            case 'FLOAT':
                tAry = new Float32Array( len );
                dAry = new this.mod.DracoFloat32Array();
                this.decoder.GetAttributeFloatForAllPoints( this.mesh, id, dAry );
                break;
        }

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Copy data to a type array & clean up
        for( let i=0; i < len; i++ ) tAry[ i ] = dAry.GetValue( i );
        this.mod.destroy( dAry );

        return tAry;
    }
    // #endregion
}