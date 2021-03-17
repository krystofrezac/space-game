import UPDATE_POSITIONS, {
  UpdatePositions,
} from '@space-game/shared/resolvers/updatePositions';
import matter from 'matter-js';

import { getPlayers, Player } from '../stores/players';
import config from '../config';
import { getRooms } from '../stores/room';
import { Bullet, getBullets } from '../stores/bullets';

const updatePositions = (): void => {
  getRooms().forEach(room => {
    const roomEngine = room.engine;
    matter.Engine.update(roomEngine, config.delta);
  });

  const players = getPlayers();

  const playersByRoom = new Map<string, Player[]>();
  players.forEach(player => {
    if (player.roomId) {
      const room = playersByRoom.get(player.roomId);
      if (!room) {
        playersByRoom.set(player.roomId, [player]);
      } else playersByRoom.set(player.roomId, [...room, player]);
    }
  });

  const bullets = getBullets();

  const bulletsByRoom = new Map<string, Bullet[]>();
  bullets.forEach(bullet => {
    const room = bulletsByRoom.get(bullet.roomId);
    if (!room) {
      bulletsByRoom.set(bullet.roomId, [bullet]);
    } else {
      bulletsByRoom.set(bullet.roomId, [...room, bullet]);
    }
  });

  playersByRoom.forEach(groupedPlayers => {
    const roomBullets = bulletsByRoom.get(`${groupedPlayers[0]?.roomId}`) || [];

    groupedPlayers.forEach(player => {
      player.shoot();
      const visiblePlayers = groupedPlayers.filter(visiblePlayer => {
        return (
          // TODO visible area
          // visiblePlayer.isInArea(player.getVisibleArea()) &&
          visiblePlayer.id !== player.id
        );
      });

      matter.Body.setVelocity(player.body, player.getVelocity());
      matter.Body.setAngularVelocity(player.body, player.getAngularVelocity());

      const args: UpdatePositions = {
        player: {
          position: player.getDisplayPosition(),
          angle: player.body.angle,
          lives: player.lives,
          bullets: player.bullets,
          name: `${player.name}`,
          doneDamage: player.doneDamage,
        },
        players: visiblePlayers.map(visiblePlayer => ({
          id: visiblePlayer.id,
          position: visiblePlayer.getDisplayPosition(),
          angle: visiblePlayer.body.angle,
          lives: visiblePlayer.lives,
          name: `${visiblePlayer.name}`,
        })),
        bullets: roomBullets.map(bullet => ({
          id: bullet.id,
          position: bullet.body.position,
          angle: bullet.body.angle,
        })),
      };

      player.getConnection()?.socket.emit(UPDATE_POSITIONS, args);
    });
  });
};

export default updatePositions;
