import type Gltf2Parser     from './index';
import { TVec4 }            from './types';
import Texture              from './Texture';

/*
"materials": [{
    "pbrMetallicRoughness": {
       "baseColorTexture": { "index": 1 },
       "baseColorFactor": [ 1.0, 0.75, 0.35, 1.0 ],
       "metallicRoughnessTexture": { "index": 5 },
       "metallicFactor": 1.0,
       "roughnessFactor": 0.0
     },
     "normalTexture": { "index": 2 },
     "occlusionTexture": {
       "index": 4,
       "strength": 0.9
     },
     "emissiveTexture": { "index": 3 },
     "emissiveFactor": [0.4, 0.8, 0.6],
     "alphaMode": "OPAQUE",
     "doubleSided": true,
   }]
*/

export class Material{
    index       : number  = -1;
    name        : string  = '';
    metallic    : number  = 0;
    roughness   : number  = 0;
    baseTexture : Texture | null = null;
    baseColor   : TVec4 | null   = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor( mat: any, parser: Gltf2Parser ){
        this.name = mat.name || window.crypto.randomUUID();
        
        // PBR Settings
        if( mat.pbrMetallicRoughness ){
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // BASE
            if( mat.pbrMetallicRoughness.baseColorFactor ){
                this.baseColor = mat.pbrMetallicRoughness.baseColorFactor[0];
            }

            if( mat.pbrMetallicRoughness.baseColorTexture ){
                this.baseTexture = Texture.fromIndex( mat.pbrMetallicRoughness.baseColorTexture.index, parser );
            }
            
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // OTHER
            this.metallic  = mat.pbrMetallicRoughness.metallicFactor  || 0;
            this.roughness = mat.pbrMetallicRoughness.roughnessFactor || 0;
        }
    }

    // get baseColorHex(): number{ return hex( this.baseColor[0], this.baseColor[1], this.baseColor[2] ); }
    // get baseColorGammaHex(): number{ return hex( gamma(this.baseColor[0]), gamma(this.baseColor[1]), gamma(this.baseColor[2]) ); }
    // get baseColorString(): string{ return hexString( this.baseColor[0], this.baseColor[1], this.baseColor[2] ); }
    // get baseColorGammaString(): string{ return hexString( gamma(this.baseColor[0]), gamma(this.baseColor[1]), gamma(this.baseColor[2]) ); }
}


// function gamma( v:number ){ 
//     return ( v <= 0.0031308 )? 
//         v * 12.92 : 
//         1.055 * Math.pow( v, 1.0/2.4) - 0.055;
// }

// function hex( r:number, g:number, b:number ): number{
//     return  Math.round( r * 255 ) << 16 |
//             Math.round( g * 255 ) << 8  |
//             Math.round( b * 255 );
// }

// function hexString( r:number, g:number, b:number ): string{
//     const rr = '0' + Math.round( r * 255 ).toString( 16 );
//     const gg = '0' + Math.round( g * 255 ).toString( 16 );
//     const bb = '0' + Math.round( b * 255 ).toString( 16 );
//     return ( "#" + rr.slice( -2 ) + gg.slice( -2 ) + bb.slice( -2 ) ).toUpperCase();
// }