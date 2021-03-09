import create from "./create";

class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create(): void {
    create(this);
    setTimeout(() => {
      this.scene.launch("game");
      this.scene.stop("menu");
    }, 2_000);
  }
}

export default MenuScene;
