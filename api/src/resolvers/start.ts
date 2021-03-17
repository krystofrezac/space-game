import { Start, StartCallback } from '@space-game/shared/resolvers/start';

import { Player } from '../stores/players';
import { addRoom, getRooms, Room } from '../stores/room';
import config from '../config';

const start = (player: Player) => (
  payload: Start,
  callback: StartCallback,
): void => {
  const rooms = getRooms();

  console.log(
    'rooms',
    rooms.map(r => ({ id: r.id, connected: r.connected })),
  );

  let selectedRoom = rooms.find(room => room.connected < config.roomSize);
  if (!selectedRoom) {
    const newRoom = new Room();
    addRoom(newRoom);
    selectedRoom = newRoom;
  }

  selectedRoom.connectTo();

  player.addToRoom(selectedRoom.id);
  player.name = payload.name;

  callback();
};

export default start;
