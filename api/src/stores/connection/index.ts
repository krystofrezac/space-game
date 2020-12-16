import { Socket } from 'socket.io';
import { nanoid } from 'nanoid';

export class Connection {
  constructor(socket: Socket) {
    this.id = nanoid();
    this.socket = socket;
  }

  id: string;

  socket: Socket;
}

let connections: Connection[] = [];

export const getConnections = (): Connection[] => {
  return connections;
};

export const addConnection = (connection: Connection): void => {
  connections.push(connection);
};

export const deleteConnection = (id: string): void => {
  connections = connections.filter(c => c.id !== id);
};
