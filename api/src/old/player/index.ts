import { Socket } from "socket.io";
import { Body } from "matter-js";

export enum Direction {
  NONE,
  UP,
  DOWN,
}

export enum Rotation {
  RIGHT,
  LEFT,
  NONE,
}

class Player {
  constructor(initialValues: { id: number; socket: Socket; body: Body }) {
    this.id = initialValues.id;
    this.socket = initialValues.socket;
    this.body = initialValues.body;
    this.direction = Direction.NONE;
    this.rotation = Rotation.NONE;
  }

  public id: number;

  public socket: Socket;

  public body: Body;

  public direction: Direction;

  public rotation: Rotation;
}

export default Player;
