import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDsDrFfSRuS3uw97rNa685YAQ3wAwnfdVA",
    authDomain: "food-recipes-eae60.firebaseapp.com",
    databaseURL: "https://food-recipes-eae60.firebaseio.com",
    projectId: "food-recipes-eae60",
    storageBucket: "food-recipes-eae60.appspot.com",
    messagingSenderId: "580388186903",
    appId: "1:580388186903:web:885eca7de64b071f"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore();