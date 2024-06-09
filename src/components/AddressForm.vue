<template>
  <b-container class="h-100">
    <b-form @submit.prevent="handleSubmit" class="form-address-container d-flex flex-column">
      <b-form-group class="mb-2 mt-1" label-for="cep">
        <b-form-input autofocus trim :disabled="loading" :formatter="(value) => value.replace(/[a-zA-Z]/g, '')"
          :state="cepBeValid" id="cep" @input="handleCep" v-model="form.cep" placeholder="Digite seu CEP..."
          required></b-form-input>
        <b-form-invalid-feedback id="cep">
          {{ cepResponseError }}
        </b-form-invalid-feedback>
      </b-form-group>
      <van-loading v-if="loading">Buscando CEP...</van-loading>
      <b-card class="mb-1" v-if="form.logradouro" body-class="address-card d-flex flex-row">
        <p class="h1 me-2 d-flex align-items-center"><b-icon icon="geo-alt"></b-icon></p>
        <div class="d-flex flex-column align-items-start">
          <h5 class="mb-0">{{ form.logradouro }}</h5>
          <p>{{ form.district }}</p>
          <p>{{ form.city }}/{{ form.state }}</p>
        </div>
      </b-card>

      <div v-if="cepBeValid" class="form-address-complement">
        <div class="container-input">
          <b-form-group label-for="number">
            <b-form-input :disabled="numberOptional" id="number" v-model="form.number" placeholder="Número *"
              :required="!numberOptional"></b-form-input>
          </b-form-group>
          <b-form-checkbox id="number" class="align-self-start" @change="toggleOptional('number')">
            <label id="number" class="ms-2">Sem número</label>
          </b-form-checkbox>
        </div>

        <div class="container-input">
          <b-form-group label-for="complement">
            <b-form-input :disabled="complementOptional" id="complement" v-model="form.complement"
              placeholder="Complemento *" :required="!complementOptional"></b-form-input>
          </b-form-group>
          <b-checkbox class="align-self-start" @change="toggleOptional('complement')">
            <label class="ms-2">Sem complemento</label>
          </b-checkbox>
        </div>
        <b-form-group label-for="referencia">
          <b-form-textarea rows="3" id="referencia" v-model="form.reference"
            placeholder="Ponto de referência (opcional)"></b-form-textarea>
        </b-form-group>
      </div>
      <b-button :disabled="submitDisabled" type="submit" variant="primary" v-if="cepBeValid">Salvar endereço</b-button>
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
      showFullForm: false,
      numberOptional: false,
      complementOptional: false,
      form: {
        cep: '',
        logradouro: '',
        number: '',
        state: '',
        city: '',
        district: '',
        complement: '',
        reference: ''
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
    toggleOptional(kind) {
      this[`${kind}Optional`] = !this[`${kind}Optional`];
      this.form[kind] = '';
    },
  },
  computed: {
    submitDisabled() {
      return (
        (!this.numberOptional && !this.form.number.trim()) ||
        (!this.complementOptional && !this.form.complement.trim())
      );
    }
  }
};
</script>

<style>
.form-address-container {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.form-address-complement {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  height: 50%;
}

.logradouro-container {
  display: flex;
  flex-flow: row;
}

.city-container {
  display: flex;
  flex-flow: row;
}

.container-input {
  display: flex;
  flex-direction: column;
  height: 70px;
  justify-content: space-between;
}

.address-card {
  height: 90px;
}
</style>
