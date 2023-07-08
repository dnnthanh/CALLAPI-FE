let pageCurrent = 1;

API.get("/articles/popular?limit=5").then(function (response) {
  let contentOfPopularEnd = `<div class="row">`;
  for (let i = 0; i < response.data.data.length; i++) {
    if (i == 0) {
      elePopularStart.innerHTML = popularStart(response.data.data[i]);
    } else {
      contentOfPopularEnd += popularEndItem(response.data.data[i]);
    }
  }
  contentOfPopularEnd += `</div>`;
  elePopularEnd.innerHTML = contentOfPopularEnd;
});

API.get("/articles/popular?limit=4").then(function (response) {
  let html = "";
  for (let i = 0; i < response.data.data.length; i++) {
    html += `
              <div class="col-md-3 col-3 paddding">
                <a href="detail.html?id=${response.data.data[i].id}">
                  <div class="fh5co_suceefh5co_height_2">
                    <img src="${response.data.data[i].thumb}" alt="img" />
                    <div class="fh5co_suceefh5co_height_position_absolute"></div>
                    <div class="fh5co_suceefh5co_height_position_absolute_font_2">
                      <div class="">
                        <p class="color_fff">
                          <i class="fa fa-clock-o mr-2"></i>${moment(
                            response.data.data[i].publish_date,
                            "YYYYMMDD"
                          ).fromNow()}
                        </p>
                      </div>
                      <div class="">
                        <a href="detail.html?id=${
                          response.data.data[i].id
                        }" class="fh5co_good_font_2">
                        ${response.data.data[i].title}
                        </a>
                      </div>
                    </div>
                  </div>
                </a>
              </div>`;
  }
  eleNewsNew.innerHTML = html;
});

listNews();

eleNewsMore.addEventListener("click", function (e) {
  e.preventDefault();
  pageCurrent += 1;
  listNews();
});

function listNews() {
  let contentNewGeneral = "";
  API.get(
    `https://apiforlearning.zendvn.com/api/v2/articles?limit=2&page=${pageCurrent}`
  ).then(function (response) {
    const newsGeneral = response.data.data;

    for (let i = 0; i < newsGeneral.length; ++i) {
      contentNewGeneral += newGeneral(newsGeneral[i]);
    }
    eleNewAriclesGeneral.innerHTML += contentNewGeneral;
  });
}

function newGeneral(item) {
  let iconDisplay;
  if (checkHeart(item.id)) {
    iconDisplay = `<i class="icon-heart fa fa-heart text-danger pt-4" data-id=${item.id}></i>`;
  } else {
    iconDisplay = `<i class="icon-heart fa fa-heart pt-4" data-id=${item.id}></i>`;
  }
  return `
  <div class="row pb-4">
    <div class="col-md-5">
      <a href="detail.html?id=${item.id}" >
        <img src="${item.thumb}" alt="" />  
      </a>      
    </div>
    <div class="col-md-7">
        <a href="detail.html?id=${item.id}" >
          <p class="fh5co_magna">
          ${item.title}
          </p>
          <p class="fh5co_mini_time">
          ${item.author} - ${moment(item.publish_date, "YYYYMMDD").fromNow()}
          </a>
          <div class="fh5co_consectetur line-clamp">
            ${item.description}
          </div>    
          ${iconDisplay}
        </a>
    </div>
  </div>
  `;
}

function popularStart(item) {
  return `
  <div class="fh5co_suceefh5co_height">
    <a href="detail.html?id=${item.id}">
      <img src="${item.thumb}" />
      <div class="fh5co_suceefh5co_height_position_absolute"></div>
      <div class="fh5co_suceefh5co_height_position_absolute_font">
        <div class="">
          <a href="detail.html?id=${item.id}" class="color_fff">
            <i class="fa fa-clock-o"></i>
            ${moment(item.publish_date, "YYYYMMDD").fromNow()}
          </a>
        </div>
        <div class="">
          <a href="detail.html?id=${item.id}" class="fh5co_good_font">
            ${item.title}
          </a>
        </div>    
      </div>
    </a>
    </div>;`;
}

function popularEndItem(item) {
  return `
  <div class="col-md-6 col-6 paddding" data-animate-effect="fadeIn">
    <a href="detail.html?id=${item.id}">
      <div class="fh5co_suceefh5co_height_2">
        <img src="${item.thumb}" alt="img" />
        <div class="fh5co_suceefh5co_height_position_absolute"></div>
        <div class="fh5co_suceefh5co_height_position_absolute_font_2">
          <div class="">
            <a href="#" class="color_fff">
              <i class="fa fa-clock-o"></i>${moment(
                item.publish_date,
                "YYYYMMDD"
              ).fromNow()}
            </a>
          </div>
          <div class="">
            <a href="detail.html?id=${item.id}" class="fh5co_good_font_2">
              ${item.title}
            </a>
          </div>
        </div>
      </div>
    </a>
  </div>`;
}

eleNewAriclesGeneral.addEventListener("click", function (e) {
  if (e.target.classList.contains("icon-heart")) {
    e.target.classList.toggle("text-danger");
    if (e.target.classList.contains("text-danger")) {
      //console.log("Liked: " + e.target.dataset.id);
      message("Yêu thích", "linear-gradient(to right, #00b09b, #96c93d)");
      items.push(parseInt(e.target.dataset.id));
    } else {
      message(
        "Bỏ yêu thích",
        "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))"
      );
      items = items.filter((item) => item !== parseInt(e.target.dataset.id));
    }
    localStorage.setItem("HEART", JSON.stringify(items));
  }
});

function message(text, bg) {
  Toastify({
    text: text,
    duration: 3000,
    style: {
      background: bg,
    },
    close: true,
  }).showToast();
}

function checkHeart(id) {
  if (items === null) {
    return false;
  }
  if (items.includes(id)) {
    return true;
  }
  return false;
}
