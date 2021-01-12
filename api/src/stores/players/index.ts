import matter, { Body } from 'matter-js';
import { Direction } from '@space-game/shared/resolvers/move';

import { Connection } from '../connection';
import engine from '../../matter';

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
}

const players: Player[] = [];

export const getPlayers = (): Player[] => {
  return players;
};

export const addPlayer = (player: Player): void => {
  players.push(player);
};