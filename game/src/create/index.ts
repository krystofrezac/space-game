import { setPlayer } from "../stores/player";
import { createGrid } from "../objects/grid";

function create(this: Phaser.Scene): void {
  createGrid(this, 0, 0);

  const player = this.add.image(0, 0, "player");
  this.cameras.main.startFollow(player);

  setPlayer(player);
}

export default create;
