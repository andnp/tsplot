"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketIO = require("socket.io");
const Bluebird = require("bluebird");
class RemotePlotter {
    connect(port = 80) {
        const io = SocketIO(port);
        this.connectionPromise = new Bluebird((resolve) => {
            io.of('/tsplot')
                .once('connection', (socket) => {
                resolve({ io, socket });
            });
        });
    }
    sendData(data) {
        return this.connectionPromise.then(({ socket }) => {
            socket.emit('data', data);
        });
    }
}
exports.RemotePlotter = RemotePlotter;
