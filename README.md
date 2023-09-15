# tibame_template_back

[DEMO](https://tibamef2e.com/chd103/ingrid/cms/)

--- 

[參考cgd103第一組團專](https://tibamef2e.com/cgd103/g1/)

【後台登入資訊】
    - 帳號：Sara
    - 密碼：1234

[後台git](https://github.com/bear320/cgd103_g1/tree/dev)



## tempate功能
1. 管理者登入登出
3. 將管理者資訊存在vuex
4. 取得新增刪除商品列表

## 說明
1. API
    使用axios，寫法和fetch有點不同，可以仔細比較差異
    ```sh
        npm install axios
    ```
    [Creating HTTP Client Instance with Axios in Vue](https://codeburst.io/create-http-client-instance-with-axios-in-vue-da8c12c779c2)
    [好文](https://mini-ghost.dev/posts/axios-source-code-1/)


2. 加密解密
    這邊使用crypto-js來做使用者資訊存在localstorage時的加密解密
    ```sh
        npm install crypto-js
    ```

    官方範例
    ```
        import aes from 'crypto-js/aes';
        var CryptoJS = require("crypto-js");
        var data = [{id: 1}, {id: 2}]

        // Encrypt
        var ciphertext = aes.encrypt(JSON.stringify(data), 'secret key 123').toString();

        // Decrypt
        var bytes  = aes.decrypt(ciphertext, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log(decryptedData); // [{id: 1}, {id: 2}]
    ```


2. 跨域
    開發環境：於vue.config.js設定
    ```
        devServer: {
            proxy: {
                '/api': {
                    target: 'https://tibamef2e.com/cgd103/g1/api/',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        }
    ```
    部署環境：直接寫網址

3. API切換
    src/store/index.js
    ```
    const baseURL = process.env.NODE_ENV === 'development' ? '/api': 'https://tibamef2e.com/cgd103/g1/api'

    export default createStore({
        state: {
            baseURL: baseURL
        },
    })
    ```
