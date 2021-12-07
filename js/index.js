// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";// TODO: Add SDKs for Firebase products that you want to use
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
  var add = document.getElementById("add");
  var email = document.getElementById("signup-email");
  var password = document.getElementById("signup-password");
  



function employeeSignUp(){
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email.value,password.value)
      .then((cred)=>{
        console.log(cred);
        window.location.href = "https://www.google.com";
      });
  }




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

  function CheckData(){
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
  //button.addEventListener('click',CheckData);


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