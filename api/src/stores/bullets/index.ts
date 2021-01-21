import matter from 'matter-js';
import { nanoid } from 'nanoid';

import config from '../../config';

export class Bullet {
  constructor(args: {
    x: number;
    y: number;
    angle: number;
    engine: matter.Engine;
    roomId: string;
  }) {
    this.id = nanoid();

    const bullet = matter.Bodies.circle(
      args.x,
      args.y,
      config.objects.bullet.radius,
      {
        mass: config.objects.bullet.mass,
      },
    );
    matter.World.add(args.engine.world, bullet);
    this.body = bullet;
  }

  public id: string;

  public body: matter.Body;
}

let bullets: Bullet[] = [];

export const addBullet = (bullet: Bullet): void => {
  bullets.push(bullet);
};

export const deleteBullet = (id: string): void => {
  bullets = bullets.filter(bullet => bullet.id !== id);
};
