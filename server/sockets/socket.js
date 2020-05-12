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
});