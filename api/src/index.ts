import http from "http";

import express from "express";
import { Server } from "socket.io";
import matter from "matter-js";

import Player, { Direction, Rotation } from "./player";

const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const engine = matter.Engine.create();
engine.world.gravity.y = 0;

const io: Server = socketio(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

let players: Player[] = [];
const vertices = [
  { x: 26, y: 512 - 176 },
  { x: 190, y: 512 - 184 },
  { x: 308, y: 512 - 185 },
  { x: 473, y: 512 - 175 },
  { x: 454, y: 512 - 263 },
  { x: 318, y: 512 - 308 },
  { x: 268, y: 512 - 329 },
  { x: 285, y: 512 - 419 },
  { x: 244, y: 512 - 480 },
  { x: 207, y: 512 - 418 },
  { x: 222, y: 512 - 326 },
  { x: 182, y: 512 - 308 },
  { x: 45, y: 512 - 263 },
];
let center = matter.Vertices.centre(vertices);
center = matter.Vector.create(center.x, center.y);
console.log("center", center);

setInterval(() => {
  if (players.length > 0) {
    matter.Engine.update(engine, 1000);
    players.forEach((player) => {
      const getVelocity = (y: number, maxSpeed: number): matter.Vector => {
        const prevVelocity = player.body.velocity;
        let velocity = matter.Vector.create(0, y);
        velocity = matter.Vector.rotate(velocity, player.body.angle);
        velocity = matter.Vector.normalise(velocity);
        velocity = matter.Vector.mult(velocity, 0.1);
        velocity = matter.Vector.add(velocity, prevVelocity);
        if (matter.Vector.magnitude(velocity) > maxSpeed) {
          return prevVelocity;
        }

        return velocity;
      };

      if (player.direction === Direction.UP) {
        matter.Body.setVelocity(player.body, getVelocity(-1, 5));
      } else if (player.direction === Direction.DOWN) {
        matter.Body.setVelocity(player.body, getVelocity(1, 2));
      }

      const getAngularVelocity = (speed: number, maxSpeed: number): number => {
        const prevAngularVelocity = player.body.angularVelocity;
        const angularVelocity = prevAngularVelocity + speed;
        if (Math.abs(angularVelocity) > maxSpeed) {
          return prevAngularVelocity;
        }

        return angularVelocity;
      };

      if (player.rotation === Rotation.RIGHT) {
        matter.Body.setAngularVelocity(
          player.body,
          getAngularVelocity(0.001, 0.05)
        );
      } else if (player.rotation === Rotation.LEFT) {
        matter.Body.setAngularVelocity(
          player.body,
          getAngularVelocity(-0.001, 0.05)
        );
      }

      player.socket.emit("update", {
        player: {
          position: player.body.position,
          angle: player.body.angle,
        },
        objects: players
          .filter((p) => p.id !== player.id)
          .map((p) => ({
            type: "PLAYER",
            position: p.body.position,
            angle: p.body.angle,
          })),
      });
    });
  }
}, 1000 / 60);

let objectId = 0;

io.on("connection", (socket) => {
  const body = matter.Bodies.fromVertices(center.x, center.y, [vertices]);
  matter.World.add(engine.world, [body]);

  const player = new Player({ id: objectId++, socket, body });
  players.push(player);

  io.emit("connected");
  socket.on("move", (payload: { direction: "UP" | "DOWN" | "NONE" }) => {
    if (payload.direction === "UP") {
      player.direction = Direction.UP;
    }
    if (payload.direction === "DOWN") {
      player.direction = Direction.DOWN;
    }
    if (payload.direction === "NONE") {
      player.direction = Direction.NONE;
    }
  });
  socket.on("rotate", (payload: { rotation: "RIGHT" | "LEFT" | "NONE" }) => {
    if (payload.rotation === "RIGHT") {
      player.rotation = Rotation.RIGHT;
    }
    if (payload.rotation === "LEFT") {
      player.rotation = Rotation.LEFT;
    }
    if (payload.rotation === "NONE") {
      player.rotation = Rotation.NONE;
    }
  });

  socket.on("disconnect", () => {
    players = players.filter((p) => p.id !== player.id);
  });
});

server.listen(4000, () => {
  console.log("server is running on port 4000");
});
