import CONNECT from '@space-game/shared/resolvers/connect';
import { Socket } from 'socket.io';
import SHOOT from '@space-game/shared/resolvers/shoot';
import ROTATE from '@space-game/shared/resolvers/rotate';
import MOVE from '@space-game/shared/resolvers/move';
import START from '@space-game/shared/resolvers/start';

import io, { server } from './server';
import { deleteConnection } from './stores/connection';
import move from './resolvers/move';
import rotate from './resolvers/rotate';
import shoot from './resolvers/shoot';
import connect from './resolvers/connect';
import updatePositions from './resolvers/updatePositions';
import config from './config';
import { deletePlayer } from './stores/players';
import start from './resolvers/start';

io.on(CONNECT, (socket: Socket) => {
  const player = connect(socket);

  socket.on('disconnect', () => {
    socket.disconnect();
    deleteConnection(player.connectionId);
    deletePlayer(player.id);
  });

  socket.on(MOVE, move(player));
  socket.on(ROTATE, rotate(player));
  socket.on(SHOOT, shoot(player));
  socket.on(START, start(player));
});

setInterval(() => {
  updatePositions();
}, config.delta);

server.listen(4000, () => {
  console.log('server is running on port 4000');
});
