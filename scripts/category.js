function autorun()
{
  console.log("category.js is loaded");

  let path ="https://hmliao14.github.io/A-News-Site/news_feed.json";
  let paths = window.location.pathname.split('/');
  let category = paths[paths.length-1].split('.')[0];
  let promise = readJSON(path);
  promise.then(function(data){
    console.log(data);
    let main_body_content = document.getElementsByClassName('main_body_content')[0];
    main_body_content.innerHTML = templateContents(data[category],category);
  }).then().catch(function(err){
    console.log(err);
  })
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;

function templateContents(list_of_news,category){
  let entries = "";
  let curr_news;
  for(var i =0; i < list_of_news.length; i++){
    curr_news = list_of_news[i];
    entries +=
    `
      <div class="row">
        <div class="news_entry col-lg-10 offset-lg-1">
          <a href="${curr_news.link}" target="_blank" class="font-weight-bold">
            <div class="row">
              <div class="col-12 col-sm-5 col-md-4 col-lg-4">
                <img src="${curr_news.image}" alt="Broken Image">
              </div>
              <div class="col-12 col-sm-7 col-md-8 col-lg-8">
                <div class="news_title">${curr_news.title}</div>
                <p>
                  <span class="font-weight-bold">${curr_news.source}</span>
                  <span class="text-muted"> - ${curr_news.author ? curr_news.author + " - " : "" } ${curr_news.date}</span>
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
  }
  return `
    <div>
      <div class="row">
        <div class="col-lg-10 offset-lg-1 px-3 border bg-white mt-4">
          <div class="h4 my-0 text-uppercase py-4 text_shadow_wht">${category}</div>
        </div>
      </div>
      ${entries}
    </div>
  `
}

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
