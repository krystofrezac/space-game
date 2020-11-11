import Phaser from "phaser";

import create from "./create";
import preload from "./preload";
import { HEIGHT, WIDTH } from "./constants";
import update from "./update";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: WIDTH,
    height: HEIGHT,
  },
  physics: {
    default: "arcade",
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
