<template>
  <div class="product-info">
    <div>
      <div>
        <p>{{ item.name }}</p>
        <p style="color: var(--bs-gray-500)">breve descrição do produto</p>
      </div>
      <h2>R$ {{ item.value }}</h2>
    </div>
    <b-img height="80px" :src="item.img_url" />
  </div>
</template>
<script>
export default {
  props: ['item']

}
</script>
<style>
.product-info {
  display: flex;
  justify-content: space-evenly;
  padding: 0 10px;
}
</style>