import { setPlayer } from "../stores/player";
import config from "../config";

function create(this: Phaser.Scene): void {
  const player = this.add.image(0, 0, "player");
  this.cameras.main.startFollow(player);
  this.cameras.main.setZoom(0.5);

  const lives = this.add.text(0, 0, "100", {
    font: "4em",
    fill: "#ff0044",
    align: "center",
  });
  const bullets = this.add.text(
    -config.window.width / 2 + 20,
    -config.window.height / 2 + 20,
    "100",
    {
      font: "4em",
      fill: "#ff0044",
      align: "center",
    }
  );
  bullets.scrollFactorX = 0;
  bullets.scrollFactorY = 0;

  setPlayer({ body: player, lives, bullets });
}

export default create;
