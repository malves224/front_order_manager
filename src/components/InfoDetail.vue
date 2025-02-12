<template>
  <div class="info-detail-container">
    <!-- Bloco do logo que “sai” do card -->
    <div class="img-wrapper">
      <b-img class="img-tenant" :src="tenantStore.tenant.img"></b-img>
    </div>
    <!-- Bloco do conteúdo textual -->
    <div class="title-tenant">
      <h1 class="card-title">{{ tenantStore.tenant.name }}</h1>
      <span class="tenant-description">{{ tenantStore.tenant.description }}</span>
      <span v-if="tenantStore.tenant.config?.minimumOrder" class="tenant-minimum-order">
        Pedido Min {{ $formatCents(tenantStore.tenant.config.minimumOrder) }}
      </span>
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

<style scoped>
.info-detail-container {
  position: absolute;
  top: 130px; /* 🔴 Ajustado para descer mais */
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 15px;
  height: 110px;
  padding: 20px 20px 0 100px; /* Espaço à esquerda para o logo */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
}

/* Bloco do logo – posicionado para “sair” do card */
.img-wrapper {
  position: absolute;
  left: 20px;
  top: -30px; /* Parte do logo ficará fora do contêiner */
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 4; /* Garante que o logo fique acima do card */
}

.img-tenant {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Bloco de texto */
.title-tenant {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  line-height: 1.2;
}

.tenant-description,
.tenant-minimum-order {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  line-height: 1.2;
}
</style>
