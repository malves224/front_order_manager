<template>
  <div>
    <b-img class="img-hero"
      src="https://assets.turbologo.com/blog/pt/2019/07/19133836/mcdonalds-golden-arches-logo-1961.jpg" />
    <!-- apenas se o estabelecimento estiver fechado -->
    <div v-if="true" class="close_info">
      <span>Fechado abre amanhã as 14 horas.</span>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
.img-hero {
  height: 290px;
  max-width: 100%;
}

.close_info {
  background-color: #2f3640;
  color: aliceblue;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>