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

// queries
/* const q = query(colRef) */

//get collection data
/* getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs)
    }) */

/*login
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
})*/

//sub to auth change
onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user);
  if(user !== null) {
    (async () => {
      const userSnapshot = await getDoc(doc(db, "workers", auth.currentUser.uid));
      if(userSnapshot.exists()) {
        window.location = `http://${window.location.host}/details.html`;
      }
    })()
  }
})

//add to db
const adddetailForm = document.querySelector('.add')
adddetailForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const workerRef = doc(db, "workers", auth.currentUser.uid);
  setDoc(workerRef, {
    name: adddetailForm.name.value,
    phoneno: adddetailForm.phoneno.value,
    area: adddetailForm.area.value,
    field: adddetailForm.field.value,
    description: adddetailForm.description.value,
  })
  .then(() => {
    alert("Added Successfull")
    window.location.assign("details.html")
  })
})

//get collection data
/* getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs)
    }) */

// realtime collection data
/* onSnapshot(q, (snapshot) => {
  let workers = []
  snapshot.docs.forEach(doc => {
    workers.push({ ...doc.data(), id: doc.id })
  })
  console.log(workers)
}) */

