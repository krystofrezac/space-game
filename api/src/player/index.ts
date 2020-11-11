import {Socket} from "socket.io";
import {Body} from "matter-js"

class Player {
    constructor(initialValues: { socket: Socket, body: Body }) {
        this.socket = initialValues.socket;
        this.body = initialValues.body;
    }

    public socket: Socket

    public body: Body
}

export default Player