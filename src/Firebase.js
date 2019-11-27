import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import firebaseConfig from '../config';
 
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();  
const msgStyle = 'background: #000; color: green; font-size: 14px; font-weight: 500';
export const errorCatcher = (error, msg) => {
  error ? console.error(error) : console.log(`%c ${msg} SUCSESSFULY!`, msgStyle)
};
const currentDate = new Date().toISOString();

firebase.database.enableLogging(errorCatcher(false, `IN ${currentDate} connectinf to [FIREBASE]: `));

export default firebase;