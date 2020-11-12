import Phaser from "phaser";
import io, { Socket } from "socket.io-client";

import create from "./create";
import preload from "./preload";
import { HEIGHT, WIDTH } from "./constants";
import update from "./update";
import { getPlayer, setPlayer } from "./player";
import { setSocket } from "./socket";
import { getObjects, setObjects } from "./objects";

const socket: Socket = io(":4000");
setSocket(socket);
socket.on("connected", () => {
  console.log("connected");
});

socket.on("update", (payload) => {
  const player = getPlayer();
  if (player) {
    const serverPlayer = payload.player;
    player.setPosition(serverPlayer.position.x, serverPlayer.position.y);
    player.setAngle(Phaser.Math.RadToDeg(serverPlayer.angle));
    setPlayer(player);
  }

  const objects = getObjects();
  const serverObjects = payload.objects;
  const oldObjects = objects.filter(
    (o) => serverObjects.some((so) => o.id === so.id) && o.image
  );
  oldObjects.forEach((o) => {
    const serverObject = serverObjects.find((so) => so.id === o.id);
    o.image.setPosition(serverObject.position.x, serverObject.position.y);
    o.image.setAngle(Phaser.Math.RadToDeg(serverObject.angle));
  });

  const newObjects = serverObjects.filter(
    (so) => !objects.some((o) => o.id === so.id)
  );

  setObjects([...objects, ...newObjects]);
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
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
