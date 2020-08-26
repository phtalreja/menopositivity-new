import * as firebase from 'firebase'

const config = Object.freeze({
    apiKey: "AIzaSyA9q9NF0IFiWHyGMF_O5w_M6dUBiFHYfFE",
    authDomain: "treehacks2020-66c34.firebaseapp.com",
    databaseURL: "https://treehacks2020-66c34.firebaseio.com",
    projectId: "treehacks2020-66c34",
    storageBucket: "treehacks2020-66c34.appspot.com",
    messagingSenderId: "52745561060",
    appId: "1:52745561060:web:7fbd0e67c89f819d029df1",
    measurementId: "G-JG554M9YMC"
})

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;