import START, { Start } from "@space-game/shared/resolvers/start";

import { getSocket } from "../stores/socket";

const start = (name: string, callback: () => void): void => {
  const socket = getSocket();
  if (socket) {
    const args: Start = {
      name,
    };
    socket.emit(START, args, callback);
  }
};

export default start;
