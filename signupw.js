import { initializeApp } from 'firebase/app'
import {
  getFirestore, doc, getDoc
} from 'firebase/firestore'
import {
  getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCfE3wMFDD-NnNjxYReuR3IGWnb71wqgPg",
  authDomain: "connexa-ea713.firebaseapp.com",
  projectId: "connexa-ea713",
  storageBucket: "connexa-ea713.appspot.com",
  messagingSenderId: "419493741556",
  appId: "1:419493741556:web:9bfc554140cc9046d76fa1"
};

//intialixe firebase app
initializeApp(firebaseConfig)

//intitservices
const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()

//sub to auth change
onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})

const googleProvider = new GoogleAuthProvider();

const signupBtn = document.querySelector("#google-signup");
signupBtn.addEventListener("click", async e => {
  e.preventDefault();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userSnap = await getDoc(doc(db, "workers", user.uid)).catch(err => {
      console.error(err);
      window.location = `http://${window.location.host}/worker.html`;
    });
    if(!userSnap.exists()) {
      window.location = `http://${window.location.host}/worker.html`;
      return;
    }
      window.location = `http://${window.location.host}/details.html`;
    } catch(err) {
      console.error(err);
    window.alert("Failed to sign up.");
  }
})