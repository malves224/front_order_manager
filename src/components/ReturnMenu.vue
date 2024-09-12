<template>
  <div class="action-cart">
    <div class="back-button-container h2">
      <b-button class="button-none" @click="back">
        <b-icon icon="caret-left-fill"></b-icon>
      </b-button>
      <h1>{{ mapContent[currentPath] }}</h1>
    </div>
    <div v-if="currentPath === '/cart'" class="h2">
      <b-button @click="doTrash" class="button-none">
        <b-icon icon="trash-fill"></b-icon>
      </b-button>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import { useCartStore } from '@/store/cart'
import { mapStores } from 'pinia'
export default {
  computed: {
    ...mapStores(useCartStore),
    currentPage() {
      return this.cartStore.currentPage
    }
  },
  data() {
    return {
      currentPath: '',
      mapContent: {
        '/cart': 'Carrinho',
        '/order/list': 'Pedidos',
        'order/detail': 'Detalhes do pedido',
      }
    }
  },
  mounted() {
    this.currentPath = this.$route.path;
    this.$router.afterEach((to) => {
      this.currentPath = to.path;
    });
  },
  methods: {
    back() {
      this.$router.back();
    },
    doTrash() {
      Swal.fire({
        title: "Limpar carrinho",
        text: "Você tem certeza que deseja limpar o carrinho? Todos os itens serão removidos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, limpar!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartStore.clear();
          this.$router.push("/order");
        }
      });

    }
  },
}
</script>
<style>
.action-cart {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.back-button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 65%;
}
</style>