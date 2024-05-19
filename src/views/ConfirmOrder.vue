<template lang="">
    <div class="mt-3 confirm-container">
        <h4>Endereço de entrega</h4>
        <div class="address-list">
          <div v-for="address in addresses" :key="address.id">
            <p>{{address}}</p>
          </div>
        </div>
        <b-button @click="showFormAddress = !showFormAddress" class="mt-2 align-self-center button-none">Adicionar endereço</b-button>
        <van-action-sheet style="height: 80vh" v-model="showFormAddress" title="Title">
          <div class="content">
            <AddressForm />
          </div>
        </van-action-sheet>
    </div>
</template>
<script>
import AddressForm from "@/components/AddressForm.vue";

export default {
  components: {
    AddressForm
  },
  data() {
    return {
      addresses: [],
      showFormAddress: false
    }
  }
}
</script>
<style>
.confirm-container {
  display: flex;
  flex-flow: column;

}
</style>