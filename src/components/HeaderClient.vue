<template>
  <div class="container-info-detail">
    <!-- Bloco da imagem de fundo com overlay -->
    <div :style="`background-image: url(${tenantStore.tenant.img})`" class="header-image"></div>
    <!-- Componente InfoDetail permanece inalterado -->
    <info-detail v-if="tenantStore.tenant.subdomain"></info-detail>
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

<style scoped>
.container-info-detail {
  position: relative;
  height: 150px; /* Mantendo a altura do header */
  margin-bottom: 110px;
  /* 🔴 Removendo overflow: hidden para permitir que InfoDetail "vaze" */
}

/* A imagem de fundo ocupa toda a área do header */
.header-image {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
}

/* Overlay aplicado apenas na imagem */
.header-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
