import rotate from "../network/rotate";

function update(time: number, delta: number): void {
  const leftKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.LEFT
  );
  const rightKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.RIGHT
  );

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
}

export default update;
