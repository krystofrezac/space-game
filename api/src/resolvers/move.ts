import { Move } from '@space-game/shared/resolvers/move';

import { Player } from '../stores/players';

const move = (player: Player) => (payload: Move): void => {
  const { direction } = payload;
  if (direction >= -1 && direction <= 1) {
    player.direction = direction;
  }
};

export default move;
