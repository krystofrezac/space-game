import Phaser from "phaser";

import config from "../config";

export const createGrid = (
  phaser: Phaser.Scene,
  x: number,
  y: number
): void => {
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
    .setDepth(0);
};
