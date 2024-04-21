<template>
  <div @click="openModal" class="product-info">
    <div>
      <div>
        <h5>{{ item.name }}</h5>
        <p style="color: var(--bs-gray-500)">breve descrição do produto</p>
      </div>
      <h2>R$ {{ item.value }}</h2>
    </div>
    <b-img height="80px" :src="item.img_url" />
    <modal-product :item="item"></modal-product>
    <login-modal :id="`customer-login-modal-${item.id}`"></login-modal>
  </div>
</template>
<script>
import ModalProduct from "@/components/products/ModalProduct.vue";
import LoginModal from "@/components/LoginModal.vue";

export default {
  components: {
    ModalProduct,
    LoginModal,
  },
  props: ['item'],
  methods: {
    openModal() {
      this.$bvModal.show(`product-modal-${this.item.id}`)
    },
  },
}
</script>
<style>
.product-info {
  display: flex;
  justify-content: space-evenly;
  padding: 0 10px;
}

.modal-product {
  height: 90vh;
}
</style>