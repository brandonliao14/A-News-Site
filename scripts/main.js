function main()
{
  console.log('main.js script is loaded');
  let path ="../news_feed.json";

  function readJSON(path) {
    return new Promise(function(resolve,reject){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', path, true);
      xhr.responseType = 'blob';
      xhr.onload = function(e) {
        if (this.status == 200) {
          var file = new File([this.response], 'temp');
          var fileReader = new FileReader();
          fileReader.addEventListener('load', function(){
            resolve(JSON.parse(fileReader.result));
          });
          fileReader.readAsText(file);
        }
      }
      xhr.onerror = function(){
        reject(xhr.statusText);
      };
      xhr.send();
    });
  }
  let promise = readJSON(path);
  promise.then(function(news_feed){
    let main_body_content = document.getElementsByClassName('main_body_content')[0];
    main_body_content.innerHTML =
      groupNewsFeed(news_feed.finance, "finance",3) +
      groupNewsFeed(news_feed.finance, "finance",4) +
      groupNewsFeed(news_feed.finance, "finance",2) +
      groupNewsFeed(news_feed.finance, "finance",4) +
      groupNewsFeed(news_feed.finance, "finance",3) +
      groupNewsFeed(news_feed.finance, "finance",2)
  }).then().catch(function(err){
    console.log(err);
  })

}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", main, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", main);
else window.onload = main;

function groupNewsFeed(list_of_news,category,number_of_entries){
  let entries = "";
  for(var i =1; i <=number_of_entries; i++){
    entries +=  templateNewsEntry(list_of_news[i]) ;
  }
  return `
    <div class="card">
      <div class="card-body">
        ${templateCategoryHeadLine(list_of_news[0],category)}
        ${entries}
      </div>
    </div>
  `
}

function templateCategoryHeadLine(news,category){
  return `
    <a href="../html/${category}.html" class="text-uppercase text-center">
      <div class="card-title">
        ${category}
      </div>
    </a>
    <a href="${news.link}" target="_blank">
      <div class="img_wrapper">
        <img src="${news.image}" alt="${news.title}">
        <div class="shadow_overlay">
          <div>
          <span class="font-weight-bold">${news.title}</span>
          </div>
        </div>
      </div>
    </a>
    <p class="card-text">
    <small class="">(${news.source})</small>
    <small class="text-muted font-italic">${news.author ? news.author + " - " : ""}${news.date}</small>
    </p>
  `;
}

function templateNewsEntry(news){
  return `
  <a href="${news.link}" target="_blank">
    <div class="news_feed card-footer bg-white p-1">
      <small>
        <span class="font-weight-bold">${news.title}</span>
        (${news.source})
        <span class="text-muted font-italic">${news.author ? news.author + " - " : ""}${news.date}</span>
      </small>
    </div>
  </a>
  `;
}
