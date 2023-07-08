let url_string = urlCurrent;
let url = new URL(url_string);
const id = parseInt(url.searchParams.get("id"));
let currentPage = 1;
let lastPage;
let pageRange = 5;
let start = 1;
let end = pageRange;
let multi = 1;
let fix;

categotyOfPage(currentPage);

eleMentPagging.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-next-page")) {
    currentPage += 1;
    if (currentPage === end + 1) {
      multi += 1;
      start = end + 1;
      end = pageRange * multi;
    }
    categotyOfPage(currentPage);
  }

  if (e.target.classList.contains("btn-prev-page")) {
    currentPage -= 1;
    if (currentPage === end - pageRange || currentPage === fix - pageRange) {
      multi -= 1;
      if (multi == 0) {
        multi = 1;
      }
      end = pageRange * multi;
      start = end - pageRange + 1;
    }
    categotyOfPage(currentPage);
  }

  if (e.target.classList.contains("btn-number-current-page")) {
    let page = parseInt(e.target.textContent);
    currentPage = page;
    categotyOfPage(page);
  }
});

function categotyOfPage(pageCurrent) {
  API.get(`/categories_news/${id}/articles?limit=4&page=${pageCurrent}`).then(
    function (response) {
      lastPage = response.data.meta.last_page;
      if (end > response.data.meta.last_page) {
        fix = end;
        end = response.data.meta.last_page;
      }
      let html = ` <div>
                      <div class="fh5co_heading fh5co_heading_border_bottom py-2 mb-4">
                         Category / ${response.data.data[0].category.name}
                      </div>
                  </div>`;
      for (let i = 0; i < response.data.data.length; i++) {
        html += newsCategory(response.data.data[i]);
      }
      eleCategoryNews.innerHTML = html;
      paggingNew();
    }
  );
}

API.get("/articles/popular?limit=10").then(function (reponse) {
  let length = reponse.data.data.length;
  let html = "";
  for (let i = 0; i < length; ++i) {
    html += popularInDetailPage(reponse.data.data[i]);
  }
  elePopularDetail.innerHTML = html;
});

function paggingNew() {
  eleMentPagging.innerHTML = "";
  let htmlAction = `<div class="col-12 text-center pb-4 pt-4" >
                          <a href="#" class="btn_mange_pagging btn-prev-page"
                            ><i class="fa fa-long-arrow-left"></i>&nbsp;&nbsp; Previous</a
                          >`;
  for (let i = start; i <= end; i++) {
    htmlAction += ` <a href="#" class="btn_pagging btn-number-current-page">${i}</a>`;
  }

  htmlAction += `<a href="#" class="btn_mange_pagging btn-next-page"
                    >Next <i class="fa fa-long-arrow-right"></i>&nbsp;&nbsp;
                  </a>
                  </div>`;

  eleMentPagging.innerHTML = htmlAction;
  if (currentPage === 1) {
    document.querySelector(".btn-prev-page").style.pointerEvents = "none";
  } else {
    document.querySelector(".btn-prev-page").style.pointerEvents = "auto";
  }

  if (currentPage === lastPage) {
    document.querySelector(".btn-next-page").style.pointerEvents = "none";
  } else {
    document.querySelector(".btn-next-page").style.pointerEvents = "auto";
  }

  document
    .querySelectorAll(".btn-number-current-page")
    [(currentPage - 1) % pageRange].classList.add("bg-warning");
}

function newsCategory(item) {
  let iconDisplay;
  if (checkHeart(item.id)) {
    iconDisplay = `<i class="icon-heart fa fa-heart text-danger" data-id=${item.id}></i>`;
  } else {
    iconDisplay = `<i class="icon-heart fa fa-heart" data-id=${item.id}></i>`;
  }
  return ` <div class="row pb-4">
                <div class="col-md-5">
                <div class="fh5co_hover_news_img">
                    <div class="fh5co_news_img">
                    <img src="${item.thumb}" alt="" />
                    </div>
                    <div></div>
                </div>
                </div>
                <div class="col-md-7 ">
                <a href="detail.html?id=${item.id}" class="fh5co_magna py-2">
                    ${item.title}
                </a>
                <a href="#" class="fh5co_mini_time py-3">
                    ${item.author} - ${moment(
    item.publish_date,
    "YYYYMMDD"
  ).fromNow()}
                </a>
                <div class="fh5co_consectetur line-clamp">
                  ${item.description}
                </div>
                ${iconDisplay}
                </div>
        </div>`;
}

function popularInDetailPage(item) {
  return `
  <div class="row pb-3">
    <a  href=detail.html?id=${item.id} class="col-5 align-self-center">  
        <img
        src="${item.thumb}"
        alt="img"
        class="fh5co_most_trading"/>
     
    </a>
    <div class="col-7 paddding">
      <a href=detail.html?id=${
        item.id
      } class="most_fh5co_treding_font line-clamp">
        ${item.title}
      </a>
          <div class="most_fh5co_treding_font_123">  ${item.author} - ${moment(
    item.publish_date,
    "YYYYMMDD"
  ).fromNow()}</div>
        </div>
  </div>
  `;
}

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

eleCategoryNews.addEventListener("click", function (e) {
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
      //console.log("Unlike: " + e.target.dataset.id.constructor);
      items = items.filter((item) => item !== parseInt(e.target.dataset.id));
    }
    localStorage.setItem("HEART", JSON.stringify(items));
  }
});
