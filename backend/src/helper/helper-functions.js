import fs from 'fs'


const increaseVersion = version => {
  const parts = version.split('.')
  parts[2] = (parseInt(parts[2], 10) + 1).toString()
  return parts.join('.')
}

const formatFilename = (filename, iteration) => filename + (iteration === 0 ? '' : iteration)

const generateNewFilename = (filename, iteration = 0) => {
  const formattedFilename = formatFilename(filename, iteration)
  if (fs.existsSync(`files/${formattedFilename}`)) {
    return generateNewFilename(filename, iteration + 1)
  }
  return formattedFilename
}

export {increaseVersion, generateNewFilename}