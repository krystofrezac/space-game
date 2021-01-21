import SHOOT, { Shoot } from "@space-game/shared/resolvers/shoot";

import { getSocket } from "../stores/socket";

const shoot = (shootRate: number): void => {
  const socket = getSocket();
  if (socket) {
    const args: Shoot = {
      shootRate,
    };
    console.log("shoot");
    socket.emit(SHOOT, args);
  }
};

export default shoot;
