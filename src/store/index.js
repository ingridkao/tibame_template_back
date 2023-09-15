import { createStore } from 'vuex'
import AES from 'crypto-js/aes'
import ENC from 'crypto-js/enc-utf8'
const decode = '1qaz2wsx' // 自定義金鑰字串

const baseURL = process.env.NODE_ENV === 'development' ? '/api': 'https://tibamef2e.com/cgd103/g1/api'
export default createStore({
  state: {
    siteLoad: false,
    userInfo: null,
    baseURL: baseURL
  },
  getters: {
  },
  mutations: {
    updateSiteLoad (state, toggle) {
      state.siteLoad = toggle
    },
    setUseInfo (state, json) {
      if(json){
        // 👍 1. 只存token甚至再加密 2. 將使用者資訊加密後存在localStorage
        // 👎 存使用者明碼資訊在localStorage，在商用可能會被罰錢
        state.userInfo = json

        // 最簡單的加密：將物件轉為字串在使用AES編碼加密
        const ciphertext = AES.encrypt(JSON.stringify(json), decode).toString()
        localStorage.setItem('cmstoken', ciphertext)
      }else{
        state.userInfo = null
        localStorage.removeItem('cmstoken')
      }
    },
    updateUseInfo (state, json) {
      state.userInfo = json? json: null
    },
  },
  actions: {
    checkUseLogin ({commit}) {
      const ciphertext = localStorage.getItem('cmstoken')
      if(ciphertext){
        const bytes  = AES.decrypt(ciphertext, decode)
        const originalText = bytes.toString(ENC)
        commit('updateUseInfo', JSON.parse(originalText))
        return true
      }else{
        commit('updateUseInfo', null)
        return false
      }
    }
  },
  modules: {
  }
})
