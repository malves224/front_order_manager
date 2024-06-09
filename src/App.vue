<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

p {
  color: var(--bs-gray-500);
  margin: 0 !important
}


* {
  margin: 0;
  padding: 0
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

.button-none {
  background: none !important;
  color: inherit !important;
  border: none !important;
  padding: 0 !important;
  font: inherit !important;
  cursor: pointer !important;
  outline: inherit !important;
}

.custom-control-input {
  width: 18px;
  height: 18px;
}
</style>
