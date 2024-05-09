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
      <div class="cart-items w-100">
        <ItemCard v-for="item in cartStore.cart" :key="item.id" :item="item" />
        <b-button to="/order" class="mt-2 align-self-center button-none">Adicionar mais itens</b-button>
      </div>
    </div>
    <div class="resume-cart">
      <h3>Resumo de valores</h3>
      <div class="cart-resume-item">
        <p>Subtotal</p>
        <p> {{ $formatCurrency(cartStore.total) }} </p>
      </div>
      <div class="cart-resume-item" >
        <p>Taxa de entrega</p>
        <p> R$ 7,00 </p>
      </div>
      <div class="cart-resume-item">
        <span>Total</span>
        <span> {{ $formatCurrency(cartStore.total + 7) }} </span>
      </div>
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
  margin: 25px 0;
}

.cart-items {
  display: flex;
  flex-flow: column;
  overflow-y: scroll;
  justify-content: space-between;
}

.cart-resume-item {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100%;
}

.resume-cart {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-top: 25px;
}

.cart-view {
  padding: 10px;
}

.position-nav-cart {
  bottom: -10px;
  left: 0;
  width: 100%;
  position: fixed;
  display: flex;
  flex-flow: column-reverse;
  padding: 5px;
}

</style>