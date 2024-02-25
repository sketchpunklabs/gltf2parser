declare function parseGLB(res: Response): Promise<[JSON, ArrayBuffer] | null>;
export default parseGLB;
