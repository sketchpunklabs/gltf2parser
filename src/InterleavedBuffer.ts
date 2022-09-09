/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentVarMap } from './structs';

class Attrib{
    byteOffset   = 0;
    componentLen = 0;
    boundMin : Array<number> | null = null;
    boundMax : Array<number> | null = null;

    constructor( accID: number, json:any ){
        const accessor    = json.accessors[ accID ];
        this.componentLen = ComponentVarMap[ accessor.type ];
        this.byteOffset   = accessor.byteOffset;
        this.boundMin     = ( accessor.min )? accessor.min.slice( 0 ) : null;
        this.boundMax     = ( accessor.max )? accessor.max.slice( 0 ) : null;
    }
}

// TODO: Assuming all the data is FLOAT, this might not be the case where color might be saved as Uint8 instead of a Float.
export default class InterleavedBuffer{
    data : Float32Array | null  = null;
    elementCnt                  = 0;
    componentLen                = 0;
    byteStride                  = 0;
    byteSize                    = 0;

    position    : Attrib | null = null;
    normal      : Attrib | null = null;
    tangent     : Attrib | null = null;
    texcoord_0  : Attrib | null = null;
    texcoord_1  : Attrib | null = null;
    color_0     : Attrib | null = null;
    joints_0    : Attrib | null = null;
    weights_0   : Attrib | null = null;

    constructor( attr:any, json:any, bin: ArrayBuffer ){
        // Going to assume that position is always available when dealing with interleaved mesh geometry
        const accessor      = json.accessors[ attr.POSITION ];
        const bView         = json.bufferViews[ accessor.bufferView ];
        
        this.elementCnt     = accessor.count;       // vert count basiclly
        this.byteStride     = bView.byteStride;
        this.byteSize       = bView.byteLength;
        this.componentLen   = this.byteStride / 4;  // Total Floats = Total Bytes divided by 4 byte per floats
        
        this.position       = new Attrib( attr.POSITION, json );

        if( attr.NORMAL     != undefined ) this.normal     = new Attrib( attr.NORMAL, json );
        if( attr.TANGENT    != undefined ) this.tangent    = new Attrib( attr.TANGENT, json );
        if( attr.TEXCOORD_0 != undefined ) this.texcoord_0 = new Attrib( attr.TEXCOORD_0, json );
        if( attr.TEXCOORD_1 != undefined ) this.texcoord_1 = new Attrib( attr.TEXCOORD_1, json );
        if( attr.JOINTS_0   != undefined ) this.joints_0   = new Attrib( attr.JOINTS_0, json );
        if( attr.WEIGHTS_0  != undefined ) this.weights_0  = new Attrib( attr.WEIGHTS_0, json );
        if( attr.COLOR_0    != undefined ) this.color_0    = new Attrib( attr.COLOR_0, json );

        if( bin ){
            this.data = new Float32Array( bin, bView.byteOffset || 0, this.elementCnt * this.componentLen );
        }
    }
}