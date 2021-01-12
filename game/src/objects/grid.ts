import Phaser from "phaser";

import config from "../config";
import { getPlayer } from "../stores/player";

const grids: Phaser.GameObjects.Grid[] = [];

export const createGrid = (
  phaser: Phaser.Scene,
  x: number,
  y: number
): void => {
  grids.push(
    phaser.add
      .grid(
        x,
        y,
        config.window.width * 2,
        config.window.height * 2,
        100,
        100,
        0x000000
      )
      .setOutlineStyle(0x0f0f0f)
      .setDepth(config.depths.grid)
  );
};

export const checkGrids = (phaser: Phaser.Scene): void => {
  const player = getPlayer();
  if (!player) return;

  const checkPoints = [
    new Phaser.Math.Vector2(player.x, player.y),
    /* new Phaser.Math.Vector2(player.x - config.grid.width, 0),
    new Phaser.Math.Vector2(
      player.x - config.grid.width,
      player.y + config.grid.height
    ),
    new Phaser.Math.Vector2(0, player.y + config.grid.height),
    new Phaser.Math.Vector2(
      player.x + config.grid.width,
      player.y + config.grid.height
    ),
    new Phaser.Math.Vector2(player.x + config.grid.width, 0),
    new Phaser.Math.Vector2(
      player.x + config.grid.width,
      player.y - config.grid.height
    ),
    new Phaser.Math.Vector2(0, player.y - config.grid.height),
    new Phaser.Math.Vector2(
      player.x - config.grid.width,
      player.y - config.grid.height
    ),
    
     */
  ];

  checkPoints.forEach((checkPoint) => {
    if (
      !grids.some((grid) =>
        grid.getBounds().contains(checkPoint.x, checkPoint.y)
      )
    ) {
      console.log(player.x, player.y, checkPoint.x, checkPoint.y);

      const getX = (x: number): number =>
        checkPoint.x -
        (checkPoint.x % config.grid.width) +
        (config.grid.width / 2) * x;
      const getY = (y: number): number =>
        checkPoint.y -
        (checkPoint.y % config.grid.height) +
        (config.grid.height / 2) * y;

      if (checkPoint.x <= 0 && checkPoint.y >= 0) {
        console.log(getX(-1), getY(1));
        createGrid(phaser, getX(-1), getY(1));
      } else if (checkPoint.x <= 0 && checkPoint.y <= 0) {
        console.log(getX(-1), getY(-1));
        createGrid(phaser, getX(-1), getY(-1));
      } else if (checkPoint.x >= 0 && checkPoint.y >= 0) {
        console.log(getX(1), getY(1));
        createGrid(phaser, getX(1), getY(1));
      } else if (checkPoint.x >= 0 && checkPoint.y <= 0) {
        console.log(getX(1), getY(-1));
        createGrid(phaser, getX(1), getY(-1));
      }
    }
  });
};
