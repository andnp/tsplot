import * as SocketIO from 'socket.io';
import * as Bluebird from 'bluebird';

export class RemotePlotter {
    private connectionPromise: Bluebird<{socket: SocketIO.Socket, io: SocketIO.Server}>;

    connect(port = 80) {
        const io = SocketIO(port);
        this.connectionPromise = new Bluebird((resolve) => {
            io.of('/tsplot')
                .once('connection', (socket) => {
                    resolve({io, socket});
                });
        });
    }

    sendData(data: any) {
        return this.connectionPromise.then(({socket}) => {
            socket.emit('data', data);
        });
    }
}
