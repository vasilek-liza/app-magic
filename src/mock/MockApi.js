import db from '../database.json';

const moment = require('moment');
moment.locale('eu');

class MockApi {

    data = db.ethereum.transactions.map((i) => ({
        ...i,
        time: moment('20' + i.time).format('MM/DD/YYYY h:mm')
    }));

    getDatabase() {
        return new Promise(async (res) => {
            setTimeout(() => res({ data: this.data }), 1500);
        });
    }
}

export const mockApi = new MockApi();