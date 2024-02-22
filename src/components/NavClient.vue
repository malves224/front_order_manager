<template>
  <div class="nav-client">
    <nav>

    </nav>
    <div class="nav-item">
      <router-link to="/order">Inicio</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/order/list">Pedidos</router-link>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
.nav-client {
  background-color: rgb(255, 255, 255);
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  position: fixed;
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