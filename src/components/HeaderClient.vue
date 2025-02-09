<template>
  <div :style="`background-image: url(${tenantStore.tenant.img})`" class="container-info-detail">
    <info-detail v-if="tenantStore.tenant.subdomain" info-detail></info-detail>
  </div>
</template>
<script>
import { useTenantStore } from '@/store/tenant';
import InfoDetail from './InfoDetail.vue';

export default {
  components: {
    InfoDetail,
  },
  data() {
    return {
      tenantStore: useTenantStore(),
    }
  }
}
</script>
<style>
.container-info-detail {
  height: 165px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 140px;
}

.container-info-detail::after {
    content: '';
    position: absolute;
    height: 165px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    pointer-events: none;
}

.img-hero {
  height: 190px;
  width: 100%;
}

.close_info {
  background-color: #2f3640;
  color: aliceblue;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>