const ROOMS = 'room';

export type RoomsCallback = (
  rooms: { id: string; name: string; connected: number }[],
) => void;

export default ROOMS;
