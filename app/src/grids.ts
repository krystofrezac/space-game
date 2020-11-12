import Phaser from "phaser";

import { HEIGHT, WIDTH } from "./constants";

interface Grid {
  x: number;
  y: number;
  gameObject: Phaser.GameObjects.Grid;
}

const GRID_HEIGHT = HEIGHT * 2;
const GRID_WIDTH = WIDTH * 2;

let grids: Grid[] = [];

export const setGrids = (newGrids: Grid[]): void => {
  grids = newGrids;
};

export const getGrids = (): Grid[] => grids;

export const createGrid = (
  phaser: Phaser.Scene,
  x: number,
  y: number
): void => {
  grids.push({
    x,
    y,
    gameObject: phaser.add
      .grid(x, y, WIDTH * 2, HEIGHT * 2, 100, 100, 0x000000)
      .setOutlineStyle(0x0f0f0f)
      .setDepth(0),
  });
};

export const updateGrids = (phaser: Phaser.Scene, x: number, y: number) => {
  if (
    !grids.some((grid) => {
      if (y < grid.y + HEIGHT / 2) {
        return true;
      }
    })
  ) {
    createGrid(phaser, x, y);
  }
};
