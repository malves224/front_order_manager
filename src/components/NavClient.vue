<template>
  <div class="position-nav">
    <div class="cart-info" v-if="cartStore.total">
      <div class="cart-value">
        <p>Total sem a entrega</p>
        <div class="value-info">
          <h6>{{ $formatCurrency(cartStore.total) }}</h6>
          <p>/ {{ cartStore.count }} item{{ cartStore.total > 1 ? 's' : '' }}</p>
        </div>
      </div>
      <b-button class="ms-3" to="cart" variant="primary">Ver carrinho</b-button>
    </div>
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
import { useCartStore } from '@/store/cart';
import { mapStores } from 'pinia';
export default {
  data() {
    return {
      hasCart: true,
    }
  },
  mounted() {
    this.cartStore.initializeFromLocalStorage();
  },
  computed: {
    ...mapStores(useCartStore)
  }
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

.cart-info {
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  height: 50px;
  order: 1
}

.cart-info>a {
  flex-grow: 1;
}

.cart-value p {
  font-size: 12px;
  text-align: start;
}

.value-info {
  display: flex;
}

.value-info>h6 {
  margin: 0;
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