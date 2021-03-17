import Phaser from "phaser";

interface Player {
  body: Phaser.GameObjects.Image;
  lives: Phaser.GameObjects.Text;
  bullets: Phaser.GameObjects.Text;
  name: Phaser.GameObjects.Text;
  doneDamage: Phaser.GameObjects.Text;
}

let player: Player | undefined;

export const setPlayer = (newPlayer: Player): void => {
  player = newPlayer;
};

export const getPlayer = (): Player | undefined => {
  return player;
};

export const deletePlayer = (): void => {
  player?.body.destroy();
  player?.lives.destroy();
  player?.bullets.destroy();
  player?.name.destroy();
  player?.doneDamage.destroy();
};
