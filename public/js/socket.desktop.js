var socket = io();
var searchParams = new URLSearchParams(window.location.search);

if (! searchParams.has('desktop') || searchParams.get('desktop') == '') {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

var desktop = searchParams.get('desktop');
var label = $('small');

$('h1').text('Desktop ' + desktop);

$('button').on('click', function() {
    socket.emit('takeTicket', { desktop: desktop }, function(response) {
        if (response === 'There is not tickets') {
            label.text(response);
            alert(response);
            return;
        }

        label.text('Ticket ' + response.folio);
    });
});

// socket.on('lastTicket', function(ticket) {
//     label.text(ticket.last);
// });

// $('button').on('click', function() {
//     socket.emit('nextTicket', null, function(next) {
//         label.text(next);
//     });
// });