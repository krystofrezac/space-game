const UPDATE_POSITIONS = 'updatePositions';

export type UpdatePositionsPlayers = {
  id: string;
  position: { x: number; y: number };
  angle: number;
}[];

export interface UpdatePositions {
  player: {
    position: { x: number; y: number };
    angle: number;
  };
  players: UpdatePositionsPlayers;
  bullets: {
    position: { x: number; y: number };
    angle: number;
  }[];
}

export default UPDATE_POSITIONS;
