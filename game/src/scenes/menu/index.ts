import create from "./create";

class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create(args: { name?: string }): void {
    create(this, args.name || "");
  }
}

export default MenuScene;
