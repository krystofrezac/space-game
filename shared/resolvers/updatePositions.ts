import matter from 'matter-js';

const UPDATE_POSITIONS = 'updatePositions';

export interface UpdatePositions {
  player: {
    position: matter.Vector;
    angle: number;
  };
  players: {
    position: matter.Vector;
    angle: number;
  }[];
}

export default UPDATE_POSITIONS;
