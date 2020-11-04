import { getPlayer } from "./player";
import { getCursors } from "./cursors";
import { MOVING_SPEED, ROTATION_SPEED } from "./constants";

function update(time: number, delta: number): void {
  const player = getPlayer();

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
