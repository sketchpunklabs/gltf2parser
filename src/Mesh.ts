import Accessor          from './Accessor';
import InterleavedBuffer from './InterleavedBuffer';

// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-mesh
// https://github.com/KhronosGroup/glTF-Tutorials/blob/main/gltfTutorial/gltfTutorial_018_MorphTargets.md

export class Mesh{
    index           : number | null      = null;    // Index in Mesh Collection
    name            : string | null      = null;    // Mesh Name
    primitives      : Array<Primitive>   = [];      // Mesh is made up of more then one Primative
    
    position        : number[] | null = null;       // Node's Position
    rotation        : number[] | null = null;       // Node's Rotation
    scale           : number[] | null = null;       // Node's Scale

    morphTargets    : string[] | null = null;       // Other version of the mesh
}

export class Primitive{
    materialName    : string | null   = null;
    materialIdx     : number | null   = null;

    indices         : Accessor | null = null;
    position        : Accessor | null = null;
    normal          : Accessor | null = null;
    tangent         : Accessor | null = null;
    texcoord_0      : Accessor | null = null;
    texcoord_1      : Accessor | null = null;
    color_0         : Accessor | null = null;
    joints_0        : Accessor | null = null;
    weights_0       : Accessor | null = null;

    interleaved     : InterleavedBuffer | null = null;
}
