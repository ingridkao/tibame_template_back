<template>
  <div v-if="siteLoad" class="loading">Loading...</div>
  <main>
    <nav>
      <template v-if="userInfo">
        <router-link to="/">首頁</router-link> |
        <router-link to="/store">商品</router-link> |
        <span>
          歡迎，{{ userInfo.emp_name }}
        </span>
      </template>
      <router-link v-else to="/login">登入</router-link> 
    </nav>
    <router-view/>
  </main>
</template>

<script>
export default {
  data(){
    return {}
  },
  computed:{
    siteLoad(){
      return this.$store.state.siteLoad
    },
    userInfo(){
      return this.$store.state.userInfo
    }
  },
	methods:{

  }
} 
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.loading{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
