import matter from 'matter-js';

import { getPlayer, Player } from 'stores/players';

import config from '../../config';
import customNanoid from '../../customNanoid';

let rooms: Room[] = [];

export const getRooms = (): Room[] => {
  return rooms;
};

export const addRoom = (room: Room): void => {
  rooms.push(room);
};

export const getRoom = (id: string): Room | undefined => {
  return rooms.find(room => room.id === id);
};

export const deleteRoom = (id: string): void => {
  rooms = rooms.filter(room => room.id !== id);
};

export class Room {
  constructor() {
    this.id = customNanoid();
    this.connected = 0;

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
            let bulletId: string | undefined;
            if (typeA === 'PLAYER') {
              player = getPlayer(idA);
              bulletId = idB;
            } else {
              player = getPlayer(idB);
              bulletId = idA;
            }

            if (player && bulletId) {
              player.hit(bulletId);
            }
          }
        }
      });
    });
  }

  id: string;

  connected: number;

  engine: matter.Engine;

  public connectTo = (): void => {
    this.connected++;
  };

  public disconnectFrom = (): void => {
    this.connected--;
    console.log('disconnecting', this.id, this.connected);
    if (this.connected <= 0) {
      deleteRoom(this.id);
    }
  };
}
