import http from "http";

import { Server, Socket } from "socket.io";
import express from "express";
import CONNECT from "@space-game/shared/resolvers/connect";
import MOVE from "@space-game/shared/resolvers/move";
import ROTATE from "@space-game/shared/resolvers/rotate";
import SHOOT from "@space-game/shared/resolvers/shoot";
import ROOMS from "@space-game/shared/resolvers/rooms";
import CREATE_ROOM from "@space-game/shared/resolvers/createRoom";

import connections, { Connection } from "./stores/connection";
import move from "./resolvers/move";
import rotate from "./resolvers/rotate";
import shoot from "./resolvers/shoot";
import rooms from "./resolvers/rooms";
import createRoom from "./resolvers/createRoom";

const app = express();
const server = http.createServer(app);

const io: Server = new Server().listen(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on(CONNECT, (socket: Socket) => {
  connections.push(new Connection(socket));

  socket.on(ROOMS, rooms);
  socket.on(CREATE_ROOM, createRoom);
  socket.on(MOVE, move);
  socket.on(ROTATE, rotate);
  socket.on(SHOOT, shoot);
});

server.listen(4000, () => {
  console.log("server is running on port 4000");
});
