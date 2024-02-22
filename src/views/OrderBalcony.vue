<template>
  <div>
    <header>
      <header-client></header-client>
    </header>

    <body>
      <info-detail></info-detail>
      <products-list></products-list>
    </body>
  </div>
</template>
  
<script>
import InfoDetail from '@/components/InfoDetail.vue'
import HeaderClient from '@/components/HeaderClient.vue'
import ProductsList from '@/components/products/ProductList.vue'


export default {
  name: 'App',
  components: {
    HeaderClient,
    InfoDetail,
    ProductsList,
  }
}
</script>  
<style>
body {
  padding-bottom: 30px !important;
}
</style>
  