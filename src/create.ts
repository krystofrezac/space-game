import { HEIGHT, WIDTH } from "./constants";
import { setCursors } from "./cursors";
import { setPlayer } from "./player";

function create(): void {
  this.add
    .grid(WIDTH / 2, HEIGHT / 2, 1000, 1000, 100, 100, 0x000000)
    .setOutlineStyle(0x0f0f0f);

  const borders = this.physics.add.staticGroup();
  borders.create(0, 50000, "border");

  const player = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, "player");

  player.body.maxVelocity.x = 1000;
  player.body.maxVelocity.y = 1000;
  setPlayer(player);

  this.cameras.main.startFollow(player);

  setCursors(this.input.keyboard.createCursorKeys());
}

export default create;
