<template>
  <div>
    <header>
      <header-client></header-client>
    </header>

    <body class="d-flex flex-column align-items-center">
      <!-- <info-detail></info-detail> -->
      <products-list></products-list>
    </body>
  </div>
</template>
  
<script>
import HeaderClient from '@/components/HeaderClient.vue'
import ProductsList from '@/components/products/ProductList.vue'
import { useTenantStore } from '@/store/tenant';

export default {
  name: 'App',
  components: {
    HeaderClient,
    ProductsList
  },
  data() {
    return {
      tenantStore: useTenantStore(),
    }
  },
  beforeMount() {
    this.tenantStore.getTenant();
  },
}
</script>  
<style>
body {
  padding-bottom: 50px !important;
}
</style>
  