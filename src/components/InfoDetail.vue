<template>
  <div class="card info-detail-container">
    <b-img class="img-tenant" :src="tenantStore.tenant.img"></b-img>
    <div class="title-tenant">
      <h1 style="margin: 0" class="card-title">{{ tenantStore.tenant.name }}</h1>
      <span style="color: gray">{{ tenantStore.tenant.description }}</span>
      <span v-if="tenantStore.tenant.config?.minimumOrder" style="color: gray">Pedido Min {{ $formatCents(tenantStore.tenant.config.minimumOrder) }}</span>
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
  max-height: 140px;
  padding: 8px 15px;
  width: 90%;
  border-radius: 30px;
  z-index: 999;
  position: relative;
  top: 135px;
}

.title-tenant {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-bottom: 10px;
  padding-bottom: 10px;
  position: relative;
  bottom: 25px;
}

.img-tenant {
  height: 50px;
  width: 70px;
  border-radius: 50%;
  border: 1px solid var(--bs-gray-200);
  align-self: center;
  position: relative;
  bottom: 35px
}

.info-items {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  bottom: 35px;
}

.info-item {
  background-color: var(--bs-gray-200);
  color: gray;
}
</style>