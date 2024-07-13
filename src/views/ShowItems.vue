<template lang="">
  <div class='mb-5'>
    <div class="cart-items-container">
      <h3>Itens adicionardos</h3>
      <div class="cart-items w-100">
        <ItemCard v-for="item in cartStore.cart" :key="item.id" :item="item" />
        <b-button to="/order" class="mt-2 align-self-center button-none">Adicionar mais itens</b-button>
      </div>
    </div>
    <ConfirmOrder />
    <div class="resume-cart">
      <h3>Resumo de valores</h3>
      <div class="cart-resume-item">
        <p>Subtotal</p>
        <p> {{ $formatCents(cartStore.total) }} </p>
      </div>
      <div v-if="cartStore.deliveryFee" class="cart-resume-item">
        <p>Taxa de entrega</p>
        <p> {{ $formatCents(cartStore.deliveryFee) }} </p>
      </div>
      <div v-if="cartStore.deliveryFee" class="cart-resume-item">
        <p>Total: </p>
        <p> {{ $formatCents(cartStore.totalWithDeliveryFee) }} </p>
      </div>

    </div>
</div>

</template>
<script>
import { useCartStore } from '@/store/cart';
import { mapStores } from 'pinia';
import ItemCard from '@/components/cart/ItemCart.vue';
import ConfirmOrder from '../components/ConfirmOrder.vue';

export default {
  components: {
    ItemCard,
    ConfirmOrder
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
  max-height: 40vh;
}

.resume-cart {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-top: 10px;
}

.cart-resume-item {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100%;
}
</style>