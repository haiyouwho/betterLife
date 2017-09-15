let sMoveBaseUrl = 'http://api.douban.com/v2/',
  sMoveInHot = 'movie/in_theaters?city=深圳',
  sMoveDetailUrl = 'movie/subject/',
  sComingSoonUrl = 'movie/coming_soon',
  sTop250 = 'movie/top250',
  sUSBox = 'movie/us_box',
  sWeekly = 'movie/weekly', //接口失效
  sNewMovies = 'movie/new_movies', //接口失效
  sSearchByName = 'movie/search?q=',
  sSearchByType = 'movie/search?tag=',
  sDetail = 'movie/subject/'

function cc() {
  if (arguments.length) {
    var arr = []
    for (var i = 0; i < arguments.length; i++) {
      arr.push(arguments[i])
    }
    console.log(arr)
  } else {
    console.log('使用cc()时请输入参数！')
  }
}

function getScreenHeight() {
  var sH = window.screen.height
  return sH
}

function setGlobalfontSize() {
  var oHtml = document.querySelector('html'),
    width = oHtml.getBoundingClientRect().width
  oHtml.style.fontSize = width / 18.75 > 20 ? width / 18.75 + 'px' : '20px'
}

function getUrlData(obj, url, callback) {
  obj.jsonp(url, null, function(err, data) {
    err ? console.log(err) : callback(data)
  })
}

function hotUrl(start = 0, end = 5) {
  let url = `${sMoveBaseUrl}${sMoveInHot}?start=${start}&count=${end}`
  return url
}

function top250Url(start = 0, end = 5) {
  let url = `${sMoveBaseUrl}${sTop250}?start=${start}&count=${end}`
  return url
}

function commingUrl(start = 0, end = 5) {
  let url = `${sMoveBaseUrl}${sComingSoonUrl}?start=${start}&count=${end}`
  return url
}

function usboxUrl(start = 0, end = 5) {
  let url = `${sMoveBaseUrl}${sUSBox}?start=${start}&count=${end}`
  return url
}
function detailUrl(id = 1764796) {
  let url = `${sMoveBaseUrl}${sDetail}${id}`
  return url
}
/*
 ** @params data 请求到的数据
 ** @params options 处理的配置
 ** @params options.sortBy 数据排序依据
 ** @params options.img 图片大小
 */
function dealDou(data, options) {
  let arr = []
  options = Object.assign({
    sortBy: 'collect_count'
  }, options)
  data.subjects.forEach(function(val, key) {
    try {
      let castsArr = []
      val = typeof(val.title) == 'undefined' ? val.subject : val //top250的数据结构不一样
      val.genres = val.genres.join('/')
      val.casts.forEach((v,k)=>{
          castsArr.push(v.name)
      })
      val.castsName = castsArr.join('/')
      arr.push(val)　
    } catch (err) {
      console.log('catch error:', err)　　
    }
  })
  data = null 
  arr = sortArr(arr, [options.sortBy])
  return arr
}

function sortArr(arr, way) { //数据排序，根据way来
  arr.sort((a, b) => { return b[way] - a[way] })
  return arr
}


export {
  cc,
  getScreenHeight,
  setGlobalfontSize,
  sSearchByName,
  sSearchByType,
  getUrlData,
  hotUrl,
  top250Url,
  commingUrl,
  usboxUrl,
  detailUrl,
  dealDou
}

/**
 * 获取localStorage
 */
// export const getStore = name => {
//     if (!name) return;
//     return window.localStorage.getItem(name);
// }
