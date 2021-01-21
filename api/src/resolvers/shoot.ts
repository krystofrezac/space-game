import { Shoot } from '@space-game/shared/resolvers/shoot';

import { Player } from '../stores/players';

const shoot = (player: Player) => (payload: Shoot): void => {};

export default shoot;
