import { setPlayer } from "../stores/player";

function create(this: Phaser.Scene): void {
  const player = this.add.image(0, 0, "player");
  this.cameras.main.startFollow(player);
  this.cameras.main.setZoom(0.5);

  setPlayer(player);
}

export default create;
