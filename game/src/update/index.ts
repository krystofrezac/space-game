import rotate from "../network/rotate";
import move from "../network/move";
import { checkGrids } from "../objects/grid";
import checkPlayers from "../objects/players";
import { getUpdatePlayers } from "../stores/updatePlayers";
import shoot from "../network/shoot";

let spaceDown = false;
function update(this: Phaser.Scene, time: number, delta: number): void {
  checkGrids(this);
  checkPlayers(this, getUpdatePlayers());

  const leftKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.LEFT
  );
  const rightKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.RIGHT
  );
  const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  const downKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.DOWN
  );
  const spaceKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );

  let pressedMoveKeys = 0;
  upKey.on("down", () => {
    pressedMoveKeys++;
    move(1);
  });
  downKey.on("down", () => {
    pressedMoveKeys++;
    move(-1);
  });
  upKey.on("up", () => {
    pressedMoveKeys--;
    if (pressedMoveKeys === 0) move(0);
  });
  downKey.on("up", () => {
    pressedMoveKeys--;
    if (pressedMoveKeys === 0) move(0);
  });

  leftKey.on("down", () => {
    rotate(-1);
  });
  rightKey.on("down", () => {
    rotate(1);
  });
  rightKey.on("up", () => {
    rotate(0);
  });
  leftKey.on("up", () => {
    rotate(0);
  });

  spaceKey.on("down", () => {
    if (!spaceDown) shoot(1);
    spaceDown = true;
  });
  spaceKey.on("up", () => {
    console.log("u");
    spaceDown = false;
  });
}

export default update;
