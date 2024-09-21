<template>
  <div>
    <ReturnMenu />
    <div v-if="order" class="order-progress-container">
      <OrderHeader :order="order" />
      <van-steps class="steps-container" direction="vertical" :active="steps.length - 1">
        <van-step v-for="step in steps" :key="step.title">
          <p>{{ formatDate(step.date, 'HH:mm') }} - {{ step.title }}</p>
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
      order: null,
      steps: []
    }
  },
  async beforeMount() {
    await this.getOrder();
    this.$customerService.followOrder(this.$route.params.id, (data) => {
      data = JSON.parse(data);
      if (data.type === 'order_status_update') {
        this.order.status = data.status;
        this.order[data.status + '_at'] = data.at;
        this.steps.push({
          title: this.contentStatus(data.status),
          date: data.at
        })
      }
    });
  },
  methods: {
    contentStatus(status) {
      if (status === 'received') {
        return 'Pedido recebido'
      } else if (status === 'preparing') {
        return 'Pedido em preparo'
      } else if (status === 'finished') {
        return 'Entrega realizada'
      } else if (status === 'ongoing') {
        return 'Saiu para entrega'
      } else if (status === 'canceled') {
        return 'Cancelado'
      }
    },
    async getOrder() {
      const response = await this.$customerService.order(this.$route.params.id);

      this.order = response.data;
      if (this.order.received_at) {
        this.steps.push({
          title: this.contentStatus('received'),
          date: this.order.received_at
        })
      }
      if (this.order.preparing_at) {
        this.steps.push({
          title: this.contentStatus('preparing'),
          date: this.order.preparing_at
        })
      }
      if (this.order.ongoing_at) {
        this.steps.push({
          title: this.contentStatus('ongoing'),
          date: this.order.ongoing_at
        })
      }
      if (this.order.finished_at) {
        this.steps.push({
          title: this.contentStatus('finished'),
          date: this.order.delivered_at
        })
      }
      if (this.order.canecled_at) {
        this.steps.push({
          title: this.contentStatus('canceled'),
          date: this.order.canecled_at
        })
      }
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

.cart-resume-item {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100%;
}
</style>