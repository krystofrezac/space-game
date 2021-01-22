import { UpdatePositionsBullets } from "@space-game/shared/resolvers/updatePositions";

let bullets: UpdatePositionsBullets = [];

export const setUpdateBullets = (newBullets: UpdatePositionsBullets): void => {
  bullets = newBullets;
};

export const getUpdateBullets = (): UpdatePositionsBullets => {
  return bullets;
};
