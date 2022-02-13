var usersEmail = [],
  usersPasswords = [];
var currentEmail, currentPassword;

const response = "https://gist.github.com/seyerman/711a4a691af5ca079645d6349cdbbbc9.js";


const router = async () => {
  let header = null || document.getElementById("header_container");
  const content = null || document.getElementById("page_container");
  const footer = null || document.getElementById("footer_container");

  let request = parseRequestURL();

  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Bottombar.render();
  await Bottombar.after_render();

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;

  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener("hashchange", router);

window.addEventListener("load", router);

//"Edit" section
let Edit = {
  render: async () => {
    let view = `
          <section id = "bothFields">
            <label style ="font-size: 50px;">Edit profile information</label>
            </br>
            </br>
              <div>
                <label>Email: ${currentEmail}</label>
                <button style="margin-left: 10px" id="editEmailBtn">Edit</button>
              </div>
            </br>
            </br>

              <div>
                <label>Password: ${currentPassword}</label>
                <button style="margin-left: 10px" id ="editPassBtn">Edit</button>
              </div>
          </section>
          </br>
          </br>

          <section id= "editField"}>
            <input id = "input" type="text"/>
            <button style="margin-left: 10px">Update</button>
          </section>
          </br>
          </br>

          `;

    return view;
  },
  after_render: async () => {
    document.getElementById("editField").style.visibility = "hidden";
    let input = document.getElementById("input");

    document.getElementById("editEmailBtn").addEventListener("click", () => {
      document.getElementById("editField").style.visibility = "visible";
      input.value = currentEmail;
    });

    document.getElementById("editPassBtn").addEventListener("click", () => {
      document.getElementById("editField").style.visibility = "visible";
      input.value = currentPassword;
    });
  },
};

//Login
let Login = {
  render: async () => {
    return `
    <section class="section">
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" id="emailLogin_input" type="email" placeholder="Enter your Email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" id="passLogin_input" type="password" placeholder="Enter a Password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control">
                <button class="button is-primary" id="login_submit_btn">
                Login
                </button>
            </p>
        </div>
    </section>
`;
  },

  after_render: async () => {
    document
      .getElementById("login_submit_btn")
      .addEventListener("click", () => {
        let email = document.getElementById("emailLogin_input");
        let pass = document.getElementById("passLogin_input");

        if (usersEmail.length > 0 && usersPasswords.length > 0) {
          if ((email.value == "") | (pass.value == "")) {
            alert(`The fields cannot be empty`);
          } else {
            currentEmail = email.value;
            currentPassword = pass.value;

            let emailRegistered = false;
            let passRegistered = false;

            usersEmail.forEach((currentValue) => {
              if (currentValue == currentEmail) {
                emailRegistered = true;
              }
            });

            usersPasswords.forEach((currentValue) => {
              if (currentValue == currentPassword) {
                passRegistered = true;
              }
            });

            if (!emailRegistered || !passRegistered) {
              alert(
                "Something went wrong, the email or password might be wrong"
              );
            } else {
              window.location.href = "/#/edit";
            }
          }
        } else {
          alert("There are no users registered yet, become a pioneer!");
        }
      });
  },
};
//Register

let Register = {
  render: async () => {
    return `
    <section class="section">
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" id="email_input" type="email" placeholder="Enter your Email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" id="pass_input" type="password" placeholder="Enter a Password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" id="repeat_pass_input" type="password" placeholder="Enter the same Password again">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control">
                <button class="button is-primary" id="register_submit_btn">
                Register
                </button>
            </p>
        </div>
    </section>
`;
  },

  after_render: async () => {
    document
      .getElementById("register_submit_btn")
      .addEventListener("click", () => {
        let email = document.getElementById("email_input");
        let pass = document.getElementById("pass_input");
        let repeatPass = document.getElementById("repeat_pass_input");
        if (pass.value != repeatPass.value) {
          alert(`The passwords dont match`);
        } else if (
          (email.value == "") |
          (pass.value == "") |
          (repeatPass == "")
        ) {
          alert(`The fields cannot be empty`);
        } else {
          alert(`User with email ${email.value} was successfully registered!`);
          usersEmail.push(email.value);
          usersPasswords.push(pass.value);
        }
      });
  },
};

//Navbar
let Navbar = {
  render: async () => {
    let view = /*html*/ `
           <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="container">
                  <div class="navbar-brand">
                      <a class="navbar-item" href="/#/">
                          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                      </a>
                      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                          <span aria-hidden="true"></span>
                          <span aria-hidden="true"></span>
                          <span aria-hidden="true"></span>
                      </a>
                  </div>
                  <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                      <div class="navbar-start">
                          <a class="navbar-item" href="/#/">
                              Home
                          </a>
                          <a class="navbar-item" href="/#/about">
                              About
                          </a>
                          <a class="navbar-item" href="/#/secret">
                              Secret
                          </a>

                          <a class="navbar-item" href="/#/login">
                              Login
                          </a>
                          
                      </div>
                      <div class="navbar-end">
                          <div class="navbar-item">
                              <div class="buttons">
                                  <a class="button is-primary" href="/#/register">
                                      <strong>Sign up</strong>
                                  </a>
                                  
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
      `;
    return view;
  },
  after_render: async () => {},
};

//Post show
let getPost = async (id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

let PostShow = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let post = await getPost(request.id);

    return `
          <section class="section">
              <h1> Post Id : ${post.id}</h1>
              <p> Post Title : ${post.title} </p>
              <p> Post Content : ${post.content} </p>
              <p> Post Author : ${post.name} </p>
          </section>
      `;
  },
  after_render: async () => {},
};

//Parse

function parseRequestURL() {
  let url = location.hash.slice(1).toLowerCase() || "/";
  let r = url.split("/");
  let request = {
    resource: null,
    id: null,
    verb: null,
  };
  request.resource = r[1];
  request.id = r[2];
  request.verb = r[3];
  return request;
}

//About
let About = {
  render: async () => {
    let view = `
          <section class="section">
              <h1> About </h1>
          </section>
      `;
    return view;
  },
  after_render: async () => {},
};

//Bottom bar
let Bottombar = {
  render: async () => {
    let view = /*html*/ `
      <footer class="footer">
          <div class="content has-text-centered">
              <p>
                  This is my foot. There are many like it, but this one is mine.
              </p>
          </div>
      </footer>
      `;
    return view;
  },
  after_render: async () => {},
};

//Home

let getPostsList = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://5bb634f6695f8d001496c082.mockapi.io/api/posts`,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

let Home = {
  render: async () => {
    let posts = await getPostsList();
    let view = `
        <section class="section">
            <h1> Home </h1>
            <ul>
                ${posts
                  .map(
                    (post) =>
                      /*html*/ `<li><a href="#/p/${post.id}">${post.title}</a></li>`
                  )
                  .join("\n ")}
            </ul>
        </section>
    `;
    return view;
  },
  after_render: async () => {},
};

// Error 404
let Error404 = {
  render: async () => {
    let view = `
          <section class="section">
              <h1> 404 Error </h1>
          </section>
      `;
    return view;
  },
  after_render: async () => {},
};

const routes = {
  "/": Home,
  "/about": About,
  "/p/:id": PostShow,
  "/register": Register,
  "/login": Login,
  "/edit": Edit,
};
