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

export type Stats = { name: string; doneDamage: number }[];

export interface UpdatePositions {
  player: {
    position: { x: number; y: number };
    angle: number;
    lives: number;
    bullets: number;
    name: string;
    doneDamage: number;
  };
  players: UpdatePositionsPlayers;
  bullets: UpdatePositionsBullets;
  stats: Stats;
}

export default UPDATE_POSITIONS;
