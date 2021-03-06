import { nanoid } from 'nanoid';
import matter from 'matter-js';

import { getPlayer, Player } from 'stores/players';

import config from '../../config';
import customNanoid from '../../customNanoid';
import { Bullet, getBullet, getBullets } from '../bullets';

export class Room {
  constructor(options: { name: string }) {
    this.id = customNanoid();
    this.connected = 0;
    this.name = options.name;

    const engine = matter.Engine.create();
    engine.world.gravity.y = 0;
    matter.World.add(engine.world, [
      // top
      matter.Bodies.rectangle(
        0,
        -config.borders.height / 2,
        config.borders.width,
        10,
        {
          isStatic: true,
          collisionFilter: {
            category: 0x100,
            mask: 0x010,
          },
        },
      ), // bottom
      matter.Bodies.rectangle(
        0,
        config.borders.height / 2,
        config.borders.width,
        10,
        {
          isStatic: true,
          collisionFilter: {
            category: 0x100,
            mask: 0x010,
          },
        },
      ),
      // left
      matter.Bodies.rectangle(
        -config.borders.width / 2,
        0,
        10,
        config.borders.height,
        {
          isStatic: true,
          collisionFilter: {
            category: 0x100,
            mask: 0x010,
          },
        },
      ),
      // right
      matter.Bodies.rectangle(
        config.borders.width / 2,
        0,
        10,
        config.borders.height,
        {
          isStatic: true,
          collisionFilter: {
            category: 0x100,
            mask: 0x010,
          },
        },
      ),
    ]);

    this.engine = engine;

    matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach((pair: any) => {
        // eslint-disable-next-line prefer-destructuring
        const bodyA: matter.Body = pair.bodyA;
        // eslint-disable-next-line prefer-destructuring
        const bodyB: matter.Body = pair.bodyB;

        const [typeA, idA] = bodyA.label.split('-');
        const [typeB, idB] = bodyB.label.split('-');

        if (typeA && idA && typeB && idB) {
          if (
            (typeA === 'BULLET' || typeB === 'BULLET') &&
            (typeA === 'PLAYER' || typeB === 'PLAYER')
          ) {
            let player: Player | undefined;
            let bulletId: string;
            if (typeA === 'PLAYER') {
              player = getPlayer(idA);
              bulletId = idB;
            } else {
              player = getPlayer(idB);
              bulletId = idA;
            }

            if (player) player.hit(bulletId);
          }
        }
      });
    });
  }

  id: string;

  name: string;

  connected: number;

  engine: matter.Engine;
}

const rooms: Room[] = [];

export const getRooms = (): Room[] => {
  return rooms;
};

export const addRoom = (room: Room): void => {
  rooms.push(room);
};

export const getRoom = (id: string): Room | undefined => {
  return rooms.find(room => room.id === id);
};
