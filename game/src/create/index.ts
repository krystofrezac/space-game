import { setPlayer } from "../stores/player";

function create(): void {
  const player = this.add.image(0, 0, "player");

  setPlayer(player);

  this.cameras.main.startFollow(player);
}

export default create;
