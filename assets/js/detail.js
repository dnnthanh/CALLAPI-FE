let url_string = urlCurrent;
let url = new URL(url_string);
const id = parseInt(url.searchParams.get("id"));
const userName = localStorage.getItem("LOGIN_NAME");

if (userName === null) {
  console.log(userName);
  messageError.innerHTML = "Vui lòng đăng nhập để commnet";
} else {
  btnComment.classList.add("d-flex");
}

let idParent = null;
let FILTER = ALL_COMMENTS.filter((item) => item.articleId === id);
loadCommentParent(FILTER);

API.get(`/articles/${id}`).then(function (reponse) {
  let category_id = reponse.data.data.category_id;
  eleDetailTitleBox.style.backgroundImage = `url(${reponse.data.data.thumb})`;
  eleDetailTitleBox.innerHTML = bg(reponse.data.data);
  eleSingleContentStart.innerHTML = `<p>${reponse.data.data.content}</p>`;

  API.get(`/categories_news/${category_id}/articles?limit=4`).then(function (
    reponse
  ) {
    let length = reponse.data.data.length;
    let html = "";
    for (let i = 0; i < length; ++i) {
      html += newsHaveCategory(reponse.data.data[i]);
    }
    eleNewsCategoryDetail.innerHTML = html;
  });
});

API.get("/articles/popular?limit=10").then(function (reponse) {
  let length = reponse.data.data.length;
  let html = "";
  for (let i = 0; i < length; ++i) {
    html += popularInDetailPage(reponse.data.data[i]);
  }
  elePopularDetail.innerHTML = html;
});

function bg(item) {
  return `
    <div class="overlay"></div>
    <div class="page-title">
      <img src="images/person_1.jpg" alt="Free HTML5 by FreeHTMl5.co" />
      <span>${moment(item.publish_date, "YYYYMMDD").fromNow()}</span>
      <h2>${item.title}</h2>
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

function newsHaveCategory(item) {
  return `
  <div class="col-sm-3">
    <div class="fh5co_hover_news_img">
      <div class="fh5co_news_img">
        <img src="${item.thumb}" alt="" />
      </div>
      <div>
        <a href="detail.html?id=${
          item.id
        }" class="d-block fh5co_small_post_heading"
          ><span class="line-clamp"
            >${item.title}</span
          ></a
        >
        <div class="c_g"><i class="fa fa-clock-o"></i>  ${moment(
          item.publish_date,
          "YYYYMMDD"
        ).fromNow()}</div>
      </div>
    </div>
  </div>`;
}

btnComment.addEventListener("submit", function (e) {
  e.preventDefault();
  let commentChild = [];

  let commment = {
    id: makeid(),
    name: userName,
    content: eleContentComment.value,
    datetime: moment().format(),
    articleId: id,
    commentChild: commentChild,
  };

  if (idParent) {
    let item = ALL_COMMENTS.find((item) => item.id === idParent);
    item.commentChild.push(commment);
  } else {
    ALL_COMMENTS.push(commment);
  }

  localStorage.setItem("ALL_COMMENTS", JSON.stringify(ALL_COMMENTS));
  FILTER = ALL_COMMENTS.filter((item) => item.articleId === id);
  let html = "";
  FILTER.forEach((e) => {
    let htmlChild = "";
    e.commentChild.forEach((element) => {
      htmlChild += `
      <div id="comment-child" class="mt-3 mb-4" style="margin-left: 100px">
        <div class="row">
          <div class="col-1 mr-3">
            <img
              class="rounded-circle shadow-1-strong me-3"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
              alt="avatar"
              width="65px"
            />
          </div>

          <div class="col-9 d-flex">
            <div>
              <p>${element.name}</p>
              <p>
                ${element.content}
              </p>
            </div>
            <a class="ml-3 reply-commnet" href="#" data-id=${element.id}><i class="fa fa-reply"></i><span class="small"> reply</span></a>
          </div>
        </div>
    </div>   
      `;
    });
    html += `<div class="row mb-4">
              <div class="col-1 mr-3">
                <img
                  class="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                  alt="avatar"
                  width="65px"
                />
              </div>

              <div class="col-9 d-flex">
                <div>
                  <p>${e.name} - ${e.datetime}</p>
                  <p>
                    ${e.content}
                  </p>
                </div>
                <a class="ml-3 reply-commnet" href="#" data-id=${e.id}><i class="fa fa-reply"></i><span class="small"> reply</span></a
                >
              </div>
            </div>  
            ${htmlChild}     
            `;
  });
  elementCommentParent.innerHTML = html;
  idParent = null;
});

function makeid(length = 5) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function displayComment(item) {
  let htmlChild = "";
  item.commentChild.forEach((element) => {
    htmlChild += `
    <div id="comment-child" class="mt-3" style="margin-left: 100px">
      <div class="row mb-4">
        <div class="col-1 mr-3">
          <img
            class="rounded-circle shadow-1-strong me-3"
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
            alt="avatar"
            width="65px"
          />
        </div>

        <div class="col-9 d-flex">
          <div>
            <p>${element.name}</p>
            <p>
              ${element.content}
            </p>
          </div>
          <a class="ml-3 reply-commnet" href="#" data-id=${element.id}><i class="fa fa-reply"></i><span class="small"> reply</span></a>
        </div>
      </div>
  </div>   
    `;
  });
  return `
        <div class="row mb-4">
              <div class="col-1 mr-3">
                <img
                  class="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                  alt="avatar"
                  width="65px"
                />
              </div>

              <div class="col-9 d-flex">
                <div>
                  <p>${item.name} - ${item.datetime}</p>
                  <p>
                    ${item.content}
                  </p>
                </div>
                <a class="ml-3 reply-commnet" href="" data-id=${item.id}><i class="fa fa-reply"></i><span class="small"> reply</span></a
                >
              </div>
        </div>
        ${htmlChild}
        `;
}

function loadCommentParent(items) {
  let html = "";
  items.forEach((item) => {
    html += displayComment(item);
  });
  //console.log(html);
  elementCommentParent.innerHTML = html;
}

elementCommentParent.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("reply-commnet")) {
    idParent = e.target.dataset.id;
    console.log("id parent: " + idParent);
  }
});
