import { Socket } from "socket.io";

export class Connection {
  constructor(socket: Socket) {
    this.socket = socket;
  }

  socket: Socket;
}

const connections: Connection[] = [];

export default connections;
