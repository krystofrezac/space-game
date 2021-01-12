import { io } from "socket.io-client";
import UPDATE_POSITIONS from "@space-game/shared/resolvers/updatePositions";

import { setSocket } from "../stores/socket";

import updatePositions from "./updatePositions";

const startNetworkCommunication = (): void => {
  const socket = io(":4000");
  setSocket(socket);
  socket.on(UPDATE_POSITIONS, updatePositions);
};

export default startNetworkCommunication;
