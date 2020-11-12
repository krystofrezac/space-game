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
            player.socket.emit("update", {
                position: player.body.position,
                angle: player.body.angle
            })
        })
    }
}, 1000 / 60)

io.on("connection", (socket) => {
    const body = matter.Bodies.fromVertices(10, 10, [
        [{"x": 264, "y": 361}, {"x": 264, "y": 359}, {"x": 261, "y": 359}, {"x": 261, "y": 361}],
        [{"x": 217, "y": 143}, {"x": 221, "y": 142}, {"x": 211, "y": 87}, {"x": 209, "y": 88}, {
            "x": 206,
            "y": 94
        }, {"x": 214, "y": 138}],
        [{"x": 196, "y": 358}, {"x": 239, "y": 359}, {"x": 244, "y": 344}, {"x": 245, "y": 336}, {"x": 186, "y": 328}],
        [{"x": 256, "y": 359}, {"x": 264, "y": 359}, {"x": 253, "y": 347}, {"x": 253, "y": 353}],
        [{"x": 183, "y": 204}, {"x": 178, "y": 204}, {"x": 141, "y": 217}, {"x": 185, "y": 212}, {"x": 185, "y": 207}],
        [{"x": 241, "y": 33}, {"x": 239, "y": 39}, {"x": 275, "y": 140}, {"x": 285, "y": 94}, {"x": 245, "y": 32}],
        [{"x": 65, "y": 238}, {"x": 65, "y": 241}, {"x": 86, "y": 234}, {"x": 85, "y": 232}, {
            "x": 79,
            "y": 232
        }, {"x": 67, "y": 236}],
        [{"x": 91, "y": 230}, {"x": 91, "y": 233}, {"x": 112, "y": 226}, {"x": 111, "y": 224}, {
            "x": 105,
            "y": 224
        }, {"x": 93, "y": 228}],
        [{"x": 117, "y": 222}, {"x": 117, "y": 225}, {"x": 141, "y": 217}, {"x": 131, "y": 216}, {"x": 119, "y": 220}],
        [{"x": 473, "y": 336}, {"x": 473, "y": 329}, {"x": 468, "y": 311}, {"x": 308, "y": 328}, {"x": 454, "y": 337}],
        [{"x": 26, "y": 336}, {"x": 45, "y": 337}, {"x": 28, "y": 325}, {"x": 26, "y": 329}],
        [{"x": 308, "y": 333}, {"x": 308, "y": 328}, {"x": 305, "y": 337}],
        [{"x": 454, "y": 248}, {"x": 450, "y": 247}, {"x": 458, "y": 265}, {"x": 457, "y": 255}],
        [{"x": 299, "y": 361}, {"x": 305, "y": 337}, {"x": 290, "y": 361}],
        [{"x": 45, "y": 248}, {"x": 42, "y": 255}, {"x": 36, "y": 288}, {"x": 186, "y": 328}, {
            "x": 245,
            "y": 336
        }, {"x": 59, "y": 244}],
        [{"x": 212, "y": 83}, {"x": 211, "y": 87}, {"x": 221, "y": 142}, {"x": 214, "y": 82}],
        [{"x": 219, "y": 71}, {"x": 218, "y": 75}, {"x": 221, "y": 142}, {"x": 268, "y": 182}, {
            "x": 268,
            "y": 142
        }, {"x": 221, "y": 70}],
        [{"x": 314, "y": 206}, {"x": 314, "y": 211}, {"x": 467, "y": 301}, {"x": 379, "y": 224}, {
            "x": 321,
            "y": 204
        }, {"x": 316, "y": 204}],
        [{"x": 28, "y": 325}, {"x": 45, "y": 337}, {"x": 186, "y": 328}, {"x": 36, "y": 288}, {"x": 32, "y": 301}],
        [{"x": 216, "y": 76}, {"x": 214, "y": 82}, {"x": 221, "y": 142}, {"x": 218, "y": 75}],
        [{"x": 264, "y": 359}, {"x": 286, "y": 361}, {"x": 290, "y": 359}, {"x": 248, "y": 333}, {
            "x": 248,
            "y": 337
        }, {"x": 253, "y": 347}],
        [{"x": 448, "y": 244}, {"x": 436, "y": 240}, {"x": 430, "y": 240}, {"x": 467, "y": 301}, {
            "x": 458,
            "y": 265
        }, {"x": 450, "y": 247}],
        [{"x": 208, "y": 191}, {"x": 200, "y": 198}, {"x": 187, "y": 212}, {"x": 290, "y": 359}, {
            "x": 312,
            "y": 211
        }, {"x": 268, "y": 182}, {"x": 221, "y": 185}],
        [{"x": 190, "y": 206}, {"x": 187, "y": 212}, {"x": 200, "y": 198}, {"x": 198, "y": 198}],
        [{"x": 396, "y": 228}, {"x": 384, "y": 224}, {"x": 379, "y": 224}, {"x": 397, "y": 230}],
        [{"x": 226, "y": 59}, {"x": 221, "y": 70}, {"x": 268, "y": 142}, {"x": 275, "y": 140}, {"x": 228, "y": 58}],
        [{"x": 299, "y": 196}, {"x": 294, "y": 194}, {"x": 312, "y": 211}, {"x": 311, "y": 208}],
        [{"x": 234, "y": 45}, {"x": 228, "y": 58}, {"x": 275, "y": 140}, {"x": 239, "y": 39}],
        [{"x": 410, "y": 232}, {"x": 397, "y": 230}, {"x": 467, "y": 301}, {"x": 430, "y": 240}],
        [{"x": 141, "y": 217}, {"x": 114, "y": 226}, {"x": 290, "y": 359}, {"x": 187, "y": 212}, {"x": 185, "y": 212}],
        [{"x": 397, "y": 230}, {"x": 379, "y": 224}, {"x": 467, "y": 301}],
        [{"x": 468, "y": 311}, {"x": 467, "y": 301}, {"x": 314, "y": 211}, {"x": 308, "y": 328}],
        [{"x": 274, "y": 183}, {"x": 268, "y": 182}, {"x": 294, "y": 194}, {"x": 293, "y": 192}],
        [{"x": 305, "y": 337}, {"x": 308, "y": 328}, {"x": 314, "y": 211}, {"x": 312, "y": 211}, {
            "x": 290,
            "y": 359
        }, {"x": 290, "y": 361}],
        [{"x": 294, "y": 194}, {"x": 268, "y": 182}, {"x": 312, "y": 211}],
        [{"x": 221, "y": 142}, {"x": 221, "y": 185}, {"x": 268, "y": 182}],
        [{"x": 86, "y": 234}, {"x": 65, "y": 241}, {"x": 59, "y": 244}, {"x": 245, "y": 336}, {
            "x": 248,
            "y": 333
        }, {"x": 89, "y": 234}],
        [{"x": 112, "y": 226}, {"x": 91, "y": 233}, {"x": 89, "y": 234}, {"x": 290, "y": 359}, {"x": 114, "y": 226}]
    ])
    matter.World.add(engine.world, [body])

    const player = new Player({socket, body})
    players.push(player)

    console.log("New WS connection");
    io.emit("connected")
    socket.on("move", (payload: { direction: "UP" | "DOWN" }) => {
        if (payload.direction === "UP") {
            const velocity = matter.Vector.normalise(matter.Vector.create(Math.sin(player.body.angle), -Math.cos(player.body.angle)))
            matter.Body.setVelocity(player.body, velocity)
        }
        if (payload.direction === "DOWN") {
            const velocity = matter.Vector.normalise(matter.Vector.create(-Math.sin(player.body.angle), Math.cos(player.body.angle)))
            matter.Body.setVelocity(player.body, velocity)
        }
    })
    socket.on("rotate", (payload: { rotation: "RIGHT" | "LEFT" }) => {
        if (payload.rotation === "RIGHT") {
            matter.Body.setAngularVelocity(player.body, 0.01)
        }
        if (payload.rotation === "LEFT") {
            matter.Body.setAngularVelocity(player.body, -0.01)
        }
    })
})


server.listen(4000, () => {
    console.log("server is running on port 4000");
})