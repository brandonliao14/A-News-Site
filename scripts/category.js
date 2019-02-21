function autorun()
{
  console.log("category.js is loaded");

  let path ="../news_feed.json";
  let category = window.location.pathname.split('/')[2].split('.')[0];
  let promise = readJSON(path);
  promise.then(function(data){
    var news_feed = data[category];
    console.log(news_feed);
  }).then().catch(function(err){
    console.log(err);
  })
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;

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
