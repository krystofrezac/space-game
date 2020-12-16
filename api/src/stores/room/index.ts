import { nanoid } from 'nanoid';

export class Room {
  constructor(options: { name: string }) {
    this.id = nanoid();
    this.connected = 0;
    this.name = options.name;
  }

  id: string;

  name: string;

  connected: number;
}

const rooms: Room[] = [];

export const getRooms = (): Room[] => {
  return rooms;
};

export const addRoom = (room: Room): void => {
  rooms.push(room);
};
