<template>
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
</template>
<script>
import { useCartStore } from '@/store/cart';
import { mapStores } from 'pinia';
export default {
  name: 'NavCart',
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
</style>