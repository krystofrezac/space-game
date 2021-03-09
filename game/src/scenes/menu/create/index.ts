import Phaser from "phaser";

import config from "../../../config";

const create = (phaser: Phaser.Scene): void => {
  phaser.add.text(0, 0, "menu", {
    font: "4em",
    fill: "#ff0044",
    align: "center",
  });
};

export default create;
