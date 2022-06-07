// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, signOut, updatePassword} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";// TODO: Add SDKs for Firebase products that you want to use
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
  var delete_button = document.getElementById("empty-employee");
  delete_button.addEventListener('click', empty_seat);
  var update_button = document.getElementById("update-employee");
  update_button.addEventListener('click', UpdateSeat);
  var signup_email = document.getElementById("signup-email");
  var signup_password = document.getElementById("signup-password");
  const login_email = document.getElementById("login-email");
  const login_password = document.getElementById("login-password");
  var signup_button = document.getElementById("signup-button");
  var login_button = document.getElementById("login-button");
  var user_utility = document.getElementById("user_utility");
  var logout_button = document.getElementById("logout-button");
  //var refresh_button = document.getElementById("refresh-button");
  //refresh_button.addEventListener('click',data_table);
  var keep_in = document.getElementById("keep_in");
  var cred_area = document.getElementById("cred_area");
  var seat_data = document.getElementById("seat_data");
  var map_select = document.getElementById("floor_map");
  var ground_floor_map = document.getElementById("ground_floor");
  var first_floor_map = document.getElementById("first_floor");
  var second_floor_map = document.getElementById("second_floor");
  var table_ground = document.getElementById("table-ground");
  var table_first = document.getElementById("table-first");
  var table_second = document.getElementById("table-second");

