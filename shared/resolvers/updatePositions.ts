const UPDATE_POSITIONS = 'updatePositions';

export type UpdatePositionsPlayers = {
  id: string;
  position: { x: number; y: number };
  angle: number;
  lives: number;
  name: string;
}[];

export type UpdatePositionsBullets = {
  id: string;
  position: { x: number; y: number };
  angle: number;
}[];

export interface UpdatePositions {
  player: {
    position: { x: number; y: number };
    angle: number;
    lives: number;
    bullets: number;
    name: string;
  };
  players: UpdatePositionsPlayers;
  bullets: UpdatePositionsBullets;
}

export default UPDATE_POSITIONS;
