const ROOMS = "rooms";

export interface Rooms {
    callback: (rooms: string[]) => void;
}

export default ROOMS;
