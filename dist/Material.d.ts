import { TVec4 } from './types';
export declare class Material {
    index: number;
    name: string;
    baseColor: number;
    baseColorGL: TVec4;
    metallic: number;
    roughness: number;
    constructor(mat: any);
}
