import * as moment from "moment";



const getTimestamp = (date, time) => {
  const timePattern = /([1-9]|0[1-9]|1[0-2]):([0-5][0-9]) (am|pm)/g
  const parsedTime = timePattern.exec(time)
  if (!parsedTime) {
    throw 'Invalid time string'
  }
  const dayTimeSec = parseInt(parsedTime[1], 10) * 3600 + parseInt(parsedTime[2], 10) * 60 + (parsedTime[3] === 'pm' ? 12 * 3600 : 0)
  return moment(date).startOf('day').unix() + dayTimeSec
}

export {getTimestamp}
