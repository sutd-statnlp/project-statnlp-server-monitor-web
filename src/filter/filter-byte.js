export default (input, limit) => {
  if (typeof input !== 'number' || isNaN(input)) {
    input = parseFloat(input)
  }
  if (typeof limit !== 'number' || isNaN(limit)) {
    limit = 2
  }
  var exponent
  var unit
  var neg = input < 0
  var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  if (neg) {
    input = -input
  }

  if (input < 1) {
    return (neg ? '-' : '') + input + ' B'
  }

  exponent = Math.min(Math.floor(Math.log(input) / Math.log(1000)), units.length - 1)
  input = (input / Math.pow(1000, exponent)).toFixed(limit) * 1
  unit = units[exponent]

  return (neg ? '-' : '') + input + ' ' + unit
}
