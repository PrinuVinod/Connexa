import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
  query, where, orderBy, serverTimestamp, getDocs, updateDoc, getDoc
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

const workerComponent = (worker) => {
  return `<div class="details">
            <div class="name"><font color=orange>Name: </font>${worker.name}</div>
            <div class="phno"><font color=orange>Phone Number: </font>${worker.phoneno}</div>
            <div class="phno"><font color=orange>Area: </font>${worker.area}</div>
            <div class="phno"><font color=orange>Field: </font>${worker.field}</div>
            <div class="avail"><font color=orange>Availability Status: </font>${worker.avail}</div>
            <p class="desc"><font color=orange>Minimum Wages: </font>${worker?.description ?? ""}</p>
    </div>`
}

const availabilityCheckbox = document.querySelector("#availability")

onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user);
  if(user !== null) {
    (async () => {
      const userSnapshot = await getDoc(doc(db, "workers", auth.currentUser.uid));
      if(userSnapshot.exists()) {
        const userData = userSnapshot.data();
        document.querySelector(".details").innerHTML = workerComponent(userData);
        availabilityCheckbox.checked = userData.avail ?? false;
        availabilityCheckbox.disabled = false;
        return;
      }
        window.location = `http://${window.location.host}/worker.html`;
    })()
  }
})

document.querySelector("#availability").addEventListener("change", async e => {
  if(e.target.disabled) return;
  const avail = e.target.checked;
  try {
    e.target.disabled = true;
    await updateDoc(doc(db, "workers", auth.currentUser.uid), {
      avail
    });
    window.alert("Availability Status Updated")
  } catch(err) {
    console.error(err);
    window.alert("Couldn't update availability status.");
  } finally {
    e.target.disabled = false;
  }
})