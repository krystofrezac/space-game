import matter from 'matter-js';
import { nanoid } from 'nanoid';

import config from '../../config';
import { getRoom } from '../room';

export class Bullet {
  constructor(args: { x: number; y: number; angle: number; roomId: string }) {
    this.id = nanoid();
    this.roomId = args.roomId;
    const bullet = matter.Bodies.circle(
      args.x,
      args.y,
      config.objects.bullet.radius,
      {
        mass: config.objects.bullet.mass,
        angle: args.angle,
        inertia: Infinity,
      },
    );
    bullet.friction = 0;
    bullet.frictionAir = 0;
    bullet.frictionStatic = 0;

    let velocity = matter.Vector.create(0, -config.objects.bullet.speed);
    velocity = matter.Vector.rotate(velocity, args.angle);
    matter.Body.setVelocity(bullet, velocity);

    const room = getRoom(args.roomId);
    if (room) {
      matter.World.add(room.engine.world, bullet);
    }
    this.body = bullet;
  }

  public id: string;

  public roomId: string;

  public body: matter.Body;
}

let bullets: Bullet[] = [];

export const getBullets = (): Bullet[] => bullets;

export const addBullet = (bullet: Bullet): void => {
  bullets.push(bullet);
};

export const deleteBullet = (id: string): void => {
  bullets = bullets.filter(bullet => bullet.id !== id);
};
