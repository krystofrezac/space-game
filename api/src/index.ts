import CONNECT from '@space-game/shared/resolvers/connect';
import { Socket } from 'socket.io';
import ROOMS from '@space-game/shared/resolvers/rooms';
import CREATE_ROOM from '@space-game/shared/resolvers/createRoom';
import SHOOT from '@space-game/shared/resolvers/shoot';
import ROTATE from '@space-game/shared/resolvers/rotate';
import MOVE from '@space-game/shared/resolvers/move';

import io, { server } from './server';
import {
  addConnection,
  Connection,
  deleteConnection,
} from './stores/connection';
import rooms from './resolvers/rooms';
import createRoom from './resolvers/createRoom';
import move from './resolvers/move';
import rotate from './resolvers/rotate';
import shoot from './resolvers/shoot';

io.on(CONNECT, (socket: Socket) => {
  const connection = new Connection(socket);
  addConnection(connection);

  socket.on('disconnect', () => {
    socket.disconnect();
    deleteConnection(connection.id);
  });

  socket.on(ROOMS, rooms);
  socket.on(CREATE_ROOM, createRoom);
  socket.on(MOVE, move);
  socket.on(ROTATE, rotate);
  socket.on(SHOOT, shoot);
});

server.listen(4000, () => {
  console.log('server is running on port 4000');
});
