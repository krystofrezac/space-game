import React from 'react';
import ROOMS from '@space-game/shared/resolvers/rooms';

const Home: React.FC = () => {
  return (
    <div>
      Imported modules from another workspace:
      <div>{ROOMS}</div>
    </div>
  );
};
export default Home;
