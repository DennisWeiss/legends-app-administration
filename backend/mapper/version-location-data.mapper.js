const mapVersions = versions =>
  versions.reduce((dict, version) => {
    dict[version.type] = {
      url: version.type,
      version: version.version
    }
    return dict
  }, {})

const mapVersionLocationData = versions => ({
  locationData: mapVersions(versions)
})

export {mapVersionLocationData}