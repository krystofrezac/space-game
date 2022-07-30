import Phaser from "phaser";

import config from "./config";
import startNetworkCommunication from "./network";
import GameScene from "./scenes/game";
import MenuScene from "./scenes/menu";
import DeathScene from "./scenes/death";


const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  dom: {
    createContainer: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: config.window.width,
    height: config.window.height,
  },
  scene: [MenuScene, GameScene, DeathScene],
};

// eslint-disable-next-line no-new
const game = new Phaser.Game(phaserConfig);

startNetworkCommunication(game);
