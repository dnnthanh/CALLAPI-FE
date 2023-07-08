API.get("/auth/me", {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
}).then(function (response) {
  (document.getElementById("user-name").value = response.data.data.name),
    (document.getElementById("user-email").value = response.data.data.email),
    (document.getElementById("user-phone").value = response.data.data.phone),
    (document.getElementById("user-address").value =
      response.data.data.address);
});
