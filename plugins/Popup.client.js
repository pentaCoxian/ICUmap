import Popup from 'ol-ext/overlay/Popup';

export default defineNuxtPlugin(nuxtApp => {
    return{
      provide:{
        Popup
      }
    }
  })