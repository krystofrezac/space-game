import { Died } from "@space-game/shared/resolvers/died";

import config from "../../config/index";

class DeathScene extends Phaser.Scene {
  constructor() {
    super("death");
  }

  create(args: Died): void {
    const title = this.add.text(
      config.window.width / 2,
      config.window.height / 2 - 50,
      "You died",
      {
        font: "10em",
        color: "#ff0044",
        align: "center",
      }
    );
    title.setOrigin(0.5, 0.5);

    const score = this.add.text(
      config.window.width / 2,
      config.window.height / 2 + 50,
      `You've done ${args.doneDamage} damage`,
      {
        font: "4em",
        color: "#ff0044",
      }
    );
    score.setOrigin(0.5, 0.5);

    const menuButton = this.add.text(
      config.window.width / 2,
      config.window.height / 2 + 200,
      "restart",
      {
        font: "4em",
        color: "#ff0044",
        align: "center",

        strokeThickness: 2,
        stroke: "#ff0044",
      }
    );
    menuButton.setOrigin(0.5, 0.5);
    menuButton.setInteractive();
    menuButton.on("pointerdown", () => {
      this.scene.start("menu", { name: args.name });
    });
  }
}

export default DeathScene;
