import { defineStore } from 'pinia';
import LocalStorage from '@/services/localStorage/localStorage';

const cartLocalStorage = new LocalStorage('cart');

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  getters: {
    total() {
      return this.cart.reduce((acc, item) => {
        return acc + item.total;
      }, 0);
    },
    count() {
      return this.cart.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
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
      this.updateCart();
    }
  }
});
