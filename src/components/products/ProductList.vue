<template>
  <div>
    <p>lista de produtos</p>
    <div v-for="(item, index) in ['salsicha', 'banana', 'arroize']" :key="index">
      <product :item="item"></product>
    </div>
  </div>
</template>
<script>
import Product from "@/components/products/ProductView.vue";
export default {
  components: {
    Product
  }
}
</script>
<style></style>