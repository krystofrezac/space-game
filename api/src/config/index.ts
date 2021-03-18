const config = {
  delta: 1_000 / 60,
  angularAcceleration: 0.000_5,
  maxAngularSpeed: 0.05,
  maxSpeed: 10,
  acceleration: 0.1,
  maxBullets: 10,
  maxLives: 100,
  bulletReload: 1_000 * 5,
  roomSize: 20,
  spawnFreeSpace: 1_600,
  bestPlayerArrowDistance: 1_000,
  visibleArea: {
    width: 3_800,
    height: 2_200,
  },
  borders: {
    width: 10_000,
    height: 10_000,
  },
  objects: {
    bullet: {
      mass: 10_000,
      radius: 32,
      speed: 15,
      createGap: 250,
      ttl: 1_000 * 10,
      damage: 10,
    },
    player: {
      mass: 1,
    },
  },
};

export default config;
