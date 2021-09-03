import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyB8BqkirbXPv0l4L42fkQyBR5JMsPz-xGA",
  authDomain: "fireblogs-16278.firebaseapp.com",
  databaseURL: "https://fireblogs-16278-default-rtdb.firebaseio.com",
  projectId: "fireblogs-16278",
  storageBucket: "gs://fireblogs-16278.appspot.com",
  messagingSenderId: "995033712997",
  appId: "1:995033712997:web:c825984d7f20033919b98c",
  measurementId: "G-1902LVWLZX"
};



firebase.initializeApp(firebaseConfig);
const storage=firebase.storage()
const db=firebase.firestore();
const database=firebase.database()
const timestamp=firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};

export {storage,db,database}

