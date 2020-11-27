const MOVE = "move";

export enum Direction {
  "NONE",
  "FORWARD",
  "BACK",
}

export interface Move {
  direction: Direction;
}

export default MOVE;
