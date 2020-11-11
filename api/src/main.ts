const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:63342",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (client: any) => {
    console.log("a user connected");
});


server.listen(4000);
console.log("server is listening on port 4000")