import { io } from "socket.io-client";
import CONNECT from "@space-game/shared/resolvers/connect";
import ROOMS from "@space-game/shared/resolvers/rooms";

import { setSocket } from "./stores/socket";

const socket = io(":4000");
setSocket(socket);
socket.on(CONNECT, () => {
  socket.emit(ROOMS, {}, (rooms: string[]) => {
    console.log("rooms", rooms);
  });
});
