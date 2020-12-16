const UPDATE_ROOMS = 'roomsUpdate';

export interface UpdateRoomsData {
  rooms: { id: string; name: string; connected: number }[];
}

export default UPDATE_ROOMS;
