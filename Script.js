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
  function route(path, template) {
    if (typeof template === "function") {
      return (routes[path] = template);
    } else if (typeof template === "string") {
      return (routes[path] = templates[template]);
    } else {
      return;
    }
  }
  
  function template(name, templateFunction) {
    return (templates[name] = templateFunction);
  }
  
  template("home", function () {
    home();
  });
  
  template("about", function () {
    about();
  });
  
  route("/", "home");
  route("/about", "about");
  
  function resolveRoute(route) {
    try {
      return routes[route];
    } catch (e) {
      throw new Error("Route${route} not found");
    }
  }
  
  function router(evt) {
    let url = window.location.hash.slice(1) || "/";
    let route = resolveRoute(url);
  
    route();
  }
  
  window.addEventListener("load", router);
  window.addEventListener("hashchange", router);