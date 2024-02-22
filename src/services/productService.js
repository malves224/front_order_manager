import Http from './http'

class ProductService extends Http {
  async getAll() {
    const response = await this.client('products')
    return response
  }
}

export default ProductService