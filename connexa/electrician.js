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
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
  query, where, orderBy, serverTimestamp, getDocs, updateDoc, getDoc
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

const workerComponent = (worker) => {
    const star = '<i class="fa-solid fa-star"></i>'        
    const unfilledStar = '<i class="fa-regular fa-star"></i>'
    let stars = '';
    let unfilledStars = ''
    for(let i = 0; i < worker.review; i++) stars += star;
    for(let i = 5; i > worker.review; i--) unfilledStars += unfilledStar
    return `
    <div class="column">
        <div class="testimonial">
            <div class="name">${worker.name}</div>
            <div class="phno">${worker.phoneno}</div>
            <div class="phno"></div>
            <div class="stars">
                ${stars}${unfilledStars}
            </div>
            <p>
                ${worker?.description ?? ""}
            </p>
        </div>
    </div>`
}

async function load() {
  let params = new URL(document.location.href).searchParams;
  const area = params.get("area").toUpperCase();
  const ref = collection(db, "workers");
  const workerQuery = query(ref,  where("field", "==", "ELECTRICIAN"), where("area", "==", area))
  const result = await getDocs(workerQuery);
  console.log(area);
  if(result.empty) return;
  const workersContainer = document.querySelector("#workers-container");
  result.forEach(worker => {
    console.log("here")
    if(worker.exists())workersContainer.innerHTML += workerComponent(worker.data());
  })
}
  window.onload = load; 

//Signing out
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

//Signing out2
const logoutButtonn = document.querySelector('.logoutt')
logoutButtonn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert("Successfully Logged Out")
      window.location.assign("login.html")
    })
    .catch((err) => {
      console.log(err.message)
    })
})