map_select.addEventListener("change",()=>{
	switch(map_select.selectedIndex){
		case 0:
			ground_floor_map.style.display = "block";
			first_floor_map.style.display = "none";
			second_floor_map.style.display = "none";
			table_ground.style.display = "block";
			table_first.style.display = "none";
			table_second.style.display = "none";
			break;
		case 1:
			ground_floor_map.style.display = "none";
			first_floor_map.style.display = "block";
			second_floor_map.style.display = "none";
			table_ground.style.display = "none";
			table_first.style.display = "block";
			table_second.style.display = "none";
			break;
		case 2:
			ground_floor_map.style.display = "none";
			first_floor_map.style.display = "none";
			second_floor_map.style.display = "block";
			table_ground.style.display = "none";
			table_first.style.display = "none";
			table_second.style.display = "block";
			break;
	}
});
function fetch_seat(str){
	const dbref = ref(db);
    get(child(dbref, "SeatNumber/"+str)).then((snapshot)=>{
      if(snapshot.exists()){
		  nam.value = snapshot.val().name;
		  designation.value = snapshot.val().designation;
		  seatData(str);
      }
      else{
		  nam.value="";
		designation.value="";
		seatData(str);
      
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
			floor.selectedIndex = 1;
			break;
		case "S":
			floor.selectedIndex = 3;
			break;
	}
	
	if(string.length>3 && string[1]=="C" && string[2]=="H"){
		type.selectedIndex = 1;
		number.value = string[string.length-1];
	}
	else{
		if(string.length>3 && !isNaN(string[3])){
			number.value = string[2]+string[3];
		}
		else{
				number.value = string[string.length-1];
		}
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
}
signup_button.addEventListener('click',(e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,signup_email.value,signup_password.value)
      .then((cred)=>{
        
        //window.location.href = "/Seating-Web";
      });
  });
login_button.addEventListener('click', (e)=>{
	e.preventDefault();
	
		
		signInWithEmailAndPassword(auth,login_email.value,login_password.value).then((cred)=>{
	}).catch((error)=>{
      alert("Wrong Credentials");
    });
	
});	
logout_button.addEventListener('click', (e)=>{
	e.preventDefault();
	signOut(auth).then(() => {
	
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
});
onAuthStateChanged(auth, (cred) => {
  if (cred) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
	  data_table();
	  cred_area.style.display = "none";
	  user_utility.style.display = "block";
	  seat_data.style.display = "block";
	  table_ground.style.display = "block";
	  table_first.style.display = "none";
	  table_second.style.display = "none";
	  
    // ...
  } else {
    // User is signed out
    // ...
	  cred_area.style.display = "block";
	  user_utility.style.display = "none";
	  seat_data.style.display = "none";
	  table_ground.style.display = "none";
	  table_first.style.display = "none";
	  table_second.style.display = "none";
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
function UpdateSeat(e){
	e.preventDefault();
		    seatNumber = GetSeat(floor.options[floor.selectedIndex].text, type.options[type.selectedIndex].text, number.value);
			 update(ref(db, "SeatNumber/"+seatNumber),{
      name:nam.value,
      designation:designation.value,
      floor:floor.options[floor.selectedIndex].text,
      seatNumber:seatNumber
    })
    .then(()=>{
				 data_table();
      alert("Data Successfully Updated");
    })
    .catch((error)=>{
      console.log(error);
    })

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
		data_table();
      alert("Data Successfully uploaded");
    })
    .catch((error)=>{
      console.log(error);
    })
  }
function empty_seat(){
event.preventDefault();
    seatNumber = GetSeat(floor.options[floor.selectedIndex].text, type.options[type.selectedIndex].text, number.value);
    const dbref = ref(db);
    remove(child(dbref, "SeatNumber/"+seatNumber));
	data_table();
	alert("Data Deleted Successfully");
}


//SEAT ID MAPPING
var area = document.querySelectorAll('area');

area.forEach(elem => elem.addEventListener("click", (e)=>{
	e.preventDefault();
	fetch_seat(elem.id);
}));


function data_table(){
	var table_data = document.querySelectorAll('td');
	var g_vacant_cabin = 0;
	var f_vacant_cabin = 0;
	var s_vacant_cabin = 0;
	var g_vacant_workstation =0;
	var f_vacant_workstation =0;
	var s_vacant_workstation =0;
	var g_vacant_enclosure =0;
	var f_vacant_enclosure =0;
	var s_vacant_enclosure =0;
	var s_vacant_chamber =0;
	var s_total_cabin = 0;
	var f_total_cabin = 0;
	var g_total_cabin = 0;
	var s_total_workstation =0;
	var f_total_workstation =0;
	var g_total_workstation =0;
	var s_total_enclosure =0;
	var f_total_enclosure =0;
	var g_total_enclosure =0;
	var s_total_chamber =0;
	table_data.forEach(elem =>{
		
	var str = elem.id;
	if(str!=""){
		var tid = str.match(/.{1,1}/g);
		//console.log("TID" + " " + tid);
		var id = null;
		for(var i = 1; i<tid.length;i++){
			if(id!=null){
				id += tid[i];
				console.log("id = "+ id);
			}else {
				id = tid[i];
				console.log("id = "+ id);
			}
		}
		elem.addEventListener('click',()=>{
			
			fetch_seat(id);
		});
		const dbref = ref(db);
    get(child(dbref, "SeatNumber/"+id)).then((snapshot)=>{
      if(snapshot.exists()){
		  elem.innerHTML = snapshot.val().seatNumber+" - "+snapshot.val().designation;
		  if(snapshot.val().name!=""){
			  elem.innerHTML +="<br />"+"("+snapshot.val().name+")";
		  }
      }
      else{
		  switch(tid[1]){
			  case "S":switch(tid[2]){
				  case "E":
					  s_vacant_enclosure +=1;
					  s_total_enclosure +=1;
					  document.getElementsByName('se-vacant')[0].innerHTML = s_vacant_enclosure;
					  
					  break;
				  case "W":
					  s_vacant_workstation +=1;
					  s_total_workstation +=1;
					  document.getElementsByName('sw-vacant')[0].innerHTML = s_vacant_workstation;
					  break;
				  case "C":if(tid[3]=="H"){
					  s_vacant_chamber +=1;
					  s_total_chamber+=1;
					  document.getElementsByName('sch-vacant')[0].innerHTML = s_vacant_chamber;
				  } else{
					  s_vacant_cabin +=1;
					  s_total_cabin +=1;
					  document.getElementsByName('sc-vacant')[0].innerHTML = s_vacant_cabin;
					  
				  }
					  break;
					  
			  }break;
			  case "F":switch(tid[2]){
					  case "E":
					  f_vacant_enclosure +=1;
					  f_total_enclosure +=1;
					  document.getElementsByName('fe-vacant')[0].innerHTML = f_vacant_enclosure;
					  break;
				  case "W":
					  f_vacant_workstation +=1;
					  f_total_workstation +=1;
					  document.getElementsByName('fw-vacant')[0].innerHTML = f_vacant_workstation;
					  break;
				  case "C":
					  f_vacant_cabin +=1;
					  f_total_cabin +=1;
					  document.getElementsByName('fc-vacant')[0].innerHTML = f_vacant_cabin;
					  break;
			  }break;
				case "G":switch(tid[2]){
					  case "E":
					  g_vacant_enclosure +=1;
					g_total_enclosure +=1;
					  document.getElementsByName('ge-vacant')[0].innerHTML = g_vacant_enclosure;
					  break;
				  case "W":
					  g_vacant_workstation +=1;
						g_total_enclosure +=1;
					  document.getElementsByName('gw-vacant')[0].innerHTML = g_vacant_workstation;
					  break;
				  case "C":
					  g_vacant_cabin +=1;
						g_total_cabin +=1;
					  document.getElementsByName('gc-vacant')[0].innerHTML = g_vacant_cabin;
					  break;
			  }break;
		  }
		  console.log("s_vacant_workstation"+ s_vacant_workstation);
		  console.log("s_vacant_enclosure"+ s_vacant_enclosure);
		  console.log("s_vacant_cabin"+ s_vacant_cabin);
		  console.log("f_vacant_enclosure"+ f_vacant_enclosure);
		  console.log("f_vacant_workstation"+ f_vacant_workstation);
		  console.log("f_vacant_cabin"+ f_vacant_cabin);
		  console.log("g_vacant_enclosure"+ g_vacant_enclosure);
		  console.log("g_vacant_workstation"+ g_vacant_workstation);
		  console.log("g_vacant_cabin"+ g_vacant_cabin);
		  elem.innerHTML = id+" - Vacant";
      
      }
    })
    .catch((error)=>{
      console.log(error);
    });
		
	}});
	
	
	
}

