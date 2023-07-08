btnRegister.addEventListener("click", function (e) {
  //console.log("Register");
  e.preventDefault();
  API.post("/users/register", {
    name: document.getElementById("user-name").value,
    email: document.getElementById("user-email").value,
    password: document.getElementById("user-password").value,
    phone: document.getElementById("user-phone").value,
    address: document.getElementById("user-address").value,
  }).then(function (response) {
    console.log(response.data);
    API.post("/auth/login", {
      email: response.data.data.email,
      password: document.getElementById("user-password").value,
    }).then(function (response) {
      localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
      window.location.href = "index.html";
    });
  });
});
