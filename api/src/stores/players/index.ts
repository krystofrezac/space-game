import matter, { Body } from 'matter-js';

import { Connection } from '../connection';
import engine from '../../matter';
import config from '../../config';

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
    this.direction = 0;
    this.rotation = 0;
    this.roomId = initialValues.roomId;

    matter.World.add(engine.world, [this.body]);
  }

  public id: string;

  public connection: Connection;

  public roomId: string;

  public body: Body;

  public direction: number;

  public rotation: number;

  public getPosition = (): matter.Vector => {
    const newPosition = matter.Vector.clone(this.body.position);
    newPosition.x += (256 - playerBodyCenter.x) * Math.cos(this.body.angle);
    newPosition.y += (256 - playerBodyCenter.y) * Math.sin(this.body.angle);

    return newPosition;
  };

  public getVelocity = (): matter.Vector => {
    const prevVelocity = this.body.velocity;
    let velocity = matter.Vector.create(0, this.direction * -1);
    velocity = matter.Vector.rotate(velocity, this.body.angle);
    velocity = matter.Vector.normalise(velocity);
    velocity = matter.Vector.mult(velocity, config.acceleration);
    velocity = matter.Vector.add(velocity, prevVelocity);
    if (matter.Vector.magnitude(velocity) > config.maxSpeed) {
      return prevVelocity;
    }

    return velocity;
  };

  public getAngularVelocity = (): number => {
    const prevAngularVelocity = this.body.angularVelocity;
    const angularVelocity =
      prevAngularVelocity + this.rotation * config.angularAcceleration;

    if (Math.abs(angularVelocity) > config.maxAngularSpeed) {
      return prevAngularVelocity;
    }

    return angularVelocity;
  };
}

const players: Player[] = [];

export const getPlayers = (): Player[] => {
  return players;
};

export const addPlayer = (player: Player): void => {
  players.push(player);
};
