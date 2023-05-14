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

// collection ref
const colRef = collection(db, 'workers')

//login
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      alert("Login Successfull")
      window.location.assign("index.html")
    })
    .catch((err) => {
      alert(err.message)
    })
})

//sub to auth change
onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})