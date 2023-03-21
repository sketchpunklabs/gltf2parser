import { TVec4 } from './types';

/** Blender gamma crrects the colors before creating hex */
function gamma( v:number ){ return (v <= 0.0031308)? v * 12.92 : 1.055 * Math.pow( v, 1.0/2.4) - 0.055; }

function hex( r:number, g:number, b:number ): number{
    return  Math.round( r * 255 ) << 16 |
            Math.round( g * 255 ) << 8  |
            Math.round( b * 255 );
}

function hexString( r:number, g:number, b:number ): string{
    const rr = '0' + Math.round( r * 255 ).toString( 16 );
    const gg = '0' + Math.round( g * 255 ).toString( 16 );
    const bb = '0' + Math.round( b * 255 ).toString( 16 );
    return ( "#" + rr.slice( -2 ) + gg.slice( -2 ) + bb.slice( -2 ) ).toUpperCase();
}

export class Material{
    index       : number  = -1;
    name        : string  = '';
    baseColor   : TVec4   = [0,0,0,1];
    metallic    : number  = 0;
    roughness   : number  = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor( mat: any ){
        this.name = mat.name || window.crypto.randomUUID();
        
        // PBR Settings
        if( mat.pbrMetallicRoughness ){
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // BASE COLOR
            if( mat.pbrMetallicRoughness.baseColorFactor ){
                this.baseColor[ 0 ] = mat.pbrMetallicRoughness.baseColorFactor[0];
                this.baseColor[ 1 ] = mat.pbrMetallicRoughness.baseColorFactor[1];
                this.baseColor[ 2 ] = mat.pbrMetallicRoughness.baseColorFactor[2];
                this.baseColor[ 3 ] = mat.pbrMetallicRoughness.baseColorFactor[3];                    
            }
            
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // OTHER
            this.metallic   = mat.pbrMetallicRoughness.metallicFactor || 0;
            this.roughness  = mat.pbrMetallicRoughness.roughnessFactor || 0;
        }
    }

    get baseColorHex(): number{ return hex( this.baseColor[0], this.baseColor[1], this.baseColor[2] ); }
    get baseColorGammaHex(): number{ return hex( gamma(this.baseColor[0]), gamma(this.baseColor[1]), gamma(this.baseColor[2]) ); }
    get baseColorString(): string{ return hexString( this.baseColor[0], this.baseColor[1], this.baseColor[2] ); }
    get baseColorGammaString(): string{ return hexString( gamma(this.baseColor[0]), gamma(this.baseColor[1]), gamma(this.baseColor[2]) ); }
}