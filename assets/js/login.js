btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  API.post("/auth/login", {
    email: document.getElementById("user-email").value,
    password: document.getElementById("user-password").value,
  }).then(function (response) {
    localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
    window.location.href = "index.html";
  });
});
