import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
  query, where, orderBy, serverTimestamp, getDoc, updateDoc
} from 'firebase/firestore'
import {
  getAuth, createUserWithEmailAndPassword, signOut, 
  signInWithEmailAndPassword, onAuthStateChanged, 
  GoogleAuthProvider, signInWithPopup, getRedirectResult
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

/*signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user)
      alert("SignUp Successfull")
      window.location.assign("worker.html")
    })
    .catch((err) => {
      alert(err.message)
    })
})*/

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

/*new
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });*/