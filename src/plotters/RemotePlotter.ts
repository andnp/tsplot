import * as SocketIO from 'socket.io';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

const getIO = _.memoize(SocketIO);

export class RemotePlotter {
    private connectionPromise: Bluebird<{socket: SocketIO.Socket, io: SocketIO.Server}> | undefined;

    connect(port = 2222) {
        const io = getIO(port);
        this.connectionPromise = new Bluebird((resolve) => {
            io.of('/tsplot')
                .once('connection', (socket) => {
                    resolve({io, socket});
                });
        });
    }

    sendData(data: any) {
        if (!this.connectionPromise) throw new Error('Expected "connect" to have been called first');
        return this.connectionPromise.tap(({socket}) => {
            socket.emit('data', data);
        });
    }

    on(event: string, func: (data: any) => any) {
        if (!this.connectionPromise) throw new Error('Expected "connect" to have been called first');
        this.connectionPromise.tap(({socket}) => {
            console.log('registered');
            socket.on(event, func);
        });
    }

    onDisconnect() {
        if (!this.connectionPromise) throw new Error('Expected "connect" to have been called first');
        return this.connectionPromise.then(({socket}) => {
            return new Bluebird((resolve) => {
                socket.on('disconnect', () => {
                    console.log('disconnected');
                    resolve();
                });
            });
        });
    }
}
