import Phaser from "phaser";

let player: Phaser.GameObjects.Sprite;

export const setPlayer = (newPlayer: Phaser.GameObjects.Sprite): void => {
  player = newPlayer;
};

export const getPlayer = (): Phaser.GameObjects.Sprite => player;
