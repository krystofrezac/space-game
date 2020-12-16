import http from 'http';

import { Server } from 'socket.io';
import express from 'express';

const app = express();
export const server = http.createServer(app);

const io: Server = new Server().listen(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

export default io;
