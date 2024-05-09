<template >
  <div class="cart-view">
    <ActionCart></ActionCart>
    <div class="mt-2 info-client-container">
      <b-img src="https://assets.turbologo.com/blog/pt/2019/07/19133836/mcdonalds-golden-arches-logo-1961.jpg" />
      <div class="info-client-title">
        <h3 class="mb-0">Mc donalds</h3>
        <b-button to="/order" class="button-none">Adicionar mais itens</b-button>
      </div>
    </div>
    <div class="cart-items-container">
      <h3>Itens adicionardos</h3>
      <div class="w-100">
        <ItemCard v-for="item in cartStore.cart" :key="item.id" :item="item" />
      </div>
    </div>
    <div class="resume-cart">
      <h3>Resumo de valores</h3>
      <p>Subtotal {{ cartStore.total }}</p>
      <p>Taxa de entrega</p>
    </div>
    <div class="position-nav-cart">
      <NavCart></NavCart>
    </div>
  </div>
</template>
<script>
import NavCart from '@/components/cart/NavCart.vue'
import ActionCart from '@/components/cart/ActionCart.vue'
import ItemCard from '@/components/cart/ItemCart.vue'
import { useCartStore } from '@/store/cart';
import { mapStores } from 'pinia';

export default {
  components: {
    NavCart,
    ActionCart,
    ItemCard
  },
  computed: {
    ...mapStores(useCartStore)
  },
  watch: {
    'cartStore.cart': {
      handler(cart) {
        const beEmpty = !cart.length;

        if (beEmpty) {
          this.$router.push('/order')
        }
      },
      deep: true
    }
  }
}
</script>
<style>
.info-client-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 10px;
}

.info-client-container>img {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

.info-client-title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: self-start;
  width: 100%;
  margin-left: 10px;
}

.cart-items-container {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-top: 30px;
}

.cart-view {
  padding: 10px;
}

.position-nav-cart {
  width: 100%;
}
</style>