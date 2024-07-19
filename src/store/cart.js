import { defineStore } from 'pinia';
import LocalStorage from '@/services/localStorage/localStorage';
import Customer from '@/services/customerService';
import Swal from 'sweetalert2';
import router from '@/router';

const cartLocalStorage = new LocalStorage('cart');

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    addressSelected: null,
    paymentMethod: null,
    returnShock: null,
    renderAddressRequired: false,
    renderPaymentRequired: false,
    renderReturnShock: false,
    customerService: new Customer()
  }),
  getters: {
    total() {
      return this.cart.reduce((acc, item) => {
        return acc + item.total;
      }, 0) * 100;
    },
    totalWithDeliveryFee() {
      if (this.deliveryFee) {
        return this.total + this.deliveryFee
      }
    },
    count() {
      return this.cart.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
    },
    deliveryFee() {
      if (this.addressSelected) {
        return 500
      }
    }
  },
  actions: {
    add(item) {
      const itemPrevious = this.cart.find(({ id }) => id === item.id);
      if (itemPrevious) {
        const additional = {
          quantity: itemPrevious.quantity + item.quantity,
          total: itemPrevious.total + item.total,
          observation: item.observation ? `${itemPrevious.observation}\n ${item.observation}` : itemPrevious.observation,
        };

        return this.update(additional, item.id);
      }
      this.cart.push(item)
      this.updateCart();
    },
    update(payload, id = null) {
      const item = this.cart;
      let indexItem = item.findIndex((item) => item.id === id);
      for (const [key, value] of Object.entries(payload)) {
        item[indexItem][key] = value;
      }
      this.updateCart();
    },
    delete(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.updateCart();
    },
    initializeFromLocalStorage() {
      if (this.cart.length) return
      const storedcart = cartLocalStorage.get();
      this.cart = storedcart;
    },
    updateCart() {
      cartLocalStorage.set(this.cart);
    },
    clear() {
      this.cart = [];
      this.paymentMethod = null;
      this.returnShock = null;
      this.updateCart();
    },
    getItem(id) {
      return this.cart.find((item) => item.id === id);
    },
    async doOrder() {
      if (!this.addressSelected) {
        this.renderAddressRequired = true;
        return
      }

      if (!this.paymentMethod) {
        this.renderPaymentRequired = true;
        return
      }

      const payload = {
        customer_id: new LocalStorage('customer').get().id,
        address_id: this.addressSelected.id,
        return_shock: this.paymentMethod == 'cash' ? this.returnShock : null,
        payment_method: this.paymentMethod,
        products: this.cart.map(({ id, quantity, observation }) => ({ product_id: id, quantity, observation }))
      }
      await this.customerService.doOrder(payload);
      this.clear();
      router.push("/");
      Swal.fire({
        title: "Pedido realizado!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Acompanhar meu pedido!",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/order/list");
        }
      });
    }
  }
});
