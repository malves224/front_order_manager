<template>
  <b-modal class="modal-product" scrollable size="xl" :id="`product-modal-${item.id}`" hide-header hide-footer>
    <header :id="`product-modal-${item.id}`" class="header-product-modal modal-header">
      <b-icon-backspace style="width: 15px; height: 15px;" variant="secondary" @click="closeModal" />
      <h5 class="ms-5"> Detalhes do produto </h5>
    </header>

    <body class="body-modal">
      <b-img class="img-modal" :src="item.img_url" />
      <div class="info-product-modal">
        <h5>{{ item.name }}</h5>
        <p>breve descrição do produto</p>
        <h5>{{ $formatCurrency(item.value) }}</h5>
      </div>
      <b-form class="form-modal" @submit.prevent="submit">
        <label>Quantidade</label>
        <b-form-spinbutton id="demo-sb" v-model="quantity" />
        <label>Observação</label>
        <b-textarea no-resize v-model="observation" />
        <b-button :disabled="this.quantity < 1" type="submit" variant="primary">Adicionar: {{ total }}</b-button>
        <b-button @click="closeModal" variant="outline-primary">Cancelar</b-button>
      </b-form>
    </body>
  </b-modal>
</template>
<script>
export default {
  props: ['item'],
  data() {
    return {
      observation: '',
      quantity: 0,
    }
  },
  methods: {
    closeModal() {
      this.$bvModal.hide(`product-modal-${this.item.id}`)
    },
    submit() {
      // a bota no carrinho 
      console.log('botaaaaaaaaaaaa no carrinho', this.item)
    }
  },
  computed: {
    total() {
      return this.$formatCurrency(this.quantity * this.item.value)
    }
  }
}
</script>
<style>
.header-product-modal {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header-product-modal>p {
  margin: 0;
}

.img-modal {
  width: 100%;
  border-radius: 10px;
}

.body-modal {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px 0;
}

.info-product-modal {
  padding: 10px 0;
}

.form-modal {
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-around;
}
</style>