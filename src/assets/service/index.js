import axios from 'axios'

export default ({ requiresAuth = false } = {}) => {
    const options = {
        baseURL: process.env.NODE_ENV === 'development' ? '/api': 'https://tibamef2e.com/cgd103/g1/api'
    }
  
    // 決定是否要加上token
    if (requiresAuth) {
        options.headers.Authorization = 'JWT TOKEN'
    }

    // 建立axios 實體
    const instance = axios.create(options)
    
    // request interceptor攔截器
    instance.interceptors.request.use(config => {
        // 會在 request 送出前攔截到此次的 config，讓你可以做最後的處理。
        // Do something before request is sent
        return config
    }, error => {
        // 可以讓你在 request 發生錯誤時做一些額外的處理。
        // Do something with request error
        return Promise.reject(error)
    })

    // response interceptor攔截器
    instance.interceptors.response.use(response => {
        console.log(response)
        return response;
    }, error => {
        // Do something with request error
        if (error.response){
            switch (error.response.status) {
              case 403:
                console.log("沒有權限")
                // go to login page
                break
              case 500:
                console.log("程式發生問題")
                // go to error page
                break
              default:
                console.log(error.message)
            }
        } 
        if (!window.navigator.onLine) {
            alert("網路出了點問題，請重新連線後重整網頁")
            return
        }
        return Promise.reject(error)
    })

    return instance
}