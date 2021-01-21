import { Shoot } from '@space-game/shared/resolvers/shoot';

import { Player } from '../stores/players';

const shoot = (player: Player) => (payload: Shoot): void => {
  player.shootRate = payload.shootRate;
};

export default shoot;
