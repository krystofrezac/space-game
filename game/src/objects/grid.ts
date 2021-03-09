import Phaser from "phaser";

import config from "../config";
import { getPlayer } from "../stores/player";

const grids: Phaser.GameObjects.Grid[] = [];

let gridIndex = 0;
export const createGrid = (
  phaser: Phaser.Scene,
  x: number,
  y: number
): Phaser.GameObjects.Grid => {
  const grid = phaser.add
    .grid(
      x,
      y,
      config.window.width * 2,
      config.window.height * 2,
      100,
      100,
      0x000000
    )
    .setOutlineStyle(0x2f2f2f)
    .setDepth(config.depths.grid);

  grid.name = `grid-${gridIndex}`;
  grids.push(grid);
  gridIndex++;

  return grid;
};

export const checkGrids = (phaser: Phaser.Scene): void => {
  const player = getPlayer();
  if (!player) return;

  const activeGrids: string[] = [];

  const checkPoints = [
    new Phaser.Math.Vector2(player.body.x, player.body.y),
    new Phaser.Math.Vector2(player.body.x - config.grid.width, player.body.y),
    new Phaser.Math.Vector2(
      player.body.x - config.grid.width,
      player.body.y + config.grid.height
    ),
    new Phaser.Math.Vector2(player.body.x, player.body.y + config.grid.height),
    new Phaser.Math.Vector2(
      player.body.x + config.grid.width,
      player.body.y + config.grid.height
    ),
    new Phaser.Math.Vector2(player.body.x + config.grid.width, player.body.y),
    new Phaser.Math.Vector2(
      player.body.x + config.grid.width,
      player.body.y - config.grid.height
    ),
    new Phaser.Math.Vector2(player.body.x, player.body.y - config.grid.height),
    new Phaser.Math.Vector2(
      player.body.x - config.grid.width,
      player.body.y - config.grid.height
    ),
  ];

  checkPoints.forEach((checkPoint) => {
    if (
      !grids.some((grid): boolean => {
        if (grid.getBounds().contains(checkPoint.x, checkPoint.y)) {
          activeGrids.push(grid.name);

          return true;
        }

        return false;
      })
    ) {
      const getX = (x: number): number =>
        checkPoint.x -
        (checkPoint.x % config.grid.width) +
        (config.grid.width / 2) * x;
      const getY = (y: number): number =>
        checkPoint.y -
        (checkPoint.y % config.grid.height) +
        (config.grid.height / 2) * y;

      if (checkPoint.x <= 0 && checkPoint.y >= 0) {
        activeGrids.push(createGrid(phaser, getX(-1), getY(1)).name);
      } else if (checkPoint.x <= 0 && checkPoint.y <= 0) {
        activeGrids.push(createGrid(phaser, getX(-1), getY(-1)).name);
      } else if (checkPoint.x >= 0 && checkPoint.y >= 0) {
        activeGrids.push(createGrid(phaser, getX(1), getY(1)).name);
      } else if (checkPoint.x >= 0 && checkPoint.y <= 0) {
        activeGrids.push(createGrid(phaser, getX(1), getY(-1)).name);
      }
    }
  });

  const inactiveGrids = grids.filter(
    (grid) => !activeGrids.some((activeGrid) => activeGrid === grid.name)
  );
  inactiveGrids.forEach((inactiveGrid) => {
    inactiveGrid.destroy();
    grids.splice(
      grids.findIndex((grid) => grid.name === inactiveGrid.name),
      1
    );
  });
};
