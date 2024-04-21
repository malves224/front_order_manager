<template>
  <b-modal :style="{ 'z-index': '1501' }" :id="id" size="lg" ok-only hide-header hide-footer novalidate>
    <b-form @submit.prevent="submit">
      <h2>Indetifique-se</h2>
      <b-form-group id="name" label="Nome completo: ">
        <b-input id="name" v-model="name" placeholder="Ex: João Pedro"></b-input>
        <b-form-invalid-feedback :state="nameState">
          Preencha o seu nome completo.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="phone" label="Celular: ">
        <b-input id="phone" v-model="phone" type="text" placeholder="(XX) XXXXX-XXXX" maxlength="15"
          @input="formatPhone"></b-input>
        <b-form-invalid-feedback :state="phoneState">
          Invalido, Por favor verifique o numero.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary">Entrar</b-button>
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
      this.$bvModal.hide(this.id);
    },
    formatPhone() {
      let formattedNumber = this.phone.replace(/\D/g, '');
      formattedNumber = `(${formattedNumber.slice(0, 2)}) ${formattedNumber.slice(2, 7)}${formattedNumber.slice(7, 11)}`;
      this.phone = formattedNumber;
    },
  }
}
</script>
<style lang="">
    
</style>