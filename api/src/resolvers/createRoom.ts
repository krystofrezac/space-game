import { CreateRoomData } from '@space-game/shared/resolvers/createRoom';
import UPDATE_ROOMS, {
  UpdateRoomsData,
} from '@space-game/shared/resolvers/updateRooms';

import { addRoom, getRooms, Room } from '../stores/room';
import io from '../server';

const createRoom = (data: CreateRoomData): void => {
  addRoom(new Room({ name: data.name }));

  const updateRoomsData: UpdateRoomsData = { rooms: getRooms() };
  io.emit(UPDATE_ROOMS, updateRoomsData);
};

export default createRoom;
