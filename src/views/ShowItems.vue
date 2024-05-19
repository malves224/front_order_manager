<template lang="">
  <div class='mb-3'>
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
    </div>
</div>

</template>
<script>
import { useCartStore } from '@/store/cart';
import { mapStores } from 'pinia';
import ItemCard from '@/components/cart/ItemCart.vue'

export default {
  components: {
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

.resume-cart {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-top: 25px;
}

.cart-resume-item {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100%;
}
</style>