import create from "./create";

class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create(): void {
    create(this);
  }
}

export default MenuScene;
