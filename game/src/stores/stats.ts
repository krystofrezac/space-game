let stats: Phaser.GameObjects.Text | undefined;

export const getStats = (): Phaser.GameObjects.Text | undefined => stats;

export const setStats = (newStats: Phaser.GameObjects.Text): void => {
  stats = newStats;
};
