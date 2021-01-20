import matter, { Body, Vector } from 'matter-js';

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

  public getDisplayPosition = (): matter.Vector => {
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
      const reduction =
        config.maxSpeed ** 2 / (velocity.x ** 2 + velocity.y ** 2);
      velocity.x =
        (velocity.x > 0 ? 1 : -1) * Math.sqrt(velocity.x ** 2 * reduction);

      velocity.y =
        (velocity.y > 0 ? 1 : -1) * Math.sqrt(velocity.y ** 2 * reduction);
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

  public isInArea = (area: {
    top: number;
    left: number;
    width: number;
    height: number;
  }): boolean => {
    return (
      this.body.position.x >= area.left &&
      this.body.position.x <= area.left + area.width &&
      this.body.position.y <= area.top &&
      this.body.position.y >= area.top - area.height
    );
  };

  public getVisibleArea = (): {
    top: number;
    left: number;
    width: number;
    height: number;
  } => {
    return {
      left: this.body.position.x - config.visibleArea.width / 2,
      top: this.body.position.y + config.visibleArea.width / 2,
      width: config.visibleArea.width,
      height: config.visibleArea.height,
    };
  };
}

let players: Player[] = [];

export const getPlayers = (): Player[] => {
  return players;
};

export const addPlayer = (player: Player): void => {
  players.push(player);
};

export const deletePlayer = (id: string): void => {
  players = players.filter(player => player.id !== id);
};
