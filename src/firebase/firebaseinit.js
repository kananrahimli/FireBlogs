import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB8BqkirbXPv0l4L42fkQyBR5JMsPz-xGA",
  authDomain: "fireblogs-16278.firebaseapp.com",
  databaseURL: "https://fireblogs-16278-default-rtdb.firebaseio.com",
  projectId: "fireblogs-16278",
  storageBucket: "fireblogs-16278.appspot.com",
  messagingSenderId: "995033712997",
  appId: "1:995033712997:web:c825984d7f20033919b98c",
  measurementId: "G-1902LVWLZX"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);

const timestamp=firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};

export default firebaseApp.firestore()
