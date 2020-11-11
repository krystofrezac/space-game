import { getPlayer } from "./player";
import { getCursors } from "./cursors";
import { MOVING_SPEED, ROTATION_SPEED } from "./constants";
import { updateGrids } from "./grids";

function update(time: number, delta: number): void {
  const player = getPlayer();

  updateGrids(this, player.body.position.x, player.body.position.y);
  const cursors = getCursors();
  if (cursors.left.isDown) {
    player.angle -= delta * ROTATION_SPEED;
  }
  if (cursors.right.isDown) {
    player.angle += delta * ROTATION_SPEED;
  }
  if (cursors.up.isDown) {
    player.setVelocityY(player.body.velocity.y - delta * MOVING_SPEED);
  }
  if (cursors.down.isDown) {
    player.setVelocityY(player.body.velocity.y + delta * MOVING_SPEED);
  }
}
export default update;
