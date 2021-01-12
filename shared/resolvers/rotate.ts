const ROTATE = 'rotate';

export enum Rotation {
  'NONE',
  'RIGHT',
  'LEFT',
}

export interface Rotate {
  rotation: Rotation;
}

export default ROTATE;
