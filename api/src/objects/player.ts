import { Body } from "matter-js";
import { Direction } from "@space-game/shared/resolvers/move";
import { Rotation } from "@space-game/shared/resolvers/rotate";

import { Connection } from "../stores/connection";

class Player {
  constructor(initialValues: { connection: Connection; body: Body }) {
    this.id = initialValues.connection.socket.id;
    this.connection = initialValues.connection;
    this.body = initialValues.body;
    this.direction = Direction.NONE;
    this.rotation = Rotation.NONE;
  }

  public id: string;

  public connection: Connection;

  public body: Body;

  public direction: Direction;

  public rotation: Rotation;
}

export default Player;
