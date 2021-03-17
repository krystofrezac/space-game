import { Died } from "@space-game/shared/resolvers/died";

const died = (game: Phaser.Game) => (args: Died) => {
  game.scene.stop("game");
  game.scene.start("death");
};

export default died;
