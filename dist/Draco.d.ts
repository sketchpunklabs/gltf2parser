import type { Primitive } from './Mesh';
import Accessor from './Accessor';
export default class Draco {
    mod: any;
    decoder: any;
    mesh: any;
    faceCnt: number;
    vertCnt: number;
    constructor(mod: any);
    dispose(): void;
    loadMesh(bin: ArrayBuffer, offset: number, len: number): this;
    loadPrimitive(prim: Primitive, dAttr: any, gAttr: any, json: any): void;
    parseAttribute(dIdx: number, gIdx: number, json: any): Accessor;
    decodeAttributeData(id: any, type: string, len: number): any;
}
