<template>
  <div>
    <div> top menu</div>
    <div class="order-list">
      <div class="order-item">
        <div class="order-item-header">
          <div class="order-item-text">
            <h4>Pedido #1</h4>
            <p>Em 13/04/2020 às 10:00</p>
          </div>
          <b-button class="h-75" size="sm" :variant="variantStatus('pending')">Pendente</b-button>
        </div>
        <div class="order-item-body">
          <div class="order-item-body-item">
            <p class="me-2">{{ 1 }}x</p>
            <p>{{ 'salsicha' }}</p>
          </div>
          <div class="order-item-body-item">
            <p class="me-2">{{ 2 }}x</p>
            <p>{{ 'cerveja' }}</p>
          </div>

        </div>
        <div class="order-item-price">
          <h4 class="mt-2 ta-c">Total: R$ 12,00</h4>
        </div>
        <b-button variant="outline-primary">
          Detalhes do pedido
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {

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
    }
  }
}
</script>
<style>
.order-list {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.order-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--bs-gray-300);
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
  border: 1px solid var(--bs-gray-300);
}

.order-item-body-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
}

.order-item-price {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
</style>