import { HEIGHT, WIDTH } from "./constants";
import { setCursors } from "./cursors";
import { setPlayer } from "./player";
import { createGrid, getGrids, setGrids } from "./grids";

function create(): void {
  createGrid(this, WIDTH / 2, HEIGHT / 2);

  const player = this.add.image(WIDTH / 2, HEIGHT / 2, "player");

  setPlayer(player);

  this.cameras.main.startFollow(player);

  setCursors(this.input.keyboard.createCursorKeys());
}

export default create;
