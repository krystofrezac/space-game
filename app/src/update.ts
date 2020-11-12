import { getPlayer } from "./player";
import { getCursors } from "./cursors";
import { MOVING_SPEED } from "./constants";
import { updateGrids } from "./grids";
import { getSocket } from "./socket";

function update(time: number, delta: number): void {
  const player = getPlayer();

  // updateGrids(this, player.body.position.x, player.body.position.y);
  const cursors = getCursors();
  if (cursors.left.isDown) {
    getSocket().emit("rotate", {
      rotation: "LEFT",
    });
  }
  if (cursors.right.isDown) {
    getSocket().emit("rotate", {
      rotation: "RIGHT",
    });
  }
  if (cursors.up.isDown) {
    getSocket().emit("move", {
      direction: "UP",
    });
  }
  if (cursors.down.isDown) {
    getSocket().emit("move", {
      direction: "DOWN",
    });
  }
}

export default update;
