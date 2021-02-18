import { setPlayer } from "../stores/player";
import config from "../config";

function create(this: Phaser.Scene): void {
  const player = this.add.image(0, 0, "player");
  this.cameras.main.startFollow(player);
  this.cameras.main.setZoom(0.5);

  const text = this.add.text(0, 0, "100", {
    font: "4em",
    fill: "#ff0044",
    align: "center",
  });

  setPlayer({ body: player, text });
}

export default create;
