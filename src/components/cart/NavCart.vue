<template>
  <div class="cart-info" v-if="cartStore.total">
    <div class="cart-value">
      <p>{{ cartStore.addressSelected ? 'Total' : 'Total sem taxa entrega' }}</p>
      <div class="value-info">
        <h6>{{ $formatCents(total()) }}</h6>
        <p>/ {{ cartStore.count }} item{{ cartStore.count > 1 ? 's' : '' }}</p>
      </div>
    </div>
    <b-button v-if="currentPath === '/cart'" @click="cartStore.doOrder" class="button-nav-cart ms-3" variant="primary">Fazer pedido</b-button>
    <b-button v-else class="button-nav-cart ms-3" :to="'cart'" variant="primary">Ver carrinho</b-button>
    <b-alert :show="showRequiredAdress && !this.cartStore.addressSelected" variant="danger">Por favor insira seu endereço de entrega.</b-alert>
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
      currentPath: '',
      showRequiredAdress: false,
    }
  },
  methods: {
    total() {
      if (this.cartStore.addressSelected) {
        return this.cartStore.totalWithDeliveryFee
      }
      return this.cartStore.total
    },
  },
  mounted() {
    this.cartStore.initializeFromLocalStorage();
    this.currentPath = this.$route.path;
    this.$router.afterEach((to) => {
      this.currentPath = to.path;
    });
  },
  computed: {
    ...mapStores(useCartStore),
    contentButton() {
      return this.currentPath === '/cart' ? 'Fazer pedido' : 'Ver carrinho';
    },
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

.button-nav-cart {
  width: 60%;
  max-width: 60%;
}
</style>