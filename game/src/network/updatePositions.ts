import { UpdatePositions } from "@space-game/shared/resolvers/updatePositions";
import Phaser from "phaser";

import { getPlayer, setPlayer } from "../stores/player";
import { setUpdatePlayers } from "../stores/updatePlayers";

const updatePositions = (args: UpdatePositions): void => {
  const player = getPlayer();
  if (player) {
    player.setPosition(args.player.position.x, args.player.position.y);
    player.setAngle(Phaser.Math.RadToDeg(args.player.angle));
    setPlayer(player);
  }

  setUpdatePlayers(args.players);
};

export default updatePositions;
