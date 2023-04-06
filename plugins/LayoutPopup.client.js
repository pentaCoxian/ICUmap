import LayerPopup from 'ol-ext/control/LayerPopup';


export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      LayerPopup,
    }
  }
})

