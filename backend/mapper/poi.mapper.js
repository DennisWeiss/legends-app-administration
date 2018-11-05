const mapListOfPOIsToDict = pois =>
  pois.reduce((dict, poi) => {
    if (poi.type in dict) {
      dict[poi.type][poi.type][poi.key] = poi
    } else {
      dict[poi.type] = {
        [poi.type]: {
          [poi.key]: poi
        },
        version: 1
      }
    }
    return dict
  }, {})


export {mapListOfPOIsToDict}