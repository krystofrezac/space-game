import { Socket } from 'socket.io';

import { addConnection, Connection } from '../stores/connection';
import { addPlayer, Player } from '../stores/players';

const connect = (socket: Socket): Player => {
  const connection = new Connection(socket);
  addConnection(connection);

  const player = new Player({
    connectionId: connection.id,
  });

  addPlayer(player);

  return player;
};

export default connect;
