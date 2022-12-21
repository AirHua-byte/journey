import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  console.log(store, '+++++++++++++++')
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'state',
      path:['index.data','index.index','index.status']
    })(store)
  })
}