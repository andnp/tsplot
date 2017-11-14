import * as SocketIO from 'socket.io';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

const getIO = _.memoize(SocketIO);

export class RemotePlotter {
    private connectionPromise: Bluebird<{socket: SocketIO.Socket, io: SocketIO.Server}>;

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
        return this.connectionPromise.tap(({socket}) => {
            socket.emit('data', data);
        });
    }

    on(event: string, func: (data: any) => any) {
        this.connectionPromise.tap(({socket}) => {
            console.log('registered');
            socket.on(event, func);
        });
    }

    onDisconnect() {
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
