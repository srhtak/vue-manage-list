import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXJqrbWl76-TfLOn_BB5Stk4kaba7bDbM",
  authDomain: "vue-list-130e2.firebaseapp.com",
  projectId: "vue-list-130e2",
  storageBucket: "vue-list-130e2.appspot.com",
  messagingSenderId: "935548623900",
  appId: "1:935548623900:web:f66777e82eb7728f3593d9",
};

// init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp

const timestap = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestap };
