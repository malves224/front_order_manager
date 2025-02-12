<template>
  <b-modal :style="{ 'z-index': '1501' }" :id="`customer-login-modal-${id}`" size="lg" ok-only hide-header hide-footer novalidate>
    <b-form @submit.prevent="submit">
      <h2>Por favor, identifique-se para continuar</h2>
      <b-form-group id="name" label="Nome completo: ">
        <b-input id="name" v-model="name" placeholder="Ex: João Pedro"></b-input>
        <b-form-invalid-feedback :state="nameState">
          Preencha o seu nome completo corretamente.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="phone" label="Celular: ">
        <b-input id="phone" v-model="phone" type="text" placeholder="(XX) XXXXX-XXXX" maxlength="15" @input="formatPhone"></b-input>
        <b-form-invalid-feedback :state="phoneState">
          Número inválido, por favor verifique o número informado.
        </b-form-invalid-feedback>
      </b-form-group>
      <div class="button-container">
        <b-button type="submit" variant="primary">Entrar</b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import CustomerService from '@/services/customerService';
import LocalStorage from '@/services/localStorage/localStorage';

export default {
  props: ['id'],
  data: () => ({
    customerService: new CustomerService(),
    customerStorage: new LocalStorage('customer'),
    name: '',
    phone: '',
    nameState: null,
    phoneState: null
  }),
  methods: {
    validate() {
      if (this.name.trim().split(" ").length < 2) {
        this.nameState = false;
      } else {
        this.nameState = true;
      }
      if (!/\(\d{2}\) \d{9}/.test(this.phone)) {
        this.phoneState = false;
      } else {
        this.phoneState = true;
      }

      return !(this.phoneState && this.nameState)
    },
    async submit() {
      if (this.validate()) return;

      const response = await this.customerService.login({ name: this.name, phone: this.phone });
      this.customerStorage.set(response.data);
      this.$bvModal.hide(`customer-login-modal-${this.id}`);
    },
    formatPhone() {
      let formattedNumber = this.phone.replace(/\D/g, '');
      formattedNumber = `(${formattedNumber.slice(0, 2)}) ${formattedNumber.slice(2, 7)}${formattedNumber.slice(7, 11)}`;
      this.phone = formattedNumber;
    },
  }
}
</script>

<style>
/* Modal */
.b-modal {
  border-radius: 8px; /* Deixa as bordas do modal mais suaves */
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.b-form-group {
  margin-bottom: 25px; /* Aumentado o espaçamento entre os campos */
}

.b-input {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 12px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s ease-in-out;
}

.b-input:focus {
  border-color: #007bff; /* Cor do foco para combinar com o botão */
  outline: none;
}

.b-form-invalid-feedback {
  color: #f44336;
  font-size: 14px;
}

h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 30px; /* Ajustado para maior espaçamento */
  text-align: center; /* Centraliza o título */
}

.b-button {
  width: 100%;
  padding: 15px;
  font-size: 18px;
  border-radius: 5px;
  background-color: #007bff;
  border: none;
  color: #fff;
  transition: background-color 0.3s ease;
}

.b-button:hover {
  background-color: #0056b3; /* Efeito hover mais suave */
}

.b-button:focus {
  outline: none;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px; /* Aumentado o espaçamento acima do botão */
}

.b-modal-lg {
  max-width: 500px; /* Limita a largura do modal para uma visualização mais agradável */
}

/* Responsividade */
@media (max-width: 600px) {
  .b-modal-lg {
    max-width: 90%;
  }
}
</style>
