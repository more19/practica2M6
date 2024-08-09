<template>
  <div>
    <h1>Precio Actual de Bitcoin</h1>
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <p>Precio en USD: {{ btcPriceUSD }}</p>
    </div>
  </div>
</template>

<script>

export default {
    name: 'HomeView',
    data() {
        return {
            btcPriceUSD: 'hola',
            loading: true
        };
    },
    methods: {
        getBtcPrice(){
            const vm = this;
            this.axios.get('https://blockchain.info/ticker')
                .then(function (response) {
                    vm.loading = false;
                    vm.btcPriceUSD = response.data.USD.buy;
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    },
    mounted() {
        this.getBtcPrice();
    }
};
</script>

<style scoped>
/* Agrega tus estilos aquí */
</style>
    