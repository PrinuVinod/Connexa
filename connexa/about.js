import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
  query, where, orderBy, serverTimestamp, getDoc, updateDoc
} from 'firebase/firestore'
import {
  getAuth, createUserWithEmailAndPassword, signOut, 
  signInWithEmailAndPassword, onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAxPWBtZZNy_kcHISumocwqNVTr7rPF7Ig",
  authDomain: "connexa-bb297.firebaseapp.com",
  projectId: "connexa-bb297",
  storageBucket: "connexa-bb297.appspot.com",
  messagingSenderId: "642796163869",
  appId: "1:642796163869:web:bb29d9c7d5a978c23a47f4"
}

//intialixe firebase app
initializeApp(firebaseConfig)

//intitservices
const db = getFirestore()
const auth = getAuth()

//digning out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert("Successfully Logged Out")
      window.location.assign("login.html")
    })
    .catch((err) => {
      console.log(err.message)
    })
})