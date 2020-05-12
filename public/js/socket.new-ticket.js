var socket = io();
var label = $('#lblNewTicket');

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('disconnect', function() {
    console.log('Disconnected');
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(next) {
        label.text(next);
    });
});