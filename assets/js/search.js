let url_string = urlCurrent;
let url = new URL(url_string);
const keyword = url.searchParams.get("q");
valueOfInputSearch.value = keyword;
let pageCurrent = 1;
let lastPage;
loadData();

function loadData() {
  API.get(`/articles/search?q=${keyword}&limit=5&page=${pageCurrent}`).then(
    function (response) {
      lastPage = response.data.meta.last_page;
      let html = "";
      for (let i = 0; i < response.data.data.length; i++) {
        html += newsContainKeyWord(response.data.data[i], keyword);
      }
      eleCategoryNews.innerHTML = html;
      eleMentPagging.innerHTML = pagging();
      if (pageCurrent === 1) {
        document.querySelector(".btn-prev-page").classList.add("disabled");
      }
      if (pageCurrent === lastPage) {
        document.querySelector(".btn-next-page").classList.add("disabled");
      }
    }
  );
}

function newsContainKeyWord(item, keyword = "") {
  if (keyword) {
    const path = new RegExp(keyword, "igm");
    item.title = item.title.replace(path, (match) => {
      return `<mark class="text-warning">${match}</mark>`;
    });

    item.description = item.description.replace(path, (match) => {
      return `<mark class="text-warning">${match}</mark>`;
    });

    item.content = item.content.replace(path, (match) => {
      return `<mark class="text-warning">${match}</mark>`;
    });
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
                      ${item.author} - ${item.publish_date}
                  </a>
                  <div class="fh5co_consectetur line-clamp">
                    ${item.description}
                  </div>
                  </div>
          </div>`;
}

API.get("/articles/popular?limit=10").then(function (reponse) {
  let length = reponse.data.data.length;
  let html = "";
  for (let i = 0; i < length; ++i) {
    html += popularInDetailPage(reponse.data.data[i]);
  }
  elePopularDetail.innerHTML = html;
});

function popularInDetailPage(item) {
  return `
  <div class="row pb-3">
    <div class="col-5 align-self-center">
      <img
        src="${item.thumb}"
        alt="img"
        class="fh5co_most_trading"
      />
    </div>
    <div class="col-7 paddding">
      <div class="most_fh5co_treding_font line-clamp">
        ${item.title}
      </div>
      <div class="most_fh5co_treding_font_123">  ${item.author} - ${moment(
    item.publish_date,
    "YYYYMMDD"
  ).fromNow()}</div>
    </div>
  </div>
  `;
}

function pagging() {
  let html = "";
  for (let i = 1; i <= 5; ++i) {
    html += `<a href="#" class="btn_pagging btn-page-current">${i}</a>`;
  }
  return `
  <div class="col-12 text-center pb-4 pt-4">
    <a href="#" class="btn_mange_pagging btn-prev-page">
      <i class="fa fa-long-arrow-left"></i>&nbsp;&nbsp; Previous
    </a>
    ${html}
    <a href="#" class="btn_mange_pagging btn-next-page">
      Next <i class="fa fa-long-arrow-right"></i>&nbsp;&nbsp;
    </a>
  </div>`;
}

eleMentPagging.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-page-current")) {
    pageCurrent = parseInt(e.target.text);
  }
  if (e.target.classList.contains("btn-next-page")) {
    pageCurrent += 1;
  }
  if (e.target.classList.contains("btn-prev-page")) {
    pageCurrent -= 1;
  }
  loadData();
});
