<template>
  <div>
    <header>
      <header-client></header-client>
    </header>

    <body>
      <info-detail></info-detail>
      <products-list></products-list>
    </body>
    <nav-client></nav-client>
  </div>
</template>
  
<script>
import InfoDetail from '@/components/InfoDetail.vue'
import HeaderClient from '@/components/HeaderClient.vue'
import ProductsList from '@/components/products/ProductList.vue'
import NavClient from '@/components/NavClient.vue'


export default {
  name: 'App',
  components: {
    HeaderClient,
    InfoDetail,
    ProductsList,
    NavClient
  }
}
</script>  
<style></style>
  