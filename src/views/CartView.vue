<template>
  <div>
    <ReturnMenu></ReturnMenu>
    <div class="cart-view">
      <div class="info-client-container">
        <b-img src="https://assets.turbologo.com/blog/pt/2019/07/19133836/mcdonalds-golden-arches-logo-1961.jpg" />
        <div class="info-client-title">
          <h3 class="mb-0">Mc donalds</h3>
          <b-button to="/order" class="button-none">Adicionar mais itens</b-button>
        </div>
      </div>
      <router-view></router-view>
      <div class="position-nav-cart">
        <NavCart></NavCart>
      </div>
    </div>
  </div>
</template>
<script>
import NavCart from '@/components/cart/NavCart.vue'
import ReturnMenu from '@/components/ReturnMenu.vue'

export default {
  components: {
    NavCart,
    ReturnMenu
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

.cart-view {
  padding: 0 10px;
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