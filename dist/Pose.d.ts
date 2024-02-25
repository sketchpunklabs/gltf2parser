declare class PoseJoint {
    index: number;
    rot?: number[];
    pos?: number[];
    scl?: number[];
    constructor(idx: number, rot?: number[], pos?: number[], scl?: number[]);
}
declare class Pose {
    name: string;
    joints: Array<PoseJoint>;
    constructor(name?: string);
    add(idx: number, rot?: number[], pos?: number[], scl?: number[]): void;
}
export { Pose, PoseJoint };
