import { setPlayer } from "../../../stores/player";
import config from "../../../config";

function create(phaser: Phaser.Scene): void {
  const player = phaser.add.image(0, 0, "player");
  phaser.cameras.main.startFollow(player);
  phaser.cameras.main.setZoom(0.5);

  const lives = phaser.add.text(0, 0, "100", {
    font: "4em",
    color: "#ff0044",
    align: "center",
  });
  const name = phaser.add.text(0, 0, "ahoj", {
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
}

export default create;
