<template >
  <div class="cart-view">
    <div class="action-cart">
      <a>voltar</a>
      <h1>carrinho</h1>
      <span>limpar</span>
    </div>
    <div class="info-client-container">
      <b-img src="https://assets.turbologo.com/blog/pt/2019/07/19133836/mcdonalds-golden-arches-logo-1961.jpg" />
      <div class="info-client-title">
        <h3>Mc donalds</h3>
        <a>Adicionar mais itens</a>
      </div>
    </div>
    <div class="cart-items-container">
      <h3>Itens adicionardos</h3>
      <div class="cart-item" v-for="item in cartStore.cart" :key="item.id">
        <b-img :src="item.img_url" />
        <div>
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
          <h5>{{ item.value }}</h5>
        </div>
        <span>Adicionar mais itens</span>
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
import NavCart from '@/components/NavCart.vue'
import { useCartStore } from '@/store/cart';
import { mapStores } from 'pinia';

export default {
  components: {
    NavCart
  },
  computed: {
    ...mapStores(useCartStore)
  }
}
</script>
<style>
.cart-view {}

.action-cart {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.info-client-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  flex-direction: row;
}

.info-client-container>img {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

.info-client-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.cart-view {
  padding: 10px;
}

.cart-item>img {
  height: 80px;
  width: 80px;
}

.position-nav-cart {
  width: 100%;
}
</style>