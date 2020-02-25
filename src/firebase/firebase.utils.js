import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA8ktV6cf-QOUa6U2BHVffeP-JvjmJ3qqw",
    authDomain: "corwn-db.firebaseapp.com",
    databaseURL: "https://corwn-db.firebaseio.com",
    projectId: "corwn-db",
    storageBucket: "corwn-db.appspot.com",
    messagingSenderId: "345379963395",
    appId: "1:345379963395:web:f1021ae9a8edaa5bc78436",
    measurementId: "G-PFK75YJN4K"
  };


  export const createUserProfileDocument = async (userAuth , additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName , email} = userAuth;
      const createdAt = new Date();
      
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }
      catch(error){
        console.log("Error Creating User Data" , error.message);
      }
    }
    return userRef;
  }


  firebase.initializeApp(config); 

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

