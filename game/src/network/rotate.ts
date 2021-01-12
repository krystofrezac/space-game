import ROTATE, { Rotate } from "@space-game/shared/resolvers/rotate";

import { getSocket } from "../stores/socket";

let lastRotation = 0;
const rotate = (rotation: number): void => {
  if (lastRotation !== rotation) {
    lastRotation = rotation;
    const socket = getSocket();
    if (socket) {
      const args: Rotate = {
        rotation,
      };
      socket.emit(ROTATE, args);
    }
  }
};

export default rotate;
