const fs = require('fs');

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
        } else {
            this.restartCount();
        }
    }

    restartCount() {
        this.last = 0;

        console.log('System started');
        
        this.saveData();
    }

    next() {
        this.last += 1;
        
        this.saveData();

        return `Ticket ${ this.last }`;
    }

    saveData() {
        let jsonData = {
            "last": this.last,
            "today": this.today
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));

        console.log('Data saved');
    }
}

module.exports = {
    TicketControl
}