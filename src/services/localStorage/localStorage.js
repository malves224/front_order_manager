class LocalStorage {
  constructor(key) {
    this.key = key
  }

  get() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : []
  }

  set(data) {
    return localStorage.setItem(this.key, JSON.stringify(data));
  }

  update(payload, id = null) {
    const item = this.get();
    if (Array.isArray(item)) {
      let indexItem = item.findIndex((item) => item.id === id);
      for (const [key, value] of Object.entries(payload)) {
        item[indexItem][key] = value;
      }
    } else if (typeof item === 'object') {
      for (const [key, value] of Object.entries(payload)) {
        item[key] = value;
      }
    }
    return this.set(item)
  }

  add(item) {
    const items = this.get();
    items.push(item)
    this.set(items)
  }
}

export default LocalStorage