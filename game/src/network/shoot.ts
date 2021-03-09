import SHOOT, { Shoot } from "@space-game/shared/resolvers/shoot";

import { getSocket } from "../stores/socket";

const shoot = (): void => {
  const socket = getSocket();
  if (socket) {
    const args: Shoot = {
      shoot: true,
    };
    socket.emit(SHOOT, args);
  }
};

export default shoot;
