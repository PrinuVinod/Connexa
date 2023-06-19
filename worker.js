import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
  query, where, orderBy, serverTimestamp, getDoc, updateDoc, snapshotEqual, getDocs, setDoc
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

//sub to auth change
onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user);
  if(user !== null) {
    (async () => {
      const userSnapshot = await getDoc(doc(db, "workers", auth.currentUser.uid));
      if(userSnapshot.exists()) {
        window.location = `${location.protocol}//${window.location.host}/details.html`;
      } 
    })()
  } else {
    alert("Sign in as worker to add details.")
    location.assign("signupw.html")
  }
})

//add to db
const adddetail = document.querySelector('#add-form')
const area = document.querySelector("#srch")
adddetail.addEventListener('submit', (e) => {
  const addDetailForm = new FormData(document.querySelector('#add-form'))
  e.preventDefault()
  const workerRef = doc(db, "workers", auth.currentUser.uid);
  const data = {
    name: addDetailForm.get("name"),
    phoneno: addDetailForm.get("phoneno"),
    area: addDetailForm.get("area"),
    field: addDetailForm.get("field"),
    description: addDetailForm.get("desc"),
  }
  setDoc(workerRef, data)
  .then(() => {
    alert("Added Successfull")
    window.location.assign("details.html")
  })
})