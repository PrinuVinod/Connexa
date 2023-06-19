// JavaScript code to toggle menu when hamburger button is clicked
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)

import { initializeApp } from 'firebase/app'
import {
  getFirestore, deleteDoc, doc, updateDoc, getDoc
} from 'firebase/firestore'
import {
  getAuth, signOut, onAuthStateChanged
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
            <div class="avail"><font color=orange>Availability Status: </font>${worker?.avail ? "Available" : "Not Available"}</div>
            <p class="desc"><font color=orange>Minimum Wages: </font>${worker?.description ?? ""}</p>
            <a href="${worker.aadhar}">Aadhar</a>
            <a href="${worker.licence}">Licence</a>
            <a href="${worker.pan}">Pan</a>
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
        const data = userSnapshot.data();
        if(!(data.aadhar && data.licence && data.pan)) {
          window.location = `${location.protocol}//${window.location.host}/upload.html`;
        }
      } else {

        window.location = `http://${window.location.host}/worker.html`;
      }
    })()
  } else {
    alert("Sign in as worker to upload docs.")
    location.assign("signupw.html")
  }
})


//Signing out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert("Successfully Logged Out")
      window.location.assign("signup.html")
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// deleting docs
const deleteForm = document.querySelector('.delete')
deleteForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if(!window.confirm("Do you want to delete your profile?")) return;

  const docRef = doc(db, 'workers', auth.currentUser.uid)

  deleteDoc(docRef)
    .then(() => {
      deleteForm.reset()
      alert("Deleted Successfully")
      window.location.assign("worker.html")
    })
})

// updating docs
const deleteFormm = document.querySelector('.update')
deleteFormm.addEventListener('submit', (e) => {
  e.preventDefault()
  if(!window.confirm("Do you want to Update your profile?")) return;

  const docRef = doc(db, 'workers', auth.currentUser.uid)

  deleteDoc(docRef)
    .then(() => {
      deleteForm.reset()
      window.location.assign("update.html")
    })
})

document.querySelector("#availability").addEventListener("change", async e => {
  if(e.target.disabled) return;
  const avail = e.target.checked;
  try {
    e.target.disabled = true;
    await updateDoc(doc(db, "workers", auth.currentUser.uid), {
      avail
    });
    window.alert("Availability Status Updated.")
  } catch(err) {
    console.error(err);
    window.alert("Couldn't update availability status.");
  } finally {
    e.target.disabled = false;
  }
})