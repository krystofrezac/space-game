import Phaser from "phaser";

import config from "../../../config";
import start from "../../../network/start";

const create = (phaser: Phaser.Scene): void => {
  phaser.add.text(
    config.window.width / 2 - 250,
    config.window.height / 2,
    "your name:",
    {
      font: "4em",
      color: "#ff0044",
      align: "center",
    }
  );
  phaser.add.dom(
    config.window.width / 2 + 110,
    config.window.height / 2 + 20,
    "input",
    {
      width: "200px",
      height: "50px",
      "background-color": "black",
      border: "2px solid #ff0044",
      outline: "none",
      "*:focus": {
        outline: "none",
      },
      color: "#ff0044",
      "font-size": "30px",
    }
  );
  const startButton = phaser.add.text(
    config.window.width / 2 - 130,
    config.window.height / 2 + 100,
    "start game",
    {
      font: "4em",
      color: "#ff0044",
      align: "center",

      strokeThickness: 2,
      stroke: "#ff0044",
    }
  );
  startButton.setInteractive();
  startButton.on("pointerdown", () =>
    start(startButton.text, () => {
      phaser.scene.start("game");
    })
  );
};

export default create;
