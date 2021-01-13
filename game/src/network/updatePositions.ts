import { UpdatePositions } from "@space-game/shared/resolvers/updatePositions";
import Phaser from "phaser";

import { getPlayer, setPlayer } from "../stores/player";

const updatePositions = (args: UpdatePositions): void => {
  const player = getPlayer();
  console.log(args.players);
  if (player) {
    player.setPosition(args.player.position.x, args.player.position.y);
    player.setAngle(Phaser.Math.RadToDeg(args.player.angle));
    setPlayer(player);
  }
};

export default updatePositions;
