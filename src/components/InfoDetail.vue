<template>
  <div>
    <h1>Mc donalds</h1>
    <span style="color: gray">Lanchonete fast food, peça e receba rapido.</span>
    <div class="info-items">
      <div class="info-item">pedido minimo</div>
      <div class="info-item">60 min</div>
      <div class="info-item">aberto até 23:59</div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
.info-items {
  display: flex;
  justify-content: space-evenly;
}

.info-item {
  background-color: var(--bs-gray-200);
  color: gray;
}
</style>