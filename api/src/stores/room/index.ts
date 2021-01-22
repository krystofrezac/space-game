import { nanoid } from 'nanoid';
import matter from 'matter-js';

import config from '../../config';

export class Room {
  constructor(options: { name: string }) {
    this.id = nanoid();
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
        },
      ), // bottom
      matter.Bodies.rectangle(
        0,
        config.borders.height / 2,
        config.borders.width,
        10,
        {
          isStatic: true,
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
        },
      ),
    ]);

    this.engine = engine;
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
