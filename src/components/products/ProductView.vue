<template>
  <b-card class="product-card" @click="openModal">
    <b-row no-gutters align-v="center">
      <!-- Coluna do Texto -->
      <b-col cols="8" class="product-text">
        <h5 class="product-name">{{ item.name }}</h5>
        <p class="product-description">Breve descrição do produto</p>
        <h2 class="product-price">{{ $formatCurrency(item.value) }}</h2>
      </b-col>
      
      <!-- Coluna da Imagem -->
      <b-col cols="4" class="text-center">
        <b-img class="product-image" :src="item.img_url" />
      </b-col>
    </b-row>

    <modal-product :item="item"></modal-product>
  </b-card>
</template>

<script>
import ModalProduct from "@/components/products/ModalProduct.vue";

export default {
  components: {
    ModalProduct
  },
  props: ["item"],
  methods: {
    openModal() {
      this.$bvModal.show(`product-modal-${this.item.id}`);
    }
  }
};
</script>

<style scoped>
/* Estilo do card do produto */
.product-card {
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-card:hover {
  transform: scale(1.02);
}

/* Ajustando o espaço do conteúdo */
.product-text {
  padding-left: 15px;
}

/* Nome do Produto */
.product-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
}

/* Descrição do Produto */
.product-description {
  font-size: 14px;
  color: #666;
  text-align: left;
  margin-bottom: 8px;
}

/* Preço do Produto */
.product-price {
  font-size: 22px;
  font-weight: bold;
  color: #d32f2f;
  text-align: left;
}

/* Imagem do Produto */
.product-image {
  width: 80px;  /* Aumentando o tamanho da imagem */
  height: 80px;
  object-fit: cover;  /* Garante que a imagem preencha bem sem distorção */
  border-radius: 8px;
}
</style>
