<template>
  <div class="card info-detail-container">
    <b-img class="img-tenant" :src="tenantStore.tenant.img"></b-img>
    <div class="title-tenant">
      <h1 style="margin: 0" class="card-title">{{ tenantStore.tenant.name }}</h1>
      <span style="color: gray">{{ tenantStore.tenant.description }}</span>
      <span style="color: gray">Min {{ $formatCents(tenantStore.tenant.config.minimumOrder) }}</span>
    </div>

    <div class="info-items">
      <strong> Taxa de entrega</strong>
      <span>{{ $formatCents(tenantStore.tenant.config.deliveryFee) }}</span>
    </div>
  </div>
</template>
<script>
import { useTenantStore } from '@/store/tenant';
export default {
  data() {
    return {
      tenantStore: useTenantStore(),
    }
  },
}
</script>
<style>
.info-detail-container {
  padding: 8px 15px;
  width: 80%;
  border-radius: 30px;
}

.title-tenant {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  border-bottom: 1px solid var(--bs-gray-200);
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.img-tenant {
  height: 70px;
  width: 80px;
  border-radius: 50%;
  border: 1px solid var(--bs-gray-200);
  align-self: center;
}

.info-items {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.info-item {
  background-color: var(--bs-gray-200);
  color: gray;
}
</style>