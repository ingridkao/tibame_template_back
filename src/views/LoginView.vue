<template>
	<input type="text" v-model="account"/>
	<input type="password" v-model="pswdddv"/>
	<button @click.prevent="emailSignin">登入</button>
</template>

<script>
import service from '@/assets/service/index'
export default {
  	name: 'login',
	data () {
		return {
			account:'',
			pswdddv:'',
		}
	},
	methods:{
    	emailSignin(){
            this.$store.commit('updateSiteLoad', true)
            const params = new URLSearchParams({
                emp_account: this.account,
                emp_psw: this.pswdddv
            })
            service({ 
                requiresAtuh: false
            }).post('getAdminLogin.php', params).catch(error=>{
                console.error(error)
            }).then(res=>{
                if(res && res.data){
                    if(res.data.code == 1){
                        this.$store.commit('setUseInfo', res.data.adminInfo)
                        this.$router.push('/')
                    }
                    alert(res.data.msg)
                }else{
                    console.error('異常')
                }
            }).finally(()=>{
                this.$store.commit('updateSiteLoad', false)
            })
    	}
  	}
}
</script>