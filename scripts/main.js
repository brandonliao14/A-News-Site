function main()
{
  console.log('main.js script is loaded');
  let main_body_content = document.getElementsByClassName('main_body_content')[0];
  main_body_content.innerHTML = templateNewsEntry(getNewsFeed()[0],'Finance') +
  templateNewsEntry(getNewsFeed()[1],'Finance') +
  templateNewsEntry(getNewsFeed()[2],'Finance')+
  templateNewsEntry(getNewsFeed()[3],'Finance') +
  templateNewsEntry(getNewsFeed()[1],'Finance') +
  templateNewsEntry(getNewsFeed()[4],'Finance')+
  templateNewsEntry(getNewsFeed()[2],'Finance')
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
      <a href="${news.link}">
        <div class="img_wrapper">
          <img src="${news.image}" alt="${news.title}">
          <div class="shadow_overlay">
            <div>
              <span>${news.title}</span>
            </div>
          </div>
        </div>
      </a>
        <p class="card-text"><small class="text-muted">${news.author ? news.author + " - " : ""}${news.date}</small>
          <small class="font-weight-bold">${news.source}</small>
        </p>
      </div>
    </div>
  `;
}

function getNewsFeed(){
  return  [
      {
        title: "Singapore’s January exports to China collapsed in ‘very worrying’ development for both economies",
        author: 'Finbarr Bermingham',
        date: 'Monday, 18 Feb, 2019 10:14pm',
        link: 'https://www.scmp.com/economy/china-economy/article/2186592/singapores-january-exports-china-collapsed-very-worrying',
        image: `https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2019/02/18/b30e4f06-3334-11e9-b09f-892c410303c7_image_hires_160852.jpg?itok=1N8NzuhB`,
        source: "South China Morning Post",
      },
      {
        title: 'As Wall Street rallies on US-China trade hopes, bond investors may be worried about a recession',
        author: 'Patti Domm',
        date: '12:02 PM ET Sun, 17 Feb 2019',
        link: 'https://www.cnbc.com/2019/02/17/stocks-rally-on-us-china-trade-deal-but-bond-investors-fear-recession.html',
        image: `https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2016/07/11/103779191-GettyImages-173274410.530x298.jpg?v=1544219696`,
        source: "CNBC",
      },
      {
        title: 'Will the US and China finally agree a trade deal?',
        author: '',
        date: '30 January 2019',
        link: 'https://www.bbc.com/news/business-47047289',
        image: `https://ichef.bbci.co.uk/news/660/cpsprodpb/DF29/production/_105392175_hi051830569.jpg`,
        source: "BBC",
      },
      {
        title: 'Feeling Unwelcome, Amazon Ditches Plans For New York Hub',
        author: 'Reuters',
        date: '2019-02-14 09:30:08',
        link: 'http://www.iporoom.com/detail/2226',
        image: `https://gdb.voanews.com/D0F01ABF-C31B-4FD9-9D87-4881DAFF2DC0_cx0_cy6_cw0_w800_h450.jpg`,
        source: "Ipo Room",
      },
      {
        title: "China's Bad Debt Managers Risk Becoming Bad Credits Themselves",
        author: "Reuters",
        date: 'Feb 17, 2019 4:55 AM  PT',
        link: 'https://www.capitalwatch.com/article-3466-1.html',
        image: `https://img.capitalwatch.com/201902/14/5c660a7300f12.JPG`,
        source: "CapitalWatch",
      },
    ]
}
