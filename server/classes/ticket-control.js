const fs = require('fs');

class Ticket {
    constructor(folio, desktop) {
        this.folio = folio;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restartCount();
        }
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];

        console.log('System started');
        
        this.saveData();
    }

    next() {
        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        
        this.saveData();

        return `Ticket ${ this.last }`;
    }

    latest() {
        return `Ticket ${ this.last }`;
    }

    latestFour() {
        return this.lastFour;
    }

    attend(desktop) {
        if (this.tickets.length === 0) {
            return 'There is not tickets';
        }

        let ticket = this.tickets[0].folio;
        this.tickets.shift();

        let ticketToAttend = new Ticket(ticket, desktop);

        this.lastFour.unshift(ticketToAttend);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // Delete last element
        }

        console.log('Last Four: ');
        console.log(this.lastFour);

        this.saveData();

        return ticketToAttend;
    }

    saveData() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));

        console.log('Data saved');
    }
}

module.exports = {
    TicketControl
}