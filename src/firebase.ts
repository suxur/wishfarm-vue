import firebase from 'firebase'


// Initialize Firebase
var config = {
    apiKey: 'AIzaSyDQsFpahcrkcGTB7jjZU1Wo0wdiLqBJ5ZQ',
    authDomain: 'wishfarm-app.firebaseapp.com',
    databaseURL: 'https://wishfarm-app.firebaseio.com',
    projectId: 'wishfarm-app',
    storageBucket: 'wishfarm-app.appspot.com',
    messagingSenderId: '770884815923'
}

const settings = { timestampsInSnapshots: true }

firebase.initializeApp(config)

const db: firebase.firestore.Firestore = firebase.firestore()
const auth: firebase.auth.Auth = firebase.auth()

db.settings(settings)

export { db, auth }
