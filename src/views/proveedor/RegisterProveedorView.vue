<template>
    <div>
      <h1>Registrar Proveedor</h1>
      <form @submit.prevent="submitForm()">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
            placeholder="Ingrese el nombre del proveedor" />
          <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="text" id="email" v-model="form.correo" :class="{ 'is-invalid': errors.correo }"
            placeholder="Ingrese el correo electronico (Opcional)" />
        <div v-if="errors.correo" class="invalid-feedback">{{ errors.correo }}</div>
        </div>
  
        <div class="form-group">
          <label for="phone">Celular:</label>
          <input type="tel" id="phone" v-model="form.celular" :class="{ 'is-invalid': errors.celular }"
            placeholder="Ingrese el teléfono/celular" />
          <div v-if="errors.celular" class="invalid-feedback">{{ errors.celular }}</div>
        </div>
  
        <div class="form-group">
          <label for="address">Dirección:</label>
          <textarea id="address" v-model="form.direccion" :class="{ 'is-invalid': errors.direccion }"
            placeholder="Ingrese la dirección"></textarea>
          <div v-if="errors.direccion" class="invalid-feedback">{{ errors.direccion }}</div>
        </div>
  
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </template>
    
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    name: 'RegisterProveedor',
    data() {
      return {
        form: {
          nombre: '',
          correo: '',
          celular: '',
          direccion: ''
        },
        errors: {}
      };
    },
    methods: {
      ...mapActions(['increment']),
      validateForm() {
        this.errors = {};
  
        if (!this.form.nombre) {
          this.errors.nombre = 'El nombre es obligatorio.';
        }

        if (this.form.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.correo)) {
          this.errors.correo = 'El correo electrónico no es válido.';
        }

        if (!this.form.celular) {
          this.errors.celular = 'El telefono/celular es obligatorio.';
        } else if (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.celular)) {
          this.errors.celular = 'El teléfono/celular no es válido.';
        }
  
        if (!this.form.direccion) {
          this.errors.direccion = 'La dirección es obligatoria.';
        }
  
        return Object.keys(this.errors).length === 0;
      },
  
      submitForm() {
        if (this.validateForm()) {
          // Enviar los datos al servidor
          this.save();
          // Reiniciar el formulario
          this.form = {
            nombre: '',
            correo: '',
            celular: '',
            direccion: ''
          };
        }
      },
      save() {
        const vm = this;
        this.axios.post(this.baseUrl + "/proveedores", this.form)
          .then(function (response) {
            if (response.status == '201') {
              vm.$emit('on-register', response.data);
            }
            console.log(response);
            vm.itemList = response.data;
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    computed: {
      // propiedades computadas que dependen de otras propiedades reactivas
      ...mapState(['count']),
      ...mapGetters(['doubleCount', 'getBaseUrl']),
      baseUrl() {
        return this.getBaseUrl
      }
    },
  }
  </script>
    
  <style scoped></style>
    