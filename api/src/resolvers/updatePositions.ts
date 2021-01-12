import UPDATE_POSITIONS, {
  UpdatePositions,
} from '@space-game/shared/resolvers/updatePositions';

import { getPlayers } from '../stores/players';

const updatePositions = (): void => {
  const players = getPlayers();

  players.forEach(player => {
    const args: UpdatePositions = {
      player: {
        position: player.body.position,
        angle: player.body.angle + Math.sin(new Date().getSeconds() / 10),
      },
    };

    player.connection.socket.emit(UPDATE_POSITIONS, args);
  });
};

export default updatePositions;
