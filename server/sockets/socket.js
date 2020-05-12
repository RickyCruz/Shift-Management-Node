const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('User connected');

    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.next();
        console.log(nextTicket);
        callback(nextTicket);
    });

    client.emit('lastTicket', {
        last : ticketControl.latest(),
        lastFour: ticketControl.latestFour()
    });

    client.on('takeTicket', (data, callback) => {
        if (! data.desktop) {
            return callback({
                error: true,
                message: 'The desktop is required'
            });
        }

        let takeTicket = ticketControl.attend(data.desktop);

        callback(takeTicket);

        // Last Four
        client.broadcast.emit('latestFour', {
            lastFour: ticketControl.latestFour()
        });
    });
});