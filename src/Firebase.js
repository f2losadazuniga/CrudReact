import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBtLaavvP-jVdXuhZuCKoy0UzkuzE3uVds",
    authDomain: "crudreact-a7efa.firebaseapp.com",
    projectId: "crudreact-a7efa",
    storageBucket: "crudreact-a7efa.appspot.com",
    messagingSenderId: "155608362821",
    appId: "1:155608362821:web:760da2e9699cf37843582c"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)