import { io } from "socket.io-client";
import UPDATE_POSITIONS from "@space-game/shared/resolvers/updatePositions";
import DIED from "@space-game/shared/resolvers/died";

import { setSocket } from "../stores/socket";
import config from "../config";

import updatePositions from "./updatePositions";
import died from "./died";

const startNetworkCommunication = (game: Phaser.Game): void => {
  const socket = io(config.apiURL);
  setSocket(socket);
  socket.on(UPDATE_POSITIONS, updatePositions);
  socket.on(DIED, died(game));
};

export default startNetworkCommunication;
