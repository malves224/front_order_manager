<template>
  <div id="app">
    <order-balcony></order-balcony>
  </div>
</template>

<script>
import OrderBalcony from './pages/OrderBalcony.vue'

export default {
  name: 'App',
  components: {
    OrderBalcony
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
