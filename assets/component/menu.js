API.get("/categories_news").then(function (response) {
  const categories = response.data.data;
  let menuItems = "";
  let dropdown = "";
  let lengthOfCategories = categories.length;
  for (let i = 0; i < lengthOfCategories; i++) {
    if (i < 4) {
      menuItems += `
            <li class="nav-item">
            <a class="nav-link" href="category.html?id=${categories[i].id}"
                >${categories[i].name} <span class="sr-only">(current)</span></a
            >
            </li>`;
    } else {
      dropdown += `<a class="dropdown-item" href="category.html?id=${categories[i].id}">${categories[i].name}</a>`;
    }
  }
  if (dropdown) {
    menuItems +=
      `<li class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle"
            href="#"
            id="dropdownMenuButton2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >Danh mục khác <span class="sr-only">(current)</span></a
        >
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink_1">` +
      dropdown +
      `</div></li>`;
  }

  let menu_user = `<li class="nav-item">
                        <a class="nav-link" href="login.html">Đăng nhập</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="register.html">Đăng ký</a>
                    </li>`;
  API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then(function (response) {
      localStorage.setItem("LOGIN_NAME", response.data.data.name);
      menu_user = ` <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                        ${response.data.data.name}
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item btn-admin" href="#">Admin</a>
                        <a class="dropdown-item" href="profile.html">Thông tin cá nhân</a>
                        <a class="dropdown-item" href="change-password.html">Đổi mật khẩu</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item btn-logout" href="#">Đăng xuất</a>
                    </div>
                  </li>`;
      elemNavbarMenu.innerHTML = menuItems + menu_user;

      const btnLogout = document.querySelector(".btn-logout");
      btnLogout.addEventListener("click", function () {
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.href = "index.html";
      });
    })
    .catch(function (err) {
      elemNavbarMenu.innerHTML = menuItems + menu_user;
      localStorage.removeItem("LOGIN_NAME");
    });
});
