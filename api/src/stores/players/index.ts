import matter, { Body } from 'matter-js';
import { Direction } from '@space-game/shared/resolvers/move';

import { Connection } from '../connection';
import engine from '../../matter';

import { playerBodyCenter } from './body';

export class Player {
  constructor(initialValues: {
    connection: Connection;
    body: Body;
    roomId: string;
  }) {
    this.id = initialValues.connection.socket.id;
    this.connection = initialValues.connection;
    this.body = initialValues.body;
    this.direction = Direction.NONE;
    this.rotation = 0;
    this.roomId = initialValues.roomId;

    matter.World.add(engine.world, [this.body]);
  }

  public id: string;

  public connection: Connection;

  public roomId: string;

  public body: Body;

  public direction: Direction;

  public rotation: number;

  public getPosition = (): matter.Vector => {
    const newPosition = matter.Vector.clone(this.body.position);
    newPosition.x += (256 - playerBodyCenter.x) * Math.cos(this.body.angle);
    newPosition.y += (256 - playerBodyCenter.y) * Math.sin(this.body.angle);

    return newPosition;
  };
}

const players: Player[] = [];

export const getPlayers = (): Player[] => {
  return players;
};

export const addPlayer = (player: Player): void => {
  players.push(player);
};
