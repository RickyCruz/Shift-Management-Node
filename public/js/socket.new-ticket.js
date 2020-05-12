var socket = io();
var label = $('#lblNewTicket');

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('disconnect', function() {
    console.log('Disconnected');
});

socket.on('lastTicket', function(ticket) {
    label.text(ticket.last);
});
$('button').on('click', function() {
    socket.emit('nextTicket', null, function(next) {
        label.text(next);
    });
});