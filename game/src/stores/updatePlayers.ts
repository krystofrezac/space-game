import { UpdatePositionsPlayers } from "@space-game/shared/resolvers/updatePositions";

let players: UpdatePositionsPlayers = [];

export const setUpdatePlayers = (newPlayers: UpdatePositionsPlayers): void => {
  players = newPlayers;
};

export const getUpdatePlayers = (): UpdatePositionsPlayers => {
  return players;
};
