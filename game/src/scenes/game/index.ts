import create from "./create";
import preload from "./preload";
import update from "./update";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload(): void {
    preload(this);
  }

  create(): void {
    create(this);
  }

  update(): void {
    console.log("update");
    update(this);
  }
}

export default GameScene;
