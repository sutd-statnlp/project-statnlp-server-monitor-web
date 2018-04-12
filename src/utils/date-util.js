import moment from 'moment'

export default {
  unixTimeToDateString (unixTime) {
    return moment(unixTime * 1000).format('D/MM/YY')
  },
  secondsToTime (seconds) {
    seconds = parseInt(seconds, 10)
    var days = Math.floor(seconds / (3600 * 24))
    seconds -= days * 3600 * 24
    var hrs = Math.floor(seconds / 3600)
    seconds -= hrs * 3600
    var mnts = Math.floor(seconds / 60)
    seconds -= mnts * 60
    return days + 'd ' + hrs + 'h'
  }
}
