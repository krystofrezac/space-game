import MOVE, { Move } from "@space-game/shared/resolvers/move";

import { getSocket } from "../stores/socket";

let lastMove = 0;
const move = (direction: number): void => {
  if (lastMove !== direction) {
    lastMove = direction;
    const socket = getSocket();
    if (socket) {
      const args: Move = {
        direction,
      };
      socket.emit(MOVE, args);
    }
  }
};

export default move;
