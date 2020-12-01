import { Socket } from "socket.io-client";

let socket: Socket;

export const setSocket = (newSocket: Socket): void => {
  socket = newSocket;
};

export const getSocket = (): Socket => socket;
