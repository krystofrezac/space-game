import matter from 'matter-js';

import config from '../../config';
import { getRoom, Room } from '../room';
import customNanoid from '../../customNanoid';

let bullets: Bullet[] = [];

export const getBullets = (): Bullet[] => bullets;
export const getBullet = (id: string): Bullet | undefined =>
  bullets.find(b => b.id === id);

export const addBullet = (bullet: Bullet): void => {
  bullets.push(bullet);
};

export const deleteBullet = (id: string): void => {
  bullets = bullets.filter(bullet => bullet.id !== id);
};

export class Bullet {
  constructor(args: {
    x: number;
    y: number;
    angle: number;
    roomId: string;
    shootBy: string;
    velocity: matter.Vector;
  }) {
    this.id = customNanoid();
    this.roomId = args.roomId;
    this.shootBy = args.shootBy;
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
    bullet.label = `BULLET-${this.id}`;
    bullet.collisionFilter.category = 0x001;
    bullet.collisionFilter.mask = 0x011;

    let velocity = matter.Vector.create(0, -config.objects.bullet.speed);
    velocity = matter.Vector.rotate(velocity, args.angle);
    velocity = matter.Vector.add(velocity, args.velocity);
    matter.Body.setVelocity(bullet, velocity);

    const room = getRoom(args.roomId);
    if (room) {
      matter.World.add(room.engine.world, bullet);

      setTimeout(() => {
        this.delete(room);
      }, config.objects.bullet.ttl);
    }
    this.body = bullet;
  }

  public id: string;

  public roomId: string;

  public body: matter.Body;

  public shootBy: string;

  private delete = (room: Room): void => {
    deleteBullet(this.id);
    matter.World.remove(room.engine.world, this.body);
  };
}
