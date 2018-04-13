export default {
  disableLoader () {
    $("<style id='loadSyle' type='text/css'> #nprogress {display: none;} </style>").appendTo('head')
  },
  enableLoader () {
    $('#loadSyle').remove()
  }
}
