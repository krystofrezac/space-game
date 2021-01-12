import CONNECT from '@space-game/shared/resolvers/connect';
import { Socket } from 'socket.io';
import SHOOT from '@space-game/shared/resolvers/shoot';
import ROTATE from '@space-game/shared/resolvers/rotate';
import MOVE from '@space-game/shared/resolvers/move';

import io, { server } from './server';
import {
  addConnection,
  Connection,
  deleteConnection,
} from './stores/connection';
import move from './resolvers/move';
import rotate from './resolvers/rotate';
import shoot from './resolvers/shoot';
import connect from './resolvers/connect';
import updatePositions from './resolvers/updatePositions';

io.on(CONNECT, (socket: Socket) => {
  const player = connect(socket);

  socket.on('disconnect', () => {
    socket.disconnect();
    deleteConnection(player.connection.id);
  });

  socket.on(MOVE, move);
  socket.on(ROTATE, rotate);
  socket.on(SHOOT, shoot);
});

setInterval(() => {
  updatePositions();
}, 1000 / 60);

server.listen(4000, () => {
  console.log('server is running on port 4000');
});
