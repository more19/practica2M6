<template>
  <Menu>
    <router-link to="/" class="menu-item">Home</router-link> 
    <router-link to="/about" class="menu-item">About</router-link>
    <router-link to="/proveedor" class="menu-item">Proveedores</router-link>
  </Menu>
  <router-view/>
</template>

<script>

import Menu from './components/Menu.vue';

export default {
  name:'App',
  data(){
    return {

    }
  },
  components:{
    Menu

  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
/*
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
