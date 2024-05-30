
<template>
  <b-container class="h-100 mt-4">
    <b-form @submit.prevent="handleSubmit" class="d-flex flex-column">
      <b-form-group class="mb-4" label-for="cep">
        <b-form-input trim :disabled="loading" :formatter="(value) => value.replace(/[a-zA-Z]/g, '')" :state="cepBeValid"
          id="cep" @input="handleCep" v-model="form.cep" placeholder="Digite seu CEP..." @change="handleCep"
          required></b-form-input>
        <b-form-invalid-feedback id="cep">
          {{ cepResponseError }}
        </b-form-invalid-feedback>
      </b-form-group>
      <van-loading v-if="loading">Buscando CEP...</van-loading>
      <b-card v-if="form.logradouro" body-class="d-flex flex-row">
        <p class="h1 me-2 d-flex align-items-center"><b-icon icon="geo-alt"></b-icon></p>
        <div class="d-flex flex-column align-items-start">
          <h5 class="mb-0">{{ form.logradouro }}</h5>
          <p>{{ form.district }}</p>
          <p>{{ form.city }}/{{ form.state }}</p>
        </div>
      </b-card>

      <!-- <div class="logradouro-container">
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
      </b-form-group> -->

      <!-- <b-button type="submit" variant="primary">Enviar</b-button> -->
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
      cepBeValid: null,
      loading: false,
      cepResponseError: '',
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
      if (value.length >= 8) {
        this.searchCep();
      }
    },
    async searchCep() {
      try {
        this.cepBeValid = null;
        this.loading = true;
        const { data } = await this.brasilApi.getByCep(this.form.cep);
        this.form.state = data.state;
        this.form.city = data.city;
        this.form.district = data.neighborhood;
        this.form.logradouro = data.street;
        this.cepBeValid = true;
      } catch (error) {
        this.cepBeValid = false;
        if (error.response?.status === 404) {
          this.cepResponseError = 'CEP não encontrado.';
        } else {
          this.cepResponseError = error.response?.data.message;
        }
      } finally {
        this.loading = false;
      }

    },
    async handleSubmit() {
      try {
        const response = await this.customerService.createAddress(this.form);
        this.$emit('created', response.data)
      } catch (error) {
        console.log('erro ao criar endereço', error)
      }
    },
    formatterCep(value) {
      return value.trim().replace(/[a-zA-Z]/g, '')
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

