<template>
  <div class="position-nav">
    <NavCart />
    <div class="nav-client">
      <div class="nav-item">
        <router-link to="/order">Inicio</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/order/list">Pedidos</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import NavCart from '@/components/NavCart.vue'

export default {
  components: {
    NavCart
  },
}
</script>
<style>
.position-nav {
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 120px;
  position: fixed;
  display: flex;
  flex-flow: column-reverse;
}


.nav-client {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
}

.nav-item {
  height: 100%;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>