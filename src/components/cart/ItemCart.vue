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
      <span>{{ $formatCurrency(item.total) }}</span>
    </div>
    <b-form-spinbutton min="0" class="item-spin h-100" v-model="quantity" @input="update">
      <template v-if="quantity === 1" #decrement>
        <b-icon icon="trash-fill" />
      </template>
    </b-form-spinbutton>
    <modal-product @update-item="handleUpdateItem" :item="item"></modal-product>
  </div>
</template>
<script>
import ModalProduct from "@/components/products/ModalProduct.vue";
import { useCartStore } from "@/store/cart";
import { mapStores } from "pinia";

export default {
  components: {
    ModalProduct,
  },
  props: ['item'],
  data() {
    return {
      quantity: this.item.quantity,
    }
  },
  methods: {
    editItem() {
      this.$bvModal.show(`product-modal-${this.item.id}`)
    },
    update(value) {
      if (value <= 0) {
        this.cartStore.delete(this.item.id);
      } else {
        this.cartStore.update({ ...this.item, quantity: value }, this.item.id);
      }
    },
    handleUpdateItem() {
      this.quantity = this.cartStore.getItem(this.item.id).quantity;
    }
  },
  watch: {
    quantity(value) {
      const payload = { quantity: value, total: this.item.value * value };
      this.cartStore.update(payload, this.item.id);
    }
  },
  computed: {
    ...mapStores(useCartStore),
  },
}
</script>
<style>
.icon-edit {
  background: var(--bs-gray-100);
  border-radius: 50%;
  margin: 0;
  width: 40%;
  height: 40%;
  box-shadow: 1px 1px 3px var(--bs-body-color);
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.b-form-spinbutton>button {
  padding: 0;
}

.spinbutton-div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.item-spin {
  width: 29%;
}

.item-spin>output{
  padding: 0;
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
  margin-left: 10px;
}

.item-cart-info>h4 {
  margin: 0;
}
</style>