const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
var tolist = [];

function displayUpdateList() {
   listContainer.innerHTML = '';
   tolist = JSON.parse(localStorage.getItem('todoitems'));
   
   tolist.forEach(item => {

      console.log(item);
       let li = document.createElement('li');
       li.innerHTML = item;

       let span = document.createElement('span');
       span.innerHTML = "\u00d7"; // '×' delete button
       span.className = "close";

       li.appendChild(span);
       listContainer.appendChild(li);
   });
}

function addTask(){
   if(inputBox.value ===''){
    alert("You must write something");
   }
   else{
    
   //1. add element to array tolist
   console.log(inputBox.value);
  tolist.push(inputBox.value);
  console.log(tolist);
  inputBox.value = "";
   //2. Store tolist variable in local storage
   localStorage.setItem('todoitems', JSON.stringify(tolist));
   inputBox.value = '';
   displayUpdateList(); 
}
}

listContainer.addEventListener("click",function(e){
  if(e.target.tagName === "LI"){
   e.target.classList.toggle("checked");
  }
   else if(e.target.tagName === "SPAN"){
   e.target.parentElement.remove();
   let task = e.target.parentElement.innerText.slice(0, -1);
   let index = tolist.indexOf(task);

     // If the task exists in the array, remove it
     if (index > -1) {
         tolist.splice(index, 1);
     }
     // Update local storage and refresh the displayed list
     localStorage.setItem('todoitems', JSON.stringify(tolist));
        displayUpdateList();
   }
},false);

function setCookie(cname, cvalue, exdays) {
   const d = new Date();
   d.setTime(d.getTime() + (exdays*24*60*60*1000));
   let expires = "expires="+ d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
   console.log(`Cookie set: ${cname}=${cvalue}`);
 }
// Function to get a cookie by name
function getCookie(cname) {
   let name = cname + "=";
   let decodedCookie = decodeURIComponent(document.cookie);
   let cookieArray = decodedCookie.split(';');
   for (let i = 0; i < cookieArray.length; i++) {
       let cookie = cookieArray[i].trim();
       if (cookie.indexOf(name) == 0) {
           return cookie.substring(name.length, cookie.length);
       }
   }
   return "";
}

function addColor(color) {
   setCookie("background", color, 1); // Store the selected color in the "background" cookie
   const containers = document.getElementsByClassName("container");
   for (let i = 0; i < containers.length; i++) {
       containers[i].style.background = color; // Apply the solid color to the container background
   }
}

