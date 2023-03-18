import { TVec4 } from './types';

export class Material{
    index       : number  = -1;
    name        : string  = '';
    baseColor   : number  = 0;
    baseColorGL : TVec4   = [0,0,0,1];
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
                this.baseColorGL[ 0 ] = mat.pbrMetallicRoughness.baseColorFactor[0];
                this.baseColorGL[ 1 ] = mat.pbrMetallicRoughness.baseColorFactor[1];
                this.baseColorGL[ 2 ] = mat.pbrMetallicRoughness.baseColorFactor[2];
                this.baseColorGL[ 3 ] = mat.pbrMetallicRoughness.baseColorFactor[3];

                this.baseColor = 
                    Math.round( this.baseColorGL[ 0 ] * 255 ) << 16 |
                    Math.round( this.baseColorGL[ 1 ] * 255 ) << 8  |
                    Math.round( this.baseColorGL[ 2 ] * 255 );
            }
            
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // OTHER
            this.metallic   = mat.pbrMetallicRoughness.metallicFactor || 0;
            this.roughness  = mat.pbrMetallicRoughness.roughnessFactor || 0;
        }

    }
}