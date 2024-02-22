<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <product :item="item"></product>
    </div>
  </div>
</template>
<script>
import Product from "@/components/products/ProductView.vue";
export default {
  components: {
    Product
  },
  data() {
    return {
      items: [
        {
          name: 'Big mac',
          value: 19.90,
          img_url: 'https://s7d1.scene7.com/is/image/mcdonalds/Header_BigMac_832x472:1-3-product-tile-desktop?wid=763&hei=472&dpr=off'
        },
        {
          name: 'Grand cheddar',
          value: 25.90,
          img_url: 'https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kzXWKJ6A/200/200/original?country=br'
        },
        {
          name: 'Mc picanha',
          value: 35.90,
          img_url: 'https://conteudo.imguol.com.br/c/noticias/94/2018/11/06/mc-donalds-lanca-mcpicanha-1541534187061_v2_4x3.jpg'
        },
        {
          name: 'Big tasty',
          value: 35.90,
          img_url: 'https://classic.exame.com/wp-content/uploads/2020/03/mctasty.png?w=521'
        },
        {
          name: 'Big mac',
          value: 19.90,
          img_url: 'https://s7d1.scene7.com/is/image/mcdonalds/Header_BigMac_832x472:1-3-product-tile-desktop?wid=763&hei=472&dpr=off'
        },
        {
          name: 'Grand cheddar',
          value: 25.90,
          img_url: 'https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kzXWKJ6A/200/200/original?country=br'
        },
        {
          name: 'Mc picanha',
          value: 35.90,
          img_url: 'https://conteudo.imguol.com.br/c/noticias/94/2018/11/06/mc-donalds-lanca-mcpicanha-1541534187061_v2_4x3.jpg'
        },
        {
          name: 'Big tasty',
          value: 35.90,
          img_url: 'https://classic.exame.com/wp-content/uploads/2020/03/mctasty.png?w=521'
        }

      ]
    }
  },
}
</script>
<style></style>