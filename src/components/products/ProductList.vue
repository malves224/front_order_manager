<template>
  <div class="w-100">
    <div v-for="(item, index) in items" :key="index">
      <product :item="item"></product>
    </div>
  </div>
</template>
<script>
import Product from "@/components/products/ProductView.vue";
import ProductService from "@/services/productService";
export default {
  components: {
    Product
  },

  mounted() {
    this.setProducts()
  },
  methods: {
    async setProducts() {
      try {
        const response = await this.productService.getAll()
        this.items = response.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  data() {
    return {
      productService: new ProductService(),
      items: [
      ]
    }
  },
}
</script>
<style></style>