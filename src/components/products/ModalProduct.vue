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
        <b-form-spinbutton id="demo-sb" v-model="attrAditional.quantity" />
        <label>Observação</label>
        <b-textarea no-resize v-model="attrAditional.observation" />
        <b-button v-if="editing" type="submit" variant="primary">Salvar</b-button>
        <b-button v-else :disabled="this.attrAditional.quantity < 1" type="submit" variant="primary">Adicionar: {{ total
        }}</b-button>
        <b-button @click="closeModal" variant="outline-primary">Cancelar</b-button>
      </b-form>
    </body>
  </b-modal>
</template>
<script>
import { useCartStore } from '@/store/cart';
import { mapStores } from 'pinia';
import Swal from 'sweetalert2';
import LocalStorage from '@/services/localStorage/localStorage';

export default {
  props: ['item'],
  data() {
    return {
      customerStorage: new LocalStorage('customer'),
      attrAditional: {
        observation: this.item.observation || '',
        quantity: this.item.quantity || 0,
        total: this.item.total || 0
      },
      editing: this.item.quantity > 0
    }
  },
  methods: {
    closeModal() {
      this.clear();
      this.$bvModal.hide(`product-modal-${this.item.id}`)
    },
    openLogin() {
      this.$bvModal.show(`customer-login-modal-${this.item.id}`)
    },
    clear() {
      this.attrAditional = {
        observation: this.item.observation || '',
        quantity: this.item.quantity || 0,
        total: this.item.total || 0
      }
    },
    alertItemAdded() {
      Swal.fire({
        icon: "success",
        title: "Produto adicionado ao carrinho!",
        showDenyButton: true,
        confirmButtonText: "Continuar comprando",
        denyButtonText: `Ir para o carrinho`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.closeModal();
        } else if (result.isDenied) {
          this.$router.push('/cart')
        }
      });
    },
    async indicateUser() {
      const { value: formValues } = await Swal.fire({
        title: "Identifique-se",
        html: `
            <input id="swal-input1" class="swal2-input">
            <input id="swal-input2" class="swal2-input">
          `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
      });
      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
    },
    submit() {
      if (this.editing) {
        const payload = { ...this.item, ...this.attrAditional };
        this.cartStore.update(payload, this.item.id);
        this.$emit('update-item');
        this.closeModal();
      } else {
        if (this.customerStorage.get()?.token) {
          this.alertItemAdded();
          this.cartStore.add({ ...this.item, ...this.attrAditional });
        } else {
          this.openLogin();
        }
      }
    }
  },
  watch: {
    'attrAditional.quantity'() {
      this.attrAditional.total = this.attrAditional.quantity * this.item.value
    }
  },
  computed: {
    ...mapStores(useCartStore),
    total() {
      return this.$formatCurrency(this.attrAditional.quantity * this.item.value)
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