import * as firebase from 'firebase'
import 'firebase/firestore'

const COLORS = [
    'orange',
    'teal',
    'lightgreen'
]

export function getCalendarData(resolve: ((arg0: any) => void), error: ((arg0: string) => void)) {

    let user = firebase.auth().currentUser;
    if (user == null) {
        console.log("Not logged in.");
        error("Not logged in.");
    }
    else {
        let uid = user.uid;
        let dataref = firebase.firestore().collection('datapoints');
        let query = dataref.where('user', '==', uid)

        // Uncomment if we want to only get the data for a range of dates
        // query = query.where('ts', '<=', end)
        // query = query.where('ts', '>=', start)
        query.get().then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            let dates: { [x: string] : {startingDay: boolean, endingDay: boolean, color: string}} = {}
            let docs = snapshot.docs;
            for (var i=0; i<docs.length; i++) {
                let data = docs[i].data();

                // epoch timestamp
                let date = new Date(Math.round(data['date']['seconds']*1000 + data['date']['nanoseconds']/1000000));
                // doing it manually because Date's toISOString function is UTC time
                let datestring = [date.getFullYear(), 
                                (date.getMonth()>8 ? '' : '0') + (date.getMonth()+1), 
                                (date.getDate()>9 ? '' : '0') + date.getDate()].join('-');
                dates[datestring] = {
                    startingDay: true, endingDay: true, 
                    color: COLORS[data['type'] - 1]
                }
            }
            resolve(dates)
        })
        .catch(err => {
            error(err);
        });
    }
};