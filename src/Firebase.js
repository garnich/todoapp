import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCYgnIj6ckGMokUgZ9xc8v_yF-r-tfDUAE",
    authDomain: "todoapp-edbcb.firebaseapp.com",
    databaseURL: "https://todoapp-edbcb.firebaseio.com",
    projectId: "todoapp-edbcb",
    storageBucket: "",
    messagingSenderId: "93480704905",
    appId: "1:93480704905:web:8d99f9f501909fdef55f58"
  };
  
  firebase.initializeApp(firebaseConfig);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;