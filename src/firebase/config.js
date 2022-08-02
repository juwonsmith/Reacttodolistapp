import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


// Your web app's Firebase configuration

const {REACT_APP_APIKEY,REACT_APP_AUTHDOMAIN, REACT_APP_PROJECTID, REACT_APP_STORAGEBUCKET, REACT_APP_MESSAGINGSENDERID,REACT_APP_APPID} = process.env;
const firebaseConfig = {
    apiKey: REACT_APP_APIKEY,
    authDomain: REACT_APP_AUTHDOMAIN,
    projectId: REACT_APP_PROJECTID,
    storageBucket: REACT_APP_STORAGEBUCKET,
    messagingSenderId: REACT_APP_MESSAGINGSENDERID,
    appId: REACT_APP_APPID
  };

//initialize app

firebase.initializeApp(firebaseConfig)

//initialize config

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timestamp = firebase.firestore.Timestamp

export {projectAuth, projectFirestore, timestamp}