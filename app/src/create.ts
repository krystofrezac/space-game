import { HEIGHT, WIDTH } from "./constants";
import { setCursors } from "./cursors";
import { setPlayer } from "./player";
import { createGrid, getGrids, setGrids } from "./grids";

function create(): void {
  createGrid(this, WIDTH / 2, HEIGHT / 2);

  const borders = this.physics.add.staticGroup();
  borders.create(0, 50000, "border");

  const player = this.physics.add
    .sprite(WIDTH / 2, HEIGHT / 2, "player")
    .setDepth(50);

  player.body.maxVelocity.x = 1000;
  player.body.maxVelocity.y = 1000;
  setPlayer(player);

  this.cameras.main.startFollow(player);

  setCursors(this.input.keyboard.createCursorKeys());
}

export default create;
