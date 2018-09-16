"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketIO = require("socket.io");
const Bluebird = require("bluebird");
const _ = require("lodash");
const getIO = _.memoize(SocketIO);
class RemotePlotter {
    connect(port = 2222) {
        const io = getIO(port);
        this.connectionPromise = new Bluebird((resolve) => {
            io.of('/tsplot')
                .once('connection', (socket) => {
                resolve({ io, socket });
            });
        });
    }
    sendData(data) {
        if (!this.connectionPromise)
            throw new Error('Expected "connect" to have been called first');
        return this.connectionPromise.tap(({ socket }) => {
            socket.emit('data', data);
        });
    }
    on(event, func) {
        if (!this.connectionPromise)
            throw new Error('Expected "connect" to have been called first');
        this.connectionPromise.tap(({ socket }) => {
            console.log('registered');
            socket.on(event, func);
        });
    }
    onDisconnect() {
        if (!this.connectionPromise)
            throw new Error('Expected "connect" to have been called first');
        return this.connectionPromise.then(({ socket }) => {
            return new Bluebird((resolve) => {
                socket.on('disconnect', () => {
                    console.log('disconnected');
                    resolve();
                });
            });
        });
    }
}
exports.RemotePlotter = RemotePlotter;
