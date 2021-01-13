import UPDATE_POSITIONS, {
  UpdatePositions,
} from '@space-game/shared/resolvers/updatePositions';
import matter from 'matter-js';

import { getPlayers, Player } from '../stores/players';
import engine from '../matter';
import config from '../config';

const updatePositions = (): void => {
  matter.Engine.update(engine, config.delta);

  const players = getPlayers();

  const playersByRoom = new Map<string, Player[]>();
  players.forEach(player => {
    const room = playersByRoom.get(player.roomId);
    if (!room) {
      playersByRoom.set(player.roomId, [player]);
    } else {
      playersByRoom.set(player.roomId, [...room, player]);
    }
  });

  playersByRoom.forEach(groupedPlayers => {
    groupedPlayers.forEach(player => {
      const visiblePlayers = groupedPlayers.filter(visiblePlayer => {
        return (
          visiblePlayer.isInArea(player.getVisibleArea()) &&
          visiblePlayer.id !== player.id
        );
      });

      console.log(visiblePlayers.length);

      matter.Body.setVelocity(player.body, player.getVelocity());
      matter.Body.setAngularVelocity(player.body, player.getAngularVelocity());

      const args: UpdatePositions = {
        player: {
          position: player.getDisplayPosition(),
          angle: player.body.angle,
        },
        players: visiblePlayers.map(visiblePlayer => ({
          position: visiblePlayer.getDisplayPosition(),
          angle: player.body.angle,
        })),
      };

      player.connection.socket.emit(UPDATE_POSITIONS, args);
    });
  });
};

export default updatePositions;
