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
    const getAngularVelocity = (maxSpeed: number): number => {
      const prevAngularVelocity = player.body.angularVelocity;
      const angularVelocity =
        prevAngularVelocity + player.rotation * config.angularAcceleration;

      if (Math.abs(angularVelocity) > maxSpeed) {
        return prevAngularVelocity;
      }

      return angularVelocity;
    };
    matter.Body.setAngularVelocity(
      player.body,
      getAngularVelocity(config.maxAngularSpeed),
    );

    const args: UpdatePositions = {
      player: {
        position: player.body.position,
        angle: player.body.angle,
      },
    };

    player.connection.socket.emit(UPDATE_POSITIONS, args);
  });
};

export default updatePositions;
