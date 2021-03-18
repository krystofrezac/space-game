let arrow: Phaser.GameObjects.Sprite | undefined;

export const getArrow = (): Phaser.GameObjects.Sprite | undefined => arrow;

export const setArrow = (newArrow: Phaser.GameObjects.Sprite): void => {
  arrow = newArrow;
};
