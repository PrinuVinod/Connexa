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

//Signing out2
const logoutButtonn = document.querySelector('.logoutt')
logoutButtonn.addEventListener('click', () => {
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
searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  window.location.href = `http://${window.location.host}/searchpage.html?area=${input.value}`
})

/*//new
const areamenu = document.querySelector(".areamenu");
const areamenuItems = document.querySelectorAll(".areamenuItem");
const areahamburger= document.querySelector(".areahamburger");
const areacloseIcon= document.querySelector(".areacloseIcon");
const areamenuIcon = document.querySelector(".areamenuIcon");

function togggleMenu() {
  if (areamenu.classList.contains("areashowMenu")) {
    areamenu.classList.remove("areashowMenu");
    areacloseIcon.style.display = "none";
    areamenuIcon.style.display = "block";
  } else {
    areamenu.classList.add("areashowMenu");
    areacloseIcon.style.display = "block";
    areamenuIcon.style.display = "none";
  }
}

areahamburger.addEventListener("click", togggleMenu);

areamenuItems.forEach( 
  function(areamenuItem) { 
    areamenuItem.addEventListener("click", togggleMenu);
  }
)

const searchbtn = document.querySelector('#area')
const input = document.querySelector("#area")
const searchForm = document.querySelector("#search")
input.addEventListener('submit', (e) => {
e.preventDefault()
window.location.href = `http://${window.location.host}/searchpage.html?area=${input.value}`
})*/

//filter
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

//sub to auth change
onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})