import Http from './http'

class TenantService extends Http {
  async self() {
    const response = await this.client('current_tenant')
    return response
  }
}

export default TenantService