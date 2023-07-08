const elemNavbarMenu = document.getElementById("menu-navbar");
const eleNewAriclesGeneral = document.getElementById("new-articles-general");
const eleNewsMore = document.getElementById("btn-news-more");
const elePopularStart = document.getElementById("popular-start");
const elePopularEnd = document.getElementById("popular-end");
const eleCategoryNews = document.getElementById("category-news");
const eleDetailTitleBox = document.getElementById("fh5co-title-box");
const eleSingleContentStart = document.getElementById("single-content-start");
const eleMentPagging = document.getElementById("pagging");
const buttonSearchKey = document.querySelector(".search-keyword");
const elePopularDetail = document.getElementById("popular-detail");
const eleNewsCategoryDetail = document.getElementById("news-category-detail");
const valueOfInputSearch = document.querySelector(".value-search");
const access_token = localStorage.getItem("ACCESS_TOKEN");
const btnLogin = document.querySelector(".btn-login");
const btnRegister = document.querySelector(".btn-register");
const btnChangePassword = document.querySelector(".btn-change-password");
const btnComment = document.querySelector(".form-submit-commnet");
const eleContentComment = document.querySelector(".content-commnent");
const elementCommentParent = document.getElementById("comment-parent");
const eleAllCommentChild = document.getElementById("comment-child");
const eleNewsNew = document.getElementById("news-new");
const eleReplyComment = document.querySelector(".reply-commnet");
const messageError = document.querySelector(".error");

const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2",
});

if (buttonSearchKey !== null) {
  buttonSearchKey.addEventListener("click", function (e) {
    e.preventDefault();
    let key = valueOfInputSearch.value;
    window.location.href = `search.html?q=${key}`;
  });
}

let urlCurrent = window.location.href;

let items = localStorage.getItem("HEART");
if (items === null) {
  items = [];
} else {
  items = JSON.parse(localStorage.getItem("HEART"));
}

let ALL_COMMENTS = JSON.parse(localStorage.getItem("ALL_COMMENTS")) || [];
