<template>
  <div>
    <router-view></router-view>
    <nav-client></nav-client>
  </div>
</template>
  
<script>
import NavClient from '@/components/NavClient.vue'


export default {
  components: {
    NavClient
  }
}
</script>  
<style></style>
  