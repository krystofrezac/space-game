import Phaser from "phaser";
import io, { Socket } from "socket.io-client";

import create from "./create";
import preload from "./preload";
import { HEIGHT, WIDTH } from "./constants";
import update from "./update";
import { getPlayer, setPlayer } from "./player";
import { setSocket } from "./socket";

const socket: Socket = io(":4000");
setSocket(socket);
socket.on("connected", () => {
  console.log("connected");
});

socket.on("update", (payload) => {
  const player = getPlayer();
  if (player) {
    player.setPosition(payload.position.x, payload.position.y);
    setPlayer(player);
  }
});

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
