import Phaser from "phaser";

let player: Phaser.GameObjects.Image;

export const setPlayer = (newPlayer: Phaser.GameObjects.Image): void => {
  player = newPlayer;
};

export const getPlayer = (): Phaser.GameObjects.Image => player;
