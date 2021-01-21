const config = {
  delta: 1000 / 60,
  angularAcceleration: 0.0005,
  maxAngularSpeed: 0.05,
  maxSpeed: 10,
  acceleration: 0.1,
  visibleArea: {
    width: 3200,
    height: 1600,
  },
  borders: {
    width: 10000,
    height: 10000,
  },
  objects: {
    bullet: {
      mass: 10000,
      radius: 10,
    },
    player: {
      mass: 1,
    },
  },
};

export default config;
