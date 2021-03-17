import { UpdatePositions } from "@space-game/shared/resolvers/updatePositions";
import Phaser from "phaser";

import { getPlayer, setPlayer } from "../stores/player";
import { setUpdatePlayers } from "../stores/updatePlayers";
import { setUpdateBullets } from "../stores/updateBullets";

const updatePositions = (args: UpdatePositions): void => {
  const player = getPlayer();
  if (player?.body) {
    player.body.setPosition(args.player.position.x, args.player.position.y);
    player.body.setAngle(Phaser.Math.RadToDeg(args.player.angle));
    player.lives.setText(`${args.player.lives}`);
    player.name.setText(args.player.name);
    player.bullets.setText(`Bullets: ${args.player.bullets}`);
    player.doneDamage.setText(`Done damage: ${args.player.doneDamage}`);
    setPlayer(player);
  }

  setUpdatePlayers(args.players);
  setUpdateBullets(args.bullets);
};

export default updatePositions;
