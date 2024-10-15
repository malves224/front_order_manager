<template>
  <div :class="`background-image: url(${tenantStore.tenant.img})`">
    <info-detail></info-detail>
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