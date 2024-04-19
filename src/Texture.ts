import type Gltf2Parser from './index';

/*
https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#texture-data

json.textures[0] = {sampler: 0, source: 0};
json.samplers[0] = {magFilter: 9729, minFilter: 9987}
json.images[0]   = {mimeType: 'image/jpeg', name: 'pete_texture', uri: 'pete_texture.jpg'}
*/

export default class Texture{
    index      : number         = -1;   // Index in Texture Collection
    name       : string         = '';   // Texture Name
    mime       : string         = '';   // Texture Mime
    uri        : string         = '';   // Path
    blob       : Blob | null    = null; // Image Binary

    static fromIndex( idx: number, parser: Gltf2Parser ): Texture {
        const tex = new Texture();
        tex.index = idx;

        const info = parser.json.textures[ idx ];
        const src  = parser.json.images[ info.source ];
        tex.name = src.name;
        tex.mime = src.mimeType;

        if( src.uri ) tex.uri = src.uri;

        if( src.bufferView != null ){
            const bv   = parser.json.bufferViews[ src.bufferView ];
            const bAry = new Uint8Array( parser.bin, bv.byteOffset, bv.byteLength );
            tex.blob   = new Blob( [ bAry ], { type: src.mimeType } );
        }

        return tex;
    }
}