function autorun()
{
  console.log("category.js is loaded");

  let path ="../news_feed.json";
  let category = window.location.pathname.split('/')[2].split('.')[0];
  let promise = readJSON(path);
  promise.then(function(data){
    console.log(data);
    let main_body_content = document.getElementsByClassName('main_body_content')[0];
    console.log(templateContents(data[category],category));
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
      <div class="row news_entry">
        <div class="col-12 col-sm-3 col-md-4 col-lg-4">
          <img src="${curr_news.image}" alt="Broken Image">
        </div>
        <div class="col-12 col-sm-9 col-md-8 col-lg-8">
          <a href="${curr_news.link} class="font-weight-bold">${curr_news.title}</a>
          <p class="text-muted">${curr_news.author ? curr_news.author + " - " : "" } ${curr_news.date}</p>
        </div>
      </div>
    `;
    console.log(entries);
  }
  console.log(entries);
  return `
    <div>
      <h4 class="text-capitalize">${category}</h4>
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
