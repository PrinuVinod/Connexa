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
  getFirestore, collection, query, where, getDocs, updateDoc, doc
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
    const star = '<i class="fa-solid fa-star"></i>'        
    const unfilledStar = '<i class="fa-regular fa-star"></i>'
    const ciRcle = '<i class="fa-solid fa-circle"></i>'
    const unfilledciRcle ='<i class="fa-regular fa-circle"></i>'
    let stars = '';
    let unfilledStars = ''
    for(let i = 0; i < Math.floor(worker.review); i++) stars += star;
    for(let i = 5; i > Math.floor(worker.review); i--) unfilledStars += unfilledStar
    
    let circle  = '';
    let unfilledcircle = '';
    if(worker.avail == true)
    {
      circle = ciRcle;
    }
    else
    {
      unfilledcircle = unfilledciRcle;
    }
    return `

    <div class="column">
        <div class="testimonial">
            <div class="name">${worker.name}</div>
            <div class="phno">${worker.phoneno}</div>
            <div class="stars">${stars}${unfilledStars}</div>
            <p>Minimum Fees: Rs.${worker?.description ?? ""}</p>
            <div class="avail">${circle}${unfilledcircle}</div>
            <div class="stars">
               Rate employee:  
               <select id="${worker.id}">
                <option value="0" selected>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
               </select>
            </div>
        </div>
    </div>`
}

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

//sub to auth change
onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})

async function load() {
  let params = new URL(document.location.href).searchParams;
  const area = params.get("area").toUpperCase();
  const ref = collection(db, "workers");
  const workerQuery = query(ref,  where("field", "==", "CARPENTER"), where("area", "==", area))
  const result = await getDocs(workerQuery);
  console.log(area);
  if(result.empty) return;
  const workersContainer = document.querySelector("#workers-container");
  result.forEach(worker => {
    if(worker.exists())workersContainer.innerHTML += workerComponent({...worker.data(), id: "A"+worker.id});
  })
  result.forEach(worker => {
    document.querySelector("#A"+worker.id).addEventListener("change", async e => {
      if(!confirm("Are you sure you want to add review of: " + e.target.value)) return;
      console.log((worker.data().review + Number.parseInt(e.target.value)) / 2)
      await updateDoc(doc(db, "workers", worker.id), {
        review: (worker.data().review + Number.parseInt(e.target.value)) / 2
      })
      window.location.reload();
    })
  });
}
  window.onload = load;