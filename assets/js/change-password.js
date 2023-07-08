btnChangePassword.addEventListener("click", function (event) {
  event.preventDefault();
  API.put(
    "/auth/change-password",
    {
      password_current: document.getElementById("user-password-current").value,
      password: document.getElementById("user-password-new").value,
      password_confirmation: document.getElementById("user-password-confirm")
        .value,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  ).then(function (response) {
    alert("Changed password successfully");
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "index.html";
  });
});
