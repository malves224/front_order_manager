<template>
  <div>
    <ReturnMenu />
    <div v-if="order" class="order-progress-container">
      <OrderHeader :order="order" />
      <van-steps class="steps-container" direction="vertical" :active="2">
        <van-step>
          <p>12:30 - Pedido recebido</p>
        </van-step>
        <van-step>
          <p>12:30 - Pedido em preparo</p>
        </van-step>
        <van-step>
          <p>12:35 - Saiu para entrega</p>
        </van-step>
      </van-steps>
      <div class="progress-address-container">
        <h2>Produtos</h2>
        <div v-for="item in order.products" :key="item.id" class="order-progress-item">
          <img width="80px" height="64px" :src="item.product.img_url" />
          <div class="order-progress-item-text">
            <strong>{{ item.quantity }}x {{ item.product.name }}</strong>
            <p>Breve descrição do produto</p>
            <p>{{ $formatCurrency(item.product.value * item.quantity) }}</p>
          </div>
        </div>
      </div>
      <div class="progress-address-container">
        <h2>Entrega</h2>
        <span> Endereço de entrega</span>
        <div class="progress-address-container-tip">
          <p>{{ order.address?.logradouro }}, {{ order.address?.number }}{{ order.address?.complement ? `,
            ${order.address?.complement}` : '' }}</p>
          <p>{{ order.address?.district }}, {{ order.address?.state }}</p>
        </div>
      </div>
      <div class="progress-address-container">
        <h2>Pagamento</h2>
        <span><b-icon class="me-2" :icon="iconPaymentMethod()"></b-icon>{{ paymentMethod }}</span>
        <div class="cart-resume-item">
          <p>Subtotal</p>
          <p> {{ $formatCents(order.total) }} </p>
        </div>
        <div v-if="order.delivery_fee" class="cart-resume-item">
          <p>Taxa de entrega</p>
          <p> {{ $formatCents(order.delivery_fee) }} </p>
        </div>
        <div class="cart-resume-item">
          <h4><strong>Total</strong></h4>
          <h4><strong>{{ $formatCents(order.total + order.delivery_fee) }}</strong></h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReturnMenu from '@/components/ReturnMenu.vue'
import OrderHeader from '@/components/OrderHeader.vue'

export default {
  components: {
    ReturnMenu,
    OrderHeader
  },
  computed: {
    paymentMethod() {
      console.log(this.order)
      switch (this.order.payment_method) {
        case 'card':
          return 'Cartão de credito/debito'
        case 'cash':
          return 'Dinheiro'
        case 'ticket':
          return 'Cartão VR/VA'
        default:
          return ''
      }
    }
  },
  data() {
    return {
      order: null
    }
  },
  async beforeMount() {
    await this.getOrder();
  },
  methods: {
    async getOrder() {
      const response = await this.$customerService.order(this.$route.params.id);
      this.order = response.data;
    },
    iconPaymentMethod() {
      switch (this.order.payment_method) {
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
  }
}
</script>
<style>
.steps-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 0 0;
}

.order-progress-container {
  padding: 10px;
}

.progress-address-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 10px;
}

.progress-address-container-tip {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.order-progress-item {
  display: flex;
  border-bottom: 1px solid var(--bs-gray-300);
}

.order-progress-item-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
</style>