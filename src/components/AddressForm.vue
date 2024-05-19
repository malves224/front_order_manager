
<template>
  <b-container class="mt-4">
    <b-form @submit.prevent="handleSubmit">
      <b-form-group label-for="cep">
        <b-form-input id="cep" v-model="form.cep" placeholder="CEP" @change="handleCep" required></b-form-input>
      </b-form-group>

      <div class="logradouro-container">
        <b-form-group label-for="logradouro">
          <b-form-input id="logradouro" v-model="form.logradouro" placeholder="Nome da rua" required></b-form-input>
        </b-form-group>

        <b-form-group label-for="number">
          <b-form-input id="number" v-model="form.number" placeholder="Número" required></b-form-input>
        </b-form-group>
      </div>

      <div class="city-container">
        <b-form-group label-for="state">
          <b-form-input id="state" v-model="form.state" placeholder="Estado" required></b-form-input>
        </b-form-group>
        <b-form-group label-for="city">
          <b-form-input id="city" v-model="form.city" placeholder="Digite a cidade" required></b-form-input>
        </b-form-group>
      </div>

      <b-form-group label-for="district">
        <b-form-input id="district" v-model="form.district" placeholder="Bairro" required></b-form-input>
      </b-form-group>

      <b-form-group label-for="complement">
        <b-form-textarea id="complement" v-model="form.complement" placeholder="Complemento"></b-form-textarea>
      </b-form-group>

      <b-form-group label-for="referencia">
        <b-form-textarea id="referencia" v-model="form.referencia" placeholder="Ponto de referência"></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Enviar</b-button>
    </b-form>
  </b-container>
</template>

<script>
import BrasilApi from '@/services/brasilApiService';
import Customer from '@/services/customerService';

export default {
  data() {
    return {
      brasilApi: new BrasilApi(),
      customerService: new Customer(),
      form: {
        cep: '',
        logradouro: '',
        number: '',
        state: '',
        city: '',
        district: '',
        complement: '',
        referencia: ''
      }
    };
  },
  methods: {
    handleCep(value) {
      if (value.length === 8) {
        this.searchCep();
      }
    },
    async searchCep() {
      const { data } = await this.brasilApi.getByCep(this.form.cep);
      this.form.state = data.state;
      this.form.city = data.city;
      this.form.district = data.neighborhood;
      this.form.logradouro = data.street;
    },
    async handleSubmit() {
      try {
        const response = await this.customerService.createAddress(this.form);
        this.$emit('created', response.data)
      } catch (error) {
        console.log('erro ao criar endereço', error)
      }
    }
  }
};
</script>

<style scoped>
.logradouro-container {
  display: flex;
  flex-flow: row;
}

.city-container {
  display: flex;
  flex-flow: row;
}
</style>

