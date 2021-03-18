import { setPlayer } from "../../../stores/player";
import config from "../../../config";
import { setStats } from "../../../stores/stats";
import { setArrow } from "../../../stores/arrow";

function create(phaser: Phaser.Scene): void {
  const player = phaser.add.image(0, 0, "player");
  phaser.cameras.main.startFollow(player);
  phaser.cameras.main.setZoom(0.5);

  const lives = phaser.add.text(0, 0, "100", {
    font: "4em",
    color: "#ff0044",
    align: "center",
  });
  const name = phaser.add.text(0, 0, "", {
    font: "4em",
    color: "#ff0044",
    align: "center",
    fixedWidth: 600,
  });
  const bullets = phaser.add.text(
    -config.window.width / 2 + 20,
    -config.window.height / 2 + 20,
    "100",
    {
      font: "4em",
      color: "#ff0044",
      align: "center",
    }
  );
  bullets.scrollFactorX = 0;
  bullets.scrollFactorY = 0;

  const doneDamage = phaser.add.text(
    -config.window.width / 2 + 20,
    -config.window.height / 2 + 70,
    "0",
    {
      font: "4em",
      color: "#ff0044",
      align: "center",
    }
  );
  doneDamage.scrollFactorX = 0;
  doneDamage.scrollFactorY = 0;

  setPlayer({ body: player, lives, bullets, name, doneDamage });

  const stats = phaser.add.text(
    config.window.width,
    -config.window.height / 2 + 20,
    "",
    {
      font: "4em",
      color: "#ff0044",
      fixedWidth: 800,
    }
  );

  stats.scrollFactorX = 0;
  stats.scrollFactorY = 0;

  setStats(stats);

  const arrow = phaser.add.sprite(0, 0, "arrow");
  arrow.setVisible(false);
  setArrow(arrow);
}

export default create;
