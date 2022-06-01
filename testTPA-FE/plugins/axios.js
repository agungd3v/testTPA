export default function ({ app, $axios, redirect, store }) {
  $axios.onRequest(async (config) => {
    const token = store.state.token
    if (token !== null || token !== 'null') {
      config.headers.common['Authorization'] = token ? `Bearer ${token}` : ''
    }
    config.headers.post['Content-Type'] = 'application/json'
    return config
  })
}