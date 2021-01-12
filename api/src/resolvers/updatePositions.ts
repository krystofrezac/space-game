import UPDATE_POSITIONS, {
  UpdatePositions,
} from '@space-game/shared/resolvers/updatePositions';
import matter from 'matter-js';

import { getPlayers } from '../stores/players';
import engine from '../matter';
import config from '../config';

const updatePositions = (): void => {
  matter.Engine.update(engine, config.delta);

  const players = getPlayers();

  players.forEach(player => {
    matter.Body.setVelocity(player.body, player.getVelocity());
    matter.Body.setAngularVelocity(player.body, player.getAngularVelocity());

    const args: UpdatePositions = {
      player: {
        position: player.getPosition(),
        angle: player.body.angle,
      },
    };

    player.connection.socket.emit(UPDATE_POSITIONS, args);
  });
};

export default updatePositions;
