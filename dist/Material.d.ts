import { TVec4 } from './types';
export declare class Material {
    index: number;
    name: string;
    baseColor: TVec4;
    metallic: number;
    roughness: number;
    constructor(mat: any);
    get baseColorHex(): number;
    get baseColorGammaHex(): number;
    get baseColorString(): string;
    get baseColorGammaString(): string;
}
