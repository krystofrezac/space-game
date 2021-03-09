import { Shoot } from '@space-game/shared/resolvers/shoot';

import { Player } from '../stores/players';

const shoot = (player: Player) => (payload: Shoot): void => {
  player.readyToShoot = payload.shoot;
};

export default shoot;
