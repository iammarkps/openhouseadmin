import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAW5GS_qg-5gF3UVwQzjyAM8M_hDzeTMvU',
  authDomain: 'triamudomopenhouse2019.firebaseapp.com',
  databaseURL: 'https://triamudomopenhouse2019.firebaseio.com',
  projectId: 'triamudomopenhouse2019',
  storageBucket: 'triamudomopenhouse2019.appspot.com',
  messagingSenderId: '172057808390'
}

firebase.initializeApp(config)

export { firebase }
