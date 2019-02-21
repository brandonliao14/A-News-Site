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
    main_body_content.innerHTML = templateNewsEntry(news_feed[0],'Finance') +
    templateNewsEntry(news_feed[1],'Finance') +
    templateNewsEntry(news_feed[2],'Finance')+
    templateNewsEntry(news_feed[3],'Finance') +
    templateNewsEntry(news_feed[1],'Finance') +
    templateNewsEntry(news_feed[4],'Finance')+
    templateNewsEntry(news_feed[2],'Finance')
  }).then().catch(function(err){
    console.log(err);
  })



  // groupNewsFeed(getNewsFeed(),'Finance',4) +
  // groupNewsFeed(getNewsFeed(),'Finance',2) +
  // groupNewsFeed(getNewsFeed(),'Finance',3) +
  // groupNewsFeed(getNewsFeed(),'Finance',4) +
  // groupNewsFeed(getNewsFeed(),'Finance',2)
  // ;

}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", main, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", main);
else window.onload = main;

function groupNewsFeed(list_of_news,category,number_of_entries){
  let entries = "";
  for(var i =1; i <=number_of_entries; i++){
    entries += templateNewsEntry(list_of_news[i]);
  }
  return `
  <div class="col-12 col-sm-6 col-lg-4 col-md-6">
  <div class="entry">
  <div class="news_category">
  <a class="h5 text-uppercase" href="/html/${category.toLowerCase()}.html">${category}</a>
  <a class="float-right text-uppercase" href="/html/${category.toLowerCase()}.html">View All</a>
  </div>
  ${templateCategoryImage(list_of_news[0])}
  <div class="row entry_sub_news_feed">
  ${entries}
  </div>
  </div>
  </div>
  `
}

function templateCategoryImage(news){
  return `
  <div class="entry_sub_main_photo">
  <img src="${news.image}">
  <div class="img_overlay">
  <a href="${news.link}" class="h5">${news.title}</a>
  <span>${news.author || ''} - ${news.date}</span>
  </div>
  </div>
  `;
}

function templateNewsEntry(news, category){
  return `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${category}</h5>
      <a href="${news.link}" target="_blank">
        <div class="img_wrapper">
          <img src="${news.image}" alt="${news.title}">
          <div class="shadow_overlay">
            <div>
            <span>${news.title}</span>
            </div>
          </div>
        </div>
      </a>
      <p class="card-text">
      <small class="font-weight-bold">${news.source}</small> -
      <small class="text-muted">${news.author ? news.author + " - " : ""}${news.date}</small>
      </p>
    </div>
  </div>
  `;
}
