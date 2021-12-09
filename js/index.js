// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, signOut} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEoGSXWsvHphRQQoWnKg7o9Q3T2eB9jZ4",
  authDomain: "indoornavigation-429fd.firebaseapp.com",
  databaseURL: "https://indoornavigation-429fd-default-rtdb.firebaseio.com",
  projectId: "indoornavigation-429fd",
  storageBucket: "indoornavigation-429fd.appspot.com",
  messagingSenderId: "825368707275",
  appId: "1:825368707275:web:fae0c6e24365e5f570db4e",
  measurementId: "${config.measurementId}"
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
  var map_select = document.getElementById("floor_map");

map_select.addEventListener("change",()=>{
	console.log(map_select.selectedIndex);
});

//SEAT ID MAPPING

var area = document.getElementsByTagName('area');

for(int i=0;i<area.length;i++){
	area[i].addEventListener('click',(e)=>{
	e.preventDefault();
	
	fetch_seat(area[i].id);
});}




function fetch_seat(str){
	const dbref = ref(db);
    get(child(dbref, "SeatNumber/"+str)).then((snapshot)=>{
      if(snapshot.exists()){
		  nam.value = snapshot.val().name;
		  designation.value = snapshot.val().designation;
		  seatData(str);
      }
      else{
		  alert("Seat Empty");
      }
    })
    .catch((error)=>{
      console.log(error);
    });
}

function seatData(str){
	var string = str.match(/.{1,1}/g);
	
	switch(string[0]){
		case "F":
			floor.selectedIndex = 2;
			break;
		case "G":
			console.log("1");
			floor.selectedIndex = 1;
			break;
		case "S":
			console.log("3");
			floor.selectedIndex = 3;
			break;
	}
	
	if(string.length>3 && string[1]=="C" && string[2]=="H"){
		type.selectedIndex = 1;
			}
	else{
		switch(string[1]){
		case "W":
			type.selectedIndex = 4;
			break;
		case "E":
			type.selectedIndex = 3;
			break;
		case "C":
			type.selectedIndex = 2;
			break;
			}
	}
	number.value = string[string.length-1];
}
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
	  floor.value = "first_floor";
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

