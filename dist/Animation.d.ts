import type Accessor from './Accessor';
type Transform = typeof ETransform[keyof typeof ETransform];
export declare const ETransform: {
    readonly Rot: 0;
    readonly Pos: 1;
    readonly Scl: 2;
};
type Lerp = typeof ELerp[keyof typeof ELerp];
export declare const ELerp: {
    readonly Step: 0;
    readonly Linear: 1;
    readonly Cubic: 2;
};
export declare class Track {
    static Transform: {
        readonly Rot: 0;
        readonly Pos: 1;
        readonly Scl: 2;
    };
    static Lerp: {
        readonly Step: 0;
        readonly Linear: 1;
        readonly Cubic: 2;
    };
    transform: Transform;
    interpolation: Lerp;
    jointIndex: number;
    timeStampIndex: number;
    keyframes: Accessor;
    static fromGltf(jointIdx: number, target: string, inter: string): Track;
}
export declare class Animation {
    name: string;
    timestamps: Array<Accessor>;
    tracks: Array<Track>;
    constructor(name?: string);
}
export {};
