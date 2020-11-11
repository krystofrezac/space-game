import http from "http"
import express from "express"
import {Server} from "socket.io";
import Player from "./player";
import matter from "matter-js"

const socketio = require("socket.io")

const app = express();
const server = http.createServer(app);

const engine = matter.Engine.create()
engine.world.gravity.y = 0;


const io: Server = socketio(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

const players: Player[] = [];

setInterval(() => {
    if (players.length > 0) {
        matter.Engine.update(engine, 1000)
        players.forEach(player => {
            console.log(player.body.speed)
            player.socket.emit("update", {
                position: player.body.position
            })
        })
    }
}, 1000 / 60)

io.on("connection", (socket) => {
    const body = matter.Bodies.circle(10, 10, 100)
    matter.World.add(engine.world, [body])

    const player = new Player({socket, body})
    players.push(player)

    console.log("New WS connection");
    io.emit("connected")
    socket.on("move", () => {
        matter.Body.setVelocity(player.body, {x: 0, y: -1})
    })
})


server.listen(4000, () => {
    console.log("server is running on port 4000");
})