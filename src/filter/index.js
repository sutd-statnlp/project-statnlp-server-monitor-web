import uppercase from './filter-uppercase'
import byte from './filter-byte'
import limit from './filter-limit'

export default {
  install (Vue) {
    Vue.filter('uppercase', uppercase)
    Vue.filter('byte', byte)
    Vue.filter('limit', limit)
  }
}
