import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import config from 'config';
import ROOMS, { RoomsCallback } from '@space-game/shared/resolvers/rooms';
import CREATE_ROOM, {
  CreateRoomData,
} from '@space-game/shared/resolvers/createRoom';
import UPDATE_ROOMS, {
  UpdateRoomsData,
} from '@space-game/shared/resolvers/updateRooms';

import { Room } from './types';

const RoomsIndex: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [socket] = useState(io(config.apiURL));
  const [name, setName] = useState('');

  useEffect(() => {
    if (process.browser) {
      const roomsCallback: RoomsCallback = rooms => {
        setRooms(rooms);
      };

      socket.emit(ROOMS, roomsCallback);

      socket.on(UPDATE_ROOMS, (data: UpdateRoomsData) => {
        setRooms(data.rooms);
      });
    }
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const clickHandler = (): void => {
    const data: CreateRoomData = { name };
    socket.emit(CREATE_ROOM, data);
  };

  return (
    <>
      <table>
        <tr>
          <th />
          <th>name</th>
          <th>connected</th>
        </tr>
        {rooms.map(room => (
          <tr key={room.id}>
            <td>
              <button>connect</button>
            </td>
            <td>{room.name}</td>
            <td>{room.connected}</td>
          </tr>
        ))}
      </table>
      <input placeholder="name" value={name} onChange={changeHandler} />
      <button onClick={clickHandler}>Create</button>
    </>
  );
};

export default RoomsIndex;
