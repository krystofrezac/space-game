import { UpdatePositions } from "@space-game/shared/resolvers/updatePositions";
import Phaser from "phaser";

import { getPlayer, setPlayer } from "../stores/player";
import { setUpdatePlayers } from "../stores/updatePlayers";
import { setUpdateBullets } from "../stores/updateBullets";
import { getStats, setStats } from "../stores/stats";
import { getArrow } from "../stores/arrow";
import config from "../config";

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

  const stats = getStats();
  if (stats) {
    let statsText = "player          done damage\n";
    statsText += args.stats
      .map((s) => `${s.name.padEnd(15).slice(0, 15)} ${s.doneDamage}`)
      .join("\n");

    stats?.setText(statsText);
    setStats(stats);
  }

  const arrow = getArrow();
  if (arrow && player) {
    if (args.bestPlayerAngle) {
      const arrowPosition = new Phaser.Math.Vector2(config.arrowDistance, 0);
      arrowPosition.setAngle(args.bestPlayerAngle - Math.PI / 2);
      arrowPosition.add(
        new Phaser.Math.Vector2(args.player.position.x, args.player.position.y)
      );

      arrow.setPosition(arrowPosition.x, arrowPosition.y);
      arrow.setAngle(Phaser.Math.RadToDeg(args.bestPlayerAngle));
      arrow?.setVisible(true);
    } else {
      arrow?.setVisible(false);
    }
  }
};

export default updatePositions;
