import { setPlayer } from "../stores/player";

function create(this: Phaser.Scene): void {
  const player = this.add.image(0, 0, "player");
  this.cameras.main.startFollow(player);

  setPlayer(player);
}

export default create;
