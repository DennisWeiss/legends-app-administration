
const getUrl = req => req.protocol + "://" + req.get("host") + '/'

const applyUrlToPoi = (poi, req) => {
  const url = getUrl(req)
  const objNeedUrl = [poi.icons, poi.media.image, poi.media.video]
  const arrayNeedUrl = [poi.media.vuforiaTargets]
  objNeedUrl.forEach(obj => {
    Object.keys(obj).forEach(key => {
      obj[key] = obj[key] ? url + obj[key] : ''
    })
  })
  arrayNeedUrl.forEach(obj => {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = url + obj[i]
    }
  })
}

const applyUrlToContentOfPoi = (poi, req) => {
  const url = getUrl(req)
  for (let [lang, content] of poi.media.content.entries()) {
    if (poi.type === 'legends') {
      ['explored', 'preview', 'puzzle'].forEach(field => {
        content[field].url = url + content[field].url
      })
      content.puzzle.hints = content.puzzle.hints.map(hint => url + hint.url)
    } else {
      content.info.url = url + content.info.url
    }
  }
}

export {applyUrlToPoi, applyUrlToContentOfPoi}