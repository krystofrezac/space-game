import { RoomsCallback } from '@space-game/shared/resolvers/rooms';

import { getRooms } from 'stores/room/index';

const rooms = (callback: RoomsCallback): void => {
  callback(getRooms());
};

export default rooms;
