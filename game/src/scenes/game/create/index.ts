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

  setPlayer({ body: player, lives, bullets });
}

export default create;
