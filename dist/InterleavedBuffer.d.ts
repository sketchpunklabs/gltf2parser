declare class Attrib {
    byteOffset: number;
    componentLen: number;
    boundMin: Array<number> | null;
    boundMax: Array<number> | null;
    constructor(accID: number, json: any);
}
export default class InterleavedBuffer {
    data: Float32Array | null;
    elementCnt: number;
    componentLen: number;
    byteStride: number;
    byteSize: number;
    position: Attrib | null;
    normal: Attrib | null;
    tangent: Attrib | null;
    texcoord_0: Attrib | null;
    texcoord_1: Attrib | null;
    color_0: Attrib | null;
    joints_0: Attrib | null;
    weights_0: Attrib | null;
    constructor(attr: any, json: any, bin: ArrayBuffer);
}
export {};
