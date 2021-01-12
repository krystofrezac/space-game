import { Rotate } from '@space-game/shared/resolvers/rotate';
import matter from 'matter-js';

import { Player } from '../stores/players';

const rotate = (player: Player) => (payload: Rotate): void => {
  const { rotation } = payload;
  if (rotation >= -1 && rotation <= 1) {
    player.rotation = payload.rotation;
  }
};

export default rotate;
