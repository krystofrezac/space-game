import { Start, StartCallback } from '@space-game/shared/resolvers/start';

import { Player } from '../stores/players';
import { addRoom, getRooms, Room } from '../stores/room';

const start = (player: Player) => (
  payload: Start,
  callback: StartCallback,
): void => {
  const rooms = getRooms();
  let selectedRoom: Room;
  if (rooms.length === 0) {
    const newRoom = new Room();
    addRoom(newRoom);
    selectedRoom = newRoom;
  } else [selectedRoom] = rooms;

  player.addToRoom(selectedRoom.id);
  player.name = payload.name;

  callback();
};

export default start;
