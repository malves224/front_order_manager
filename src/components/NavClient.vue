<template>
  <div class="position-nav">
    <NavCart />
    <van-tabbar v-model="active" active-color="#007bff" inactive-color="#666">
      <van-tabbar-item to="/order" replace icon="home-o">
        Início
      </van-tabbar-item>
      <van-tabbar-item to="/order/list" replace icon="orders-o">
        Pedidos
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import NavCart from '@/components/cart/NavCart.vue';

export default {
  components: {
    NavCart,
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
.position-nav {
  display: flex;
  flex-direction: column;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
