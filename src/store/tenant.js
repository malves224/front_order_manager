import { defineStore } from 'pinia';
import TenantService from '@/services/tenantService';
const tenantService = new TenantService();

export const useTenantStore = defineStore('tenant', {
  state: () => ({
    tenant: {
      config: {}
    },
  }),
  actions: {
    async getTenant() {
      const tenant = await tenantService.self();
      this.tenant = tenant.data;
    },
  }
});