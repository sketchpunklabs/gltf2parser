import Accessor from './Accessor';
import InterleavedBuffer from './InterleavedBuffer';
export declare class Mesh {
    index: number | null;
    name: string | null;
    primitives: Array<Primitive>;
    position: number[] | null;
    rotation: number[] | null;
    scale: number[] | null;
}
export declare class Primitive {
    materialName: string | null;
    materialIdx: number | null;
    indices: Accessor | null;
    position: Accessor | null;
    normal: Accessor | null;
    tangent: Accessor | null;
    texcoord_0: Accessor | null;
    texcoord_1: Accessor | null;
    color_0: Accessor | null;
    joints_0: Accessor | null;
    weights_0: Accessor | null;
    interleaved: InterleavedBuffer | null;
}
