<template>
  <div class="action-cart">
    <div class="h2">
      <b-button class="button-none" to="/order">
        <b-icon icon="caret-left-fill"></b-icon>
      </b-button>
    </div>
    <h1>Carrinho</h1>
    <div class="h2">
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
    ...mapStores(useCartStore)
  },
  methods: {
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
</style>