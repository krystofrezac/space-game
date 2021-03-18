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

    const sortedPlayers = groupedPlayers.sort((p1, p2) => {
      if (p1.doneDamage > p2.doneDamage) return -1;
      if (p1.doneDamage < p2.doneDamage) return 1;

      return 0;
    });

    const stats = sortedPlayers
      .slice(0, 5)
      .map(p => ({ name: `${p.name}`, doneDamage: p.doneDamage }));

    const bestPlayer = sortedPlayers[0];

    groupedPlayers.forEach(player => {
      player.shoot();

      let bestPlayerAngle: number | undefined;
      const subVector = matter.Vector.rotate(
        matter.Vector.sub(bestPlayer.body.position, player.body.position),
        -Math.PI / 2,
      );

      if (
        player.id !== bestPlayer.id &&
        matter.Vector.magnitude(subVector) >= config.bestPlayerArrowDistance
      ) {
        bestPlayerAngle = matter.Vector.angle(
          subVector,
          matter.Vector.create(0, 0),
        );
      }

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
        stats,
        bestPlayerAngle,
      };

      player.getConnection()?.socket.emit(UPDATE_POSITIONS, args);
    });
  });
};

export default updatePositions;
