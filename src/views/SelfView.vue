<template>
  <div class="about">
    <h1>This is an self page</h1>
    <button @click="get">Get Func</button>
    <button @click="post">Post Func</button>
    <h1>{{ count }}</h1>
  </div>
</template>
<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
export default {
    setup(){
        const count = ref(0);
        const increment = () => count.value++;

        const { proxy } = getCurrentInstance()
        console.log(proxy.envURL)

        function get() {
          proxy.axios({
            method: 'get',
            url: `${proxy.envURL}`
          }).then(res=>{
            console.log(res);
            // let { data } = res.data
            // console.log(data)
          }).catch((err) => {
            console.log(err)
          });
        }


        function post() {
          proxy.axios({
            method: 'post',
            url: `${proxy.envURL}/word`,
            data: {
              firstName: 'Finn',
              lastName: 'Williams'
            }
          }).then(res=>{
            console.log(res);
            // let { data } = res.data
            // console.log(data)
          }).catch((err) => {
            console.log(err)
          });
        }
        return {count, get, post}
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
