const mapListOfPOIsToDict = (pois, versionLocationData) =>
  pois.reduce((dict, poi) => {
    if (poi.type in dict) {
      dict[poi.type][poi.type][poi.key] = poi
    } else {
      const versionData = versionLocationData.find(data => data.type === poi.type)
      dict[poi.type] = {
        [poi.type]: {
          [poi.key]: poi
        },
        version: versionData ? versionData.version : null
      }
    }
    return dict
  }, {})


export {mapListOfPOIsToDict}