import { Socket } from 'socket.io';

import { addConnection, Connection } from '../stores/connection';
import { addRoom, getRooms, Room } from '../stores/room';
import { addPlayer, Player } from '../stores/players';

const connect = (socket: Socket): Player => {
  const connection = new Connection(socket);
  addConnection(connection);

  const rooms = getRooms();
  let selectedRoom: Room;
  if (rooms.length === 0) {
    const newRoom = new Room({ name: 'test' });
    addRoom(newRoom);
    selectedRoom = newRoom;
  } else [selectedRoom] = rooms;

  const player = new Player({
    roomId: selectedRoom.id,
    connection,
    engine: selectedRoom.engine,
  });

  addPlayer(player);

  return player;
};

export default connect;
