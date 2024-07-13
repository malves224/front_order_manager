<template lang="">
    <div class="mt-3 confirm-container">
        <h4 class="title-confirm" >Endereço de entrega</h4>
        <div class="address-container" v-if="cartStore.addressSelected">
          <p class="h1 me-2 d-flex align-items-center"><b-icon icon="geo-alt"></b-icon></p>
          <div class="address-info">
            <h4>{{cartStore.addressSelected.logradouro}}{{cartStore.addressSelected.number && `, ${cartStore.addressSelected.number}`}}{{cartStore.addressSelected.complement && `, ${cartStore.addressSelected.complement} `}}</h4>
            <p>{{cartStore.addressSelected.district.length > 30 ? `${cartStore.addressSelected.district.slice(0, 30)}...` : cartStore.addressSelected.district }}</p>
          </div>
          <b-button @click="showFormAddress = !showFormAddress" class="mt-2 align-self-center button-none">Trocar</b-button>
        </div>
        <b-button v-if="!cartStore.addressSelected" @click="showFormAddress = !showFormAddress" class="mt-2 align-self-center button-none">Adicionar endereço</b-button>
        <h4 class="title-confirm" >Pagamento</h4>
        <b-button @click="showPaymentMethod = !showPaymentMethod" variant="outline-primary" class="mb-2 d-flex justify-content-between w-100 align-self-center">
          <b-icon :icon="iconPaymentMethod()"></b-icon>
          {{contentPaymentMethod()}}
        </b-button>
        <van-action-sheet style="height: 80vh" v-model="showFormAddress" title="Adicionar um endereço">
          <b-alert
            :show="countAlert"
            variant="danger"
          >
            Por favor insira seu endereço.
        </b-alert>
          <AddressForm @created="addressCreated" />
        </van-action-sheet>
        <van-action-sheet @select="paymentSelect" :actions="optionsMethodPayment" v-model="showPaymentMethod" title="Forma de pagamento">
          <b-alert
          :show="countAlert"
          variant="danger"
        >
          Por favor selecione forma de pagamento.
        </b-alert>
        </van-action-sheet>
        <van-action-sheet style="height: 27vh" title="Precisa de troco?" v-model="cartStore.renderReturnShock">
          <div class="return-shock-container">
            <div v-if="isZeroError" class="text-danger">Troco não pode ser zero</div>
              <b-input-group>
                <b-form-input 
                  :disabled="!returnShock" 
                  id="returnShock" 
                  v-model="cartStore.returnShock" 
                  :required="!returnShock.optional"
                  v-money="money"
                  ></b-form-input>
                <b-input-group-append>
                  <b-button 
                    class="ms-3"
                    :disabled="!money" 
                    variant="primary"
                    @click="doOrderWithSock()"
                  >Fazer pedido</b-button>
                </b-input-group-append>
              </b-input-group>
            <b-button @click="doOrderWithoutSock" variant="primary" >
              Não preciso de troco
            </b-button>
          </div>
  
        </van-action-sheet>
    </div>
</template>
<script>
import AddressForm from "@/components/AddressForm.vue";
import moneyMixin from '@/mixins/moneyMixin';
import Customer from '@/services/customerService';
import { useCartStore } from '@/store/cart'
import { mapStores } from 'pinia';

export default {
  mixins: [moneyMixin],
  components: {
    AddressForm
  },
  async mounted() {
    const addressesSelected = await this.customerService.address();
    this.cartStore.addressSelected = addressesSelected.data;
  },
  data() {
    return {
      optionsMethodPayment: [
        { name: 'Cartão', key: 'card' },
        { name: 'Dinheiro', key: 'cash' },
        { name: 'VR/VA', key: 'ticket' }
      ],
      returnShock: {
        optional: false,
      },
      showFormAddress: false,
      showPaymentMethod: false,
      customerService: new Customer(),
      countAlert: 0,
      isZeroError: false
    }
  },
  methods: {
    addressCreated(address) {
      this.cartStore.addressSelected = address;
      this.showFormAddress = false;
    },
    validateZero() {
      const value = this.cartStore.returnShock.replace(/[^0-9,.-]+/g, '').replace(',', '.');
      const numericValue = parseFloat(value);
      if (numericValue === 0 || isNaN(numericValue)) {
        return this.isZeroError = true;

      } else {
        return this.isZeroError = false;
      }
    },
    paymentSelect(item) {
      this.cartStore.paymentMethod = item.key;
      this.showPaymentMethod = false;
      if (this.cartStore.paymentMethod == 'cash') {
        this.cartStore.renderReturnShock = true
      }
    },
    iconPaymentMethod() {
      switch (this.cartStore.paymentMethod) {
        case 'card':
          return 'credit-card-fill';
        case 'cash':
          return 'cash';
        case 'ticket':
          return 'credit-card-fill';
        default:
          return 'currency-dollar'
      }
    },
    doOrderWithoutSock() {
      this.cartStore.returnShock = 0;
      this.showPaymentMethod = false;
      this.cartStore.doOrder();
    },
    doOrderWithSock() {
      if (this.validateZero()) return
      this.showPaymentMethod = false;
      this.cartStore.doOrder();
    },
    contentPaymentMethod() {
      switch (this.cartStore.paymentMethod) {
        case 'card':
          return 'Maquininha de cartão'
        case 'cash':
          return 'Dinheiro'
        case 'ticket':
          return 'Maquininha de cartão VR/VA'
        default:
          return 'Selecionar forma de pagamento'
      }
    },
  },
  computed: {
    ...mapStores(useCartStore)
  },
  watch: {
    'returnShock.optional'(value) {
      if (value) {
        this.cartStore.returnShock = null;
      }
    },
    showFormAddress(value) {
      if (!value) {
        this.cartStore.renderAddressRequired = value;
      }
    },
    showPaymentMethod(value) {
      if (!value) {
        this.cartStore.renderPaymentRequired = value;
      }
    },
    'cartStore.renderAddressRequired'(value) {
      if (value) {
        this.showFormAddress = value;
        this.countAlert = 5;
      }
    },
    'cartStore.renderPaymentRequired'(value) {
      if (value) {
        this.showPaymentMethod = value;
        this.countAlert = 5;
      }
    },
    countAlert(value, current) {
      if (value > current) {
        setTimeout(() => {
          this.countAlert -= 1
        }, 1000)
      }
    }
  }
}
</script>
<style>
.confirm-container {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

.address-container {
  display: flex;
  flex-flow: row;
  margin-bottom: 10px
}

.address-info {
  display: flex;
  flex-flow: column;
  align-items: start;
  width: 100%;
}

.address-container>button {
  align-items: end;
  display: flex;
}

.address-info>h4 {
  margin: 0;
}

.title-confirm {
  text-align: left;
}

.return-shock-container {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  height: 100%;
  padding: 10px;
}

.form-return-shock {
  display: flex;
  width: 100%;
  flex-flow: row;
  align-items: baseline;
  justify-content: space-between;
}
</style>