export declare class Skin {
    index: number | null;
    name: string | null;
    joints: Array<SkinJoint>;
    position: number[] | null;
    rotation: number[] | null;
    scale: number[] | null;
}
export declare class SkinJoint {
    name: string | null;
    index: number | null;
    parentIndex: number | null;
    bindMatrix: number[] | null;
    position: number[] | null;
    rotation: number[] | null;
    scale: number[] | null;
}
