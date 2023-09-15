<template>
  <div class="store">
    <div class="cards">
      <div class="cardItem" v-for="item in productList" :key="item.prod_id">
        <h6>{{ item.prod_name }}</h6>
        <div class="cardImg">
          <img v-if="item.prod_img1" :src="`https://tibamef2e.com/cgd103/g1/images/shop/${item.prod_img1}`" :alt="item.prod_name">
          <div v-else></div>
        </div>
        <!-- <p>{{ item.prod_info }}</p> -->
      </div>
    </div>
    <div>
      <button @click="prev" :disabled="page === 1">👈</button>
      商品總數：{{ total }}
      <button @click="next" :disabled="page*limit > total ">👉</button>
    </div>
  </div>
</template>

<script>
import service from '@/assets/service/index'

export default {
  name: 'StoreView',
  data(){
    return {
      productList: [],
      page: 1,
      limit: 9,
      total: 0
    }
  },
  mounted(){
    this.fetchProduct()
  },
	methods:{
    fetchProduct(){
      this.productList = []
      this.$store.commit('updateSiteLoad', true)
      service({ 
        requiresAtuh: false
      }).get(`/getProducts.php?order=prod_name&limit=${this.limit}&page=${this.page}`).catch(error=>{
          console.error(error)
      }).then(res=>{
        if(res && res.data){
          this.total = res.data.prodCount
          this.productList = res.data.prods
        }else{
            console.error('異常')
        }
      }).finally(()=>{
          this.$store.commit('updateSiteLoad', false)
      })
    },
    next(){
      this.page += 1
      this.fetchProduct()
    },
    prev(){
      this.page -= 1
      this.fetchProduct()
    }
  }
}
</script>

<style lang="scss">
  .cards{
    display: inline-flex;
    flex-wrap: wrap;
    gap: 1%;
    .cardItem{
      flex-basis: 32%;
      .cardImg{
        box-sizing: border-box;
        position: relative;
        >*{
          overflow: hidden;
          border-radius: 1rem;
        }
        >div{
          position: absolute;
          top:0;
          left: 0;
          width: 100%;
          padding-top: 100%;
          background-color: #ddd;
          &::before{
            content: 'No images';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        img{
          width: 100%;
        }
      }
    }
  }
</style>
