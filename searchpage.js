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
  getFirestore
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

//Signing out3
const logoutButtonnn = document.querySelector('.logouttt')
logoutButtonnn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert("Successfully Logged Out")
      window.location.assign("signupw.html")
    })
    .catch((err) => {
      console.log(err.message)
    })
})

const searchbtn = document.querySelector('#search')
const input = document.querySelector("#srch")
const searchForm = document.querySelector("#search-form")
searchbtn.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = `http://${window.location.host}/searchpage.html?area=${input.value}`
})

//sub to auth change
onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})