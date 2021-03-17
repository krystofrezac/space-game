import { Died } from "@space-game/shared/resolvers/died";

import { deleteGrids } from "../objects/grid";
import { deletePlayer } from "../stores/player";
import { deleteBullets } from "../objects/bullets";

const died = (game: Phaser.Game) => (args: Died): void => {
  game.scene.stop("game");
  game.scene.start("death", args);

  deleteGrids();
  deletePlayer();
  deleteBullets();
};

export default died;
