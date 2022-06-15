import parseGLB from './Glb';
import Accessor from './Accessor';
import { Mesh, Primitive } from './Mesh';
import { Skin, SkinJoint } from './Skin';
import { Animation, Track, ETransform, ELerp } from './Animation';
import { Texture } from './Texture';
import { Pose } from './Pose';
declare class Gltf2Parser {
    json: any;
    bin: ArrayBuffer;
    constructor(json: any, bin?: ArrayBuffer | null);
    getNodeByName(n: string): [any, number] | null;
    getMeshNames(): Array<string>;
    getMeshByName(n: string): [any, number] | null;
    getMeshNodes(idx: number): Array<any>;
    getMesh(id: string | number | undefined): Mesh | null;
    getSkinNames(): Array<string>;
    getSkinByName(n: string): [any, number] | null;
    getSkin(id: string | number | undefined): Skin | null;
    getMaterial(id: number | undefined): any;
    getTexture(id: number): Texture | null;
    getAnimationNames(): Array<string>;
    getAnimationByName(n: string): [any, number] | null;
    getAnimation(id: string | number | undefined): any;
    getPoseByName(n: string): [any, number] | null;
    getPose(id?: string): Pose | null;
    parseAccessor(accID: number): Accessor | null;
    static fetch(url: string): Promise<Gltf2Parser | null>;
}
export default Gltf2Parser;
export { parseGLB, Accessor, Texture, Pose, Mesh, Primitive, Skin, SkinJoint, Animation, Track, ETransform, ELerp, };