<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        md="6"
        lg="4"
        xl="3"
        class="mb-4"
      >
        <product :item="item"></product>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Product from "@/components/products/ProductView.vue";
import ProductService from "@/services/productService";

export default {
  components: {
    Product
  },

  mounted() {
    this.setProducts();
  },

  methods: {
    async setProducts() {
      try {
        const response = await this.productService.getAll();
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  },

  data() {
    return {
      productService: new ProductService(),
      items: []
    };
  }
};
</script>

<style scoped>
/* Melhor espaçamento entre os cards */
.b-row {
  margin-top: 20px;
}
</style>
