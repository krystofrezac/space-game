import { io } from "socket.io-client";
import CONNECT from "@space-game/shared/resolvers/connect";
import Phaser from "phaser";

import config from "./config";
import { setSocket } from "./stores/socket";
import preload from "./preload";
import create from "./create";
import update from "./update";

const socket = io(":4000");
setSocket(socket);
socket.on(CONNECT, () => {
  console.log("connected");
});

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
