import async from 'async'
export default {
  loadAllData (store) {
    async.parallel([
      () => {
        store.dispatch('cpu/getAll')
      },
      () => {
        store.dispatch('dashboard/getAll')
      },
      () => {
        store.dispatch('disk/getAll')
      },
      () => {
        store.dispatch('host/getAll')
      },
      () => {
        store.dispatch('memory/getAll')
      },
      () => {
        store.dispatch('network/getAll')
      }
    ], (err, results) => {
      console.log(err)
    })
  },
  loadAllDefaultData (store) {
    async.parallel([
      () => {
        store.dispatch('cpu/loadDefaultData')
      },
      () => {
        store.dispatch('dashboard/loadDefaultData')
      },
      () => {
        store.dispatch('disk/loadDefaultData')
      },
      () => {
        store.dispatch('host/loadDefaultData')
      },
      () => {
        store.dispatch('memory/loadDefaultData')
      },
      () => {
        store.dispatch('network/loadDefaultData')
      }
    ], (err, results) => {
      console.log(err)
    })
  }
}
