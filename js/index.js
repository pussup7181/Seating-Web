// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, signOut} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIhjeL8NcDUSOqqOo9sEOIj2d1npUuOQ8",
  authDomain: "friendlychat-a001c.firebaseapp.com",
  projectId: "friendlychat-a001c",
  storageBucket: "friendlychat-a001c.appspot.com",
  messagingSenderId: "297611526873",
  appId: "1:297611526873:web:c5f00ac07a1db3b2c5b4c8"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const auth = getAuth();
  
  var nam = document.getElementById("name");
  var designation = document.getElementById("designation");
  var floor = document.getElementById("floor");
  var type = document.getElementById("seat-type");
  var number = document.getElementById("seat-num");
  
  var seatNumber;
  var add = document.getElementById("add-employee");
  add.addEventListener('click',CheckData);
  var update_button = document.getElementById("update-employee");
	update_button.addEventListener('click', UpdateSeat);
  var signup_email = document.getElementById("signup-email");
  var signup_password = document.getElementById("signup-password");
const login_email = document.getElementById("login-email");
  const login_password = document.getElementById("login-password");
  var signup_button = document.getElementById("signup-button");
  var login_button = document.getElementById("login-button");
  var logout_button = document.getElementById("logout-button");
var keep_in = document.getElementById("keep_in");
var cred_area = document.getElementById("cred_area");
var seat_data = document.getElementById("seat_data");

  signup_button.addEventListener('click',(e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,signup_email.value,signup_password.value)
      .then((cred)=>{
        console.log(cred);
        //window.location.href = "/Seating-Web";
      });
  });

login_button.addEventListener('click', (e)=>{
	e.preventDefault();
	if(keep_in.checked){
		setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
			console.log("There");
    return signInWithEmailAndPassword(auth, login_email.value, login_password.value);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
	}
	else{
		console.log("no-there");
		signInWithEmailAndPassword(auth,login_email.value,login_password.value).then((cred)=>{
		console.log(cred);
	});
	}
	
});	

logout_button.addEventListener('click', (e)=>{
	e.preventDefault();
	signOut(auth).then(() => {
		console.log("signOut");
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
});

onAuthStateChanged(auth, (cred) => {
  if (cred) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = cred.uid;
	  cred_area.style.display = "none";
	  logout_button.style.display = "block";
	  seat_data.style.display = "block";
    // ...
  } else {
    // User is signed out
    // ...
	  cred_area.style.display = "block";
	  logout_button.style.display = "none";
	  seat_data.style.display = "none";
  }
});




  function GetSeat(f,t,n){
    var seat = null;

  switch (f)
  {
      case "GROUND FLOOR":
          seat = "G";
          break;
      case "FIRST FLOOR":
          seat = "F";
          break;
      case "SECOND FLOOR":
          seat = "S";
          break;
  }

  switch (t)
  {
    case "Chamber":
          seat += "CH";
          break;
      case "Cabin":
          seat += "C";
          break;
      case "Enclosure":
          seat += "E";
          break;
      case "Workstation":
          seat += "W";
          break;
  }
  return seat + n;
  }

	function UpdateSeat(){
		    seatNumber = GetSeat(floor.options[floor.selectedIndex].text, type.options[type.selectedIndex].text, number.value);

	}


  function CheckData(event){
	event.preventDefault();
    seatNumber = GetSeat(floor.options[floor.selectedIndex].text, type.options[type.selectedIndex].text, number.value);
    const dbref = ref(db);
    get(child(dbref, "SeatNumber/"+seatNumber)).then((snapshot)=>{
      if(snapshot.exists()){
        alert("Seat Taken");   
      }
      else{
        SaveData();
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }


  function SaveData(){
   seatNumber = GetSeat(floor.options[floor.selectedIndex].text, type.options[type.selectedIndex].text, number.value);
    set(ref(db, "SeatNumber/"+seatNumber),{
      name:nam.value,
      designation:designation.value,
      floor:floor.options[floor.selectedIndex].text,
      seatNumber:seatNumber
    })
    .then(()=>{
      alert("Data Successfully uploaded");
    })
    .catch((error)=>{
      console.log(error);
    })
  }