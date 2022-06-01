export default () => {
  process.browser && window.onNuxtReady(() => {
    if (feather) feather.replace({width: 14, height: 14})
  })
}