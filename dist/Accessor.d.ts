import { TTypeArray } from "./types";
type TBufferView = {
    byteOffset?: number;
};
type TAccessor = {
    componentType: number;
    type: number;
    count: number;
    byteOffset?: number;
    min?: Array<number>;
    max?: Array<number>;
};
declare class Accessor {
    componentLen: number;
    elementCnt: number;
    byteOffset: number;
    byteSize: number;
    boundMin: Array<number> | null;
    boundMax: Array<number> | null;
    type: string | null;
    data: TTypeArray | null;
    fromBin(accessor: TAccessor, bufView: TBufferView, bin: ArrayBuffer): this;
}
export default Accessor;
