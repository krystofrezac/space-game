import matter, { Body } from 'matter-js';
import DIED, { Died } from '@space-game/shared/resolvers/died';

import { Connection, getConnection } from '../connection';
import config from '../../config';
import { addBullet, Bullet, getBullet } from '../bullets';
import customNanoid from '../../customNanoid';
import { getRoom } from '../room';

import { getPlayerBody, playerBodyCenter } from './body';

let players: Player[] = [];

export const getPlayers = (): Player[] => {
  return players;
};

export const getPlayersByRoom = (roomId: string): Player[] => {
  return players.filter(p => p.roomId === roomId);
};

export const getPlayer = (id: string): Player | undefined => {
  return players.find(p => p.id === id);
};

export const addPlayer = (player: Player): void => {
  players.push(player);
};

export const deletePlayer = (id: string): void => {
  players = players.filter(player => player.id !== id);
};

export class Player {
  constructor(args: { connectionId: string }) {
    this.id = customNanoid();
    this.connectionId = args.connectionId;

    this.direction = 0;
    this.rotation = 0;
    this.readyToShoot = false;
    this.lives = config.maxLives;
    this.hitByBullets = [];
    this.bullets = config.maxBullets;
    this.doneDamage = 0;

    this.body = getPlayerBody(`PLAYER-${this.id}`);
  }

  public id: string;

  public name?: string;

  public connectionId: string;

  public roomId?: string;

  public body: Body;

  public direction: number;

  public rotation: number;

  public readyToShoot: boolean;

  public lives: number;

  public doneDamage: number;

  public hitByBullets: string[];

  public bullets: number;

  public getConnection = (): Connection | undefined => {
    return getConnection(this.connectionId);
  };

  public addToRoom = (roomId: string): void => {
    const room = getRoom(roomId);
    if (room) {
      matter.World.add(room.engine.world, this.body);
      this.roomId = roomId;

      const roomPlayers = getPlayersByRoom(roomId);

      const position = matter.Vector.create(0, 0);
      do {
        position.x =
          Math.random() * config.borders.width - config.borders.width / 2;
        position.y =
          Math.random() * config.borders.height - config.borders.height / 2;
      } while (
        roomPlayers.some(
          p =>
            matter.Vector.magnitude(
              matter.Vector.sub(p.body.position, position),
            ) < config.spawnFreeSpace,
        )
      );

      matter.Body.setPosition(this.body, position);
    }
  };

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
      return config.maxAngularSpeed;
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
      this.body.position.y >= area.top &&
      this.body.position.y <= area.top + area.height
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
      top: this.body.position.y - config.visibleArea.height / 2,
      width: config.visibleArea.width,
      height: config.visibleArea.height,
    };
  };

  public shoot = (): void => {
    if (this.readyToShoot && this.bullets !== 0 && this.roomId) {
      this.bullets--;
      setTimeout(() => {
        this.bullets++;
      }, config.bulletReload);

      const position = matter.Vector.add(
        this.body.position,
        matter.Vector.rotate(
          matter.Vector.create(0, -config.objects.bullet.createGap),
          this.body.angle,
        ),
      );
      const bullet = new Bullet({
        roomId: this.roomId,
        x: position.x,
        y: position.y,
        angle: this.body.angle,
        shootBy: this.id,
        velocity: this.body.velocity,
      });
      addBullet(bullet);
      this.readyToShoot = false;
    }
  };

  public hit = (bulletId: string): void => {
    if (!this.hitByBullets.some(b => b === bulletId) && this.lives > 0) {
      this.lives -= config.objects.bullet.damage;
      this.hitByBullets = [...this.hitByBullets, bulletId];

      const bullet = getBullet(bulletId);
      if (bullet) {
        getPlayer(bullet.shootBy)?.addDoneDamage();
      }

      if (this.lives <= 0) {
        const args: Died = {
          doneDamage: this.doneDamage,
          name: `${this.name}`,
        };
        this.deleteFromRoom();
        this.getConnection()?.socket.emit(DIED, args);
      }
    }
  };

  public deleteFromRoom = (): void => {
    this.direction = 0;
    this.rotation = 0;
    this.readyToShoot = false;

    this.bullets = config.maxBullets;

    this.body = getPlayerBody(`PLAYER-${this.id}`);

    // Because one bullet hits multiple times
    setTimeout(() => {
      this.hitByBullets = [];
      this.doneDamage = 0;
      this.lives = config.maxLives;
    }, 1000);

    const room = getRoom(`${this.roomId}`);
    if (room) {
      matter.World.remove(room.engine.world, this.body);
      room.disconnectFrom();
    }
    this.roomId = undefined;
  };

  public delete = (): void => {
    this.deleteFromRoom();
    deletePlayer(this.id);
  };

  public addDoneDamage = (): void => {
    this.doneDamage += config.objects.bullet.damage;
  };
}
