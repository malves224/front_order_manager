<template>
  <div class="item-cart">
    <div @click="editItem" :style="{ 'background-image': `url(${item.img_url}` }" class="item-cart-img">
      <div class="icon-edit">
        <b-icon icon="pencil-fill"></b-icon>
      </div>
    </div>
    <div class="item-cart-info">
      <h4>{{ item.name }}</h4>
      <p>2 Hambuergues queijo moolho...</p>
    </div>
    <div>
      + 0 -
    </div>
    <modal-product :item="item"></modal-product>
  </div>
</template>
<script>
import ModalProduct from "@/components/products/ModalProduct.vue";

export default {
  components: {
    ModalProduct,
  },
  props: ['item'],
  methods: {
    editItem() {
      this.$bvModal.show(`product-modal-${this.item.id}`)
    },
  },
}
</script>
<style>
.icon-edit {
  background: var(--bs-gray-100);
  border-radius: 50%;
  margin: 0;
  width: 33%;
  height: 33%;
  box-shadow: 1px 1px 3px var(--bs-body-color);
  font-size: 14px;
}

.item-cart {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 10px;
}

.item-cart-img {
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  height: 55px;
  width: 75px;
  border-radius: 10px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.item-cart-info {
  display: flex;
  flex-direction: column;
  align-items: self-start;
  width: 70%;
}

.item-cart-info>h4 {
  margin: 0;
}
</style>