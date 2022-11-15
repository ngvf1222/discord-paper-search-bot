const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
function s(data){
  rd=[]
  for(let i=0;i<data.length;i++){
    rd[i]=data[i+'']
  }
  return rd
}
async function natureparsing(query,author='',title='',journals='',volume='',spage=0,order="relevance",date_rangestart=0,date_rangeend=0,page=1){
    url=`https://www.nature.com/search?q=${query}${author!==''?`&author=${author}`:''}${title!==''?`&title=${title}`:''}${journals!==''?`&journals=${journals}`:''}${volume!==''?`&volume=${volume}`:''}${spage!==0?`&spage=${spage}`:''}${order!==''?`&order=${order}`:''}${date_rangestart!==0?`&date_range=${date_rangestart}-`:''}${date_rangeend!==0?date_rangeend:''}&page=${page}`
    const getHtml = async () => {
        try {
          return await axios.get(url);
        } catch (error) {
          console.error(error);
        }
      };

  return getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.app-article-list-row").children("li.app-article-list-row__item");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('div.u-full-height article div.c-card__layout div.c-card__body h3.c-card__title a.c-card__link').text(),
          url: 'https://www.nature.com'+$(this).find('div.u-full-height article div.c-card__layout div.c-card__body h3.c-card__title a.c-card__link').attr('href'),
          image_url: $(this).find('div.u-full-height article div.c-card__layout div.c-card__image picture img').attr('src'),
          description: $(this).find('div.u-full-height article div.c-card__layout div.c-card__body div.c-card__summary p').text(),
          authorlist: s($(this).find('div.u-full-height article div.c-card__layout div.c-card__body ul.c-author-list').children("li").map(function(d){
            return $(this).find("span").text();
          })),
          Articletype: $(this).find("div.u-full-height article div.c-meta span[data-test=article.type]").text().trim(),
          Openaccess: $(this).find("div.u-full-height article div.c-meta span[data-test=open-access]").length===1,
          date: $(this).find('div.u-full-height article div.c-meta time').text(),//나머지는 내일에 너가하렴 나는 화장실!
          journal: $(this).find('div.u-full-height article div.c-meta div[data-test=journal-title-and-link]').text(),
          volumeandpageinfo: $(this).find('div.u-full-height article div.c-meta div[data-test=volume-and-page-info]').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res =>res);
}
module.exports=natureparsing
