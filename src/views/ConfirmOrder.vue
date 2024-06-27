<template lang="">
    <div class="mt-3 confirm-container">
        <h4 :style='{"text-align": "left"}' >Endereço de entrega</h4>
        <div class="address-container" v-if="addressesSelected">
          <p class="h1 me-2 d-flex align-items-center"><b-icon icon="geo-alt"></b-icon></p>
          <div class="address-info">
            <h4>{{addressesSelected.logradouro}}{{addressesSelected.number && `, ${addressesSelected.number}`}}{{addressesSelected.complement && `, ${addressesSelected.complement} `}}</h4>
            <p>{{addressesSelected.district.length > 30 ? `${addressesSelected.district.slice(0, 30)}...` : addressesSelected.district }}</p>
          </div>
          <b-button @click="showListAddress = !showListAddress" class="mt-2 align-self-center button-none">Trocar</b-button>
        </div>
        <b-button @click="showFormAddress = !showFormAddress" class="mt-2 align-self-center button-none">Adicionar endereço</b-button>
        <van-action-sheet style="height: 80vh" v-model="showFormAddress" title="Adicionar um endereço">
          <AddressForm />
        </van-action-sheet>
    </div>
</template>
<script>
import AddressForm from "@/components/AddressForm.vue";
import Customer from '@/services/customerService';

export default {
  components: {
    AddressForm
  },
  data() {
    return {
      addressesSelected: null,
      addresses: [],
      showFormAddress: false,
      customerService: new Customer(),
    }
  },
  methods: {
    addressCreated(address) {
      this.addressesSelected = address;
      this.addresses.unshift(address);
      this.showFormAddress = false;
    },
  },
  async mounted() {
    const response = await this.customerService.addresses();
    const addressesSelected = await this.customerService.address();
    this.addresses = response.data;
    this.addressesSelected = addressesSelected.data
  },
}
</script>
<style>
.confirm-container {
  display: flex;
  flex-flow: column;
}

.address-container {
  display: flex;
  flex-flow: row;
}

.address-info {
  display: flex;
  flex-flow: column;
  align-items: start;
  width: 100%;
}

.address-container > button {
  align-items: end;
  display: flex;
}

.address-info > h4 {
  margin: 0;
}
</style>