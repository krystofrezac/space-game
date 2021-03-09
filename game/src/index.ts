import Phaser from "phaser";

import config from "./config";
import startNetworkCommunication from "./network";
import GameScene from "./scenes/game";
import MenuScene from "./scenes/menu";

const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: config.window.width,
    height: config.window.height,
  },
  scene: [MenuScene, GameScene],
};

// eslint-disable-next-line no-new
new Phaser.Game(phaserConfig);

startNetworkCommunication();
