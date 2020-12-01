import { getCursors } from "./cursors";
import { getSocket } from "./socket";
import { getObjects, setObjects } from "./objects";

function update(time: number, delta: number): void {
  const objects = getObjects();
  const newObjects = objects.filter((o) => !o.image);

  newObjects.forEach((o) => {
    o.image = this.add.image(o.position.x, o.position.y, "player");
  });

  setObjects(objects);

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
  if (!cursors.down.isDown && !cursors.up.isDown) {
    getSocket().emit("move", {
      direction: "NONE",
    });
  }
  if (!cursors.right.isDown && !cursors.left.isDown) {
    getSocket().emit("rotate", {
      rotation: "NONE",
    });
  }
}

export default update;
