import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyD2sFkrPe5VmZTD5mgkcBbH-RMZF-ZfvaM",
  authDomain: "gramrphone-2.firebaseapp.com",
  databaseURL: "https://gramrphone-2.firebaseio.com",
  projectId: "gramrphone-2",
  storageBucket: "gramrphone-2.appspot.com",
  messagingSenderId: "82591813931"
};

export default firebase.initializeApp(config);