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

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
        } else {
            this.restartCount();
        }
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];

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

    saveData() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));

        console.log('Data saved');
    }
}

module.exports = {
    TicketControl
}