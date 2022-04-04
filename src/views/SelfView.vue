<template>
  <div class="about">
    <h1>This is an self page</h1>
    <button @click="increment">Self Test</button>
    <h1>{{ count }}</h1>
  </div>
</template>
<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
export default {
    setup(){
        const count = ref(0);
        const increment = () => count.value++;
        
        
        // const { appContext } = getCurrentInstance();
        // onMounted(() => {
        //   console.log('1')
        //   console.log(appContext.config.globalProperties.axios)
        //   console.log('2')
        // })


        const { proxy } = getCurrentInstance()
        console.log(proxy.axios)
        console.log(proxy)
        function getData() {
        proxy.axios({
          method: 'post',
          url: '/word',
          data: {
            firstName: 'Finn',
            lastName: 'Williams'
          }
        }).then(res=>{
          console.log(res);
          // let { data } = res.data
          // console.log(data)
        })
        }
        getData()
        return {count, increment} 
    }
} 
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
