import Phaser from "phaser";

import config from "./config";
import preload from "./preload";
import create from "./create";
import update from "./update";
import startNetworkCommunication from "./network";

const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: config.window.width,
    height: config.window.height,
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(phaserConfig);

startNetworkCommunication();
