<template>
  <div class="order-item-header">
    <div class="order-item-text">
      <strong class="h2" >Pedido #1</strong>
      <p>Em {{ formatDate(order.created_at, 'dd/MM/yyyy') }} às {{ formatDate(order.created_at, 'HH:mm') }}</p>
    </div>
    <b-button class="h-75" size="sm" :variant="variantStatus('pending')">Pendente</b-button>
  </div>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
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
  }
}
</script>
<style>
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
</style>