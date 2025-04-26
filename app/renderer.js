const {
  shell
} = require("electron");
//书签列表
let bookmarkerList = [];
//解析器
const parser = new DOMParser();
//清除书签列表按钮
const button = document.querySelector(".clear-list");
button.addEventListener("click", () => {
  bookmarkerList = [];
  linkList.innerHTML = "";
});

//添加新链接
const form = document.querySelector(".new-link-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = event.target.querySelector("input").value;
  //清空输入框
  event.target.querySelector("input").value = "";
  getWebsiteTitle(url).then((title) => {
    bookmarkerList.push({
      url,
      title,
    });
    linkList.innerHTML = bookmarkerList
      .map(
        (item) =>
        `<li><h3>${item.title}</h3><a href="${item.url}">${item.url}</a></li>`
      )
      .join("");
  });
});

//渲染书签列表
const linkList = document.querySelector(".link-list");
linkList.innerHTML = bookmarkerList
  .map(
    (item) =>
    `<li><h3>${item.title}</h3><a href="${item.url}">${item.url}</a></li>`
  )
  .join("");

linkList.addEventListener("click", (event) => {
  const url = event.target.href;
  event.preventDefault();
  shell.openExternal(url);
});
//获取网站标题
async function getWebsiteTitle(url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const title = parser
      .parseFromString(data, "text/html")
      .querySelector("title").textContent;
    return title;
  } catch (error) {
    handleError(error, url);
  }
}
//处理错误
function handleError(error, url) {
  const errorMessage = document.querySelector(".error-message");
  errorMessage.textContent = `Error fetching website title: ${url} :${error.message}`;
  setTimeout(() => {
    errorMessage.textContent = "";
  }, 3000);
}