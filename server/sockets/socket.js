const { io } = require('../server');

io.on('connection', (client) => {
    console.log('User connected');

    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Welcome!'
    });

    client.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Listen client
    client.on('sendMessage', (data, callback) => {

        console.log(data);

        client.broadcast.emit('sendMessage', data);

        // if (message.user) {
        //     callback({
        //         message: 'Ok!'
        //     });

        // } else {
        //     callback({
        //         message: 'NOPE!!'
        //     });
        // }
    });
});