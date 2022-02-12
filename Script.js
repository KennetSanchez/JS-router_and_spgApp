let routes = {};
let templates = {};

let app_section = document.getElementById("app");

var section  = document.createElement("section");
var link = document.createElement("a");

function home() {
    link.href = "#/about";
    link.innerText = "About";
  
    section.innerHTML = "<h1>Home</h1>";
    section.appendChild(link);
  
    app_section.appendChild(section);
  }

  function about() {
    link.href = "#/";
    link.innerText = "Home";
  
    section.innerHTML = "<h1>About</h1>";
    section.appendChild(link);
  
    app_section.appendChild(section);
  }