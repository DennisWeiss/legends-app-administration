const increaseVersion = version => {
  const parts = version.split('.')
  parts[2] = (parseInt(parts[2], 10) + 1).toString()
  return parts.join('.')
}

export {increaseVersion}