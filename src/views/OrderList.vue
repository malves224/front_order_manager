<template>
  <div>
    <div class="order-list">
      <ReturnMenu></ReturnMenu>
      <div>
        <div class="bar-separator">
          <div v-for="order in orders" :key="order.id" class="order-item">
            <OrderHeader :order="order"></OrderHeader>
            <div class="order-item-body">
              <div v-for="item in order.orders_product" :key="item.id" class="order-item-body-item">
                <p class="me-2">{{ item.quantity }}x</p>
                <p>{{ item.product.name }}</p>
              </div>
            </div>
            <div class="order-item-price">
              <h4 class="mt-2 ta-c">Total: {{ $formatCents(order.total) }}</h4>
            </div>
            <b-button :to="`/order/detail/${order.id}`" class="w-100" variant="outline-primary">
              {{ order.status === 'finished' ? 'Detalhes do pedido' : 'Acompanhar pedido' }}
            </b-button>
          </div>
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
  data() {
    return {
      orders: [],
    }
  },
  methods: {
    variantStatus(status) {
      if (status === 'pending') {
        return 'warning'
      } else if (status === 'preparing') {
        return 'primary'
      } else if (status === 'finished') {
        return 'success'
      } else if (status === 'ongoing') {
        return 'info'
      } else if (status === 'canceled') {
        return 'outline-danger'
      }
      return 'info'
    },
    async getOrders() {
      const response = await this.$customerService.orders();
      this.orders = response.data;
    }
  },
  mounted() {
    this.getOrders()
  },
}
</script>
<style>
.order-list {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 140px;
}

.order-item {
  width: 100%;
  height: 230px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
}

.order-item-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.order-item-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.order-item-text>* {
  margin-bottom: 0px;
}

.order-item-body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
}

.order-item-body-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: 1px solid var(--bs-gray-300);
}

.order-item-price {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.bar-separator {
  width: 100%;
  border-bottom: 1px solid var(--bs-gray-300);
}
</style>