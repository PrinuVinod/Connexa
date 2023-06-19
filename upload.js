import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
  query, where, orderBy, serverTimestamp, getDoc, updateDoc, snapshotEqual, getDocs, setDoc
} from 'firebase/firestore'
import {
  getAuth, createUserWithEmailAndPassword, signOut, 
  signInWithEmailAndPassword, onAuthStateChanged
} from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

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
const storage = getStorage();

// collection ref
const colRef = collection(db, 'workers')

//sub to auth change
onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user);
  if(user !== null) {
    (async () => {
      const userSnapshot = await getDoc(doc(db, "workers", auth.currentUser.uid));
      if(userSnapshot.exists()) {
        const data = userSnapshot.data();
        if(data.aadhar && data.licence && data.pan) {
          window.location = `${location.protocol}//${window.location.host}/details.html`;
        } 
      } else {
        window.location = `${location.protocol}//${window.location.host}/worker.html`;
      }
    })()
  } else {
    alert("Sign in as worker to upload docs.")
    location.assign("signupw.html")
  }
})

//add to db
let adddetail = document.querySelector('#add-form')
const area = document.querySelector("#srch")
adddetail.addEventListener('submit', async (e) => {
  adddetail = document.querySelector('#add-form')
  const fd = new FormData(adddetail)
  e.preventDefault()
  const workerRef = doc(db, "workers", auth.currentUser.uid);
  const aadharRef = ref(storage, `docs/aadhar-${auth.currentUser.uid}`);
  const licenceRef = ref(storage, `docs/licence-${auth.currentUser.uid}`);
  const panRef = ref(storage, `docs/pan-${auth.currentUser.uid}`);
  try {
    const fileLinks = {}
    const uploadPromises = [];
    uploadPromises.push(uploadBytesResumable(aadharRef, fd.get("aadhar")));
    uploadPromises.push(uploadBytesResumable(panRef, fd.get("pan")));
    uploadPromises.push(uploadBytesResumable(licenceRef, fd.get("licence")));
    const uploadResult = await Promise.all(uploadPromises);
    fileLinks.aadhar = await getDownloadURL(aadharRef);
    fileLinks.pan = await getDownloadURL(panRef);
    fileLinks.licence = await getDownloadURL(licenceRef);
    updateDoc(workerRef, fileLinks)
    .then(() => {
      alert("Uploaded Successfull")
      window.location.assign("details.html")
    })
  } catch(err) {
    console.error(err);
    alert("Failed to upload.")
  } finally {

  }
})