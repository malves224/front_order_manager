import LocalStorage from "./localStorage";

class Chart extends LocalStorage {
  constructor() {
    super('chart')
  }

  add(item) {
    const itemPrevious = this.get().find(({ id }) => id === item.id);
    if (itemPrevious) {
      const additional = {
        quantity: itemPrevious.quantity + item.quantity,
        total: itemPrevious.total + item.total,
        observation: item.observation ? `${itemPrevious.observation}\n ${item.observation}` : itemPrevious.observation,
      };

      return this.update(additional, item.id);
    }
    super.add(item)
  }

  total() {
    return this.get().reduce((acc, item) => {
      return acc + item.total;
    }, 0);
  }

  count() {
    return this.get().reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }
}

export default Chart;