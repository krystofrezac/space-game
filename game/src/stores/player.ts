import Phaser from "phaser";

interface Player {
  body: Phaser.GameObjects.Image;
  text: Phaser.GameObjects.Text;
}

let player: Player | undefined;

export const setPlayer = (newPlayer: Player): void => {
  player = newPlayer;
};

export const getPlayer = (): Player | undefined => {
  return player;
};
