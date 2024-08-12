<template>
  <div>
    <h1>Registrar Usuario</h1>
    <form @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <div class="form-group">
        <label for="userName">Nombre de Usuario:</label>
        <input type="text" id="userName" v-model="form.userName" :class="{ 'is-invalid': errors.userName }"
          placeholder="Ingrese el Nombre de Usuario" />
        <div v-if="errors.userName" class="invalid-feedback">{{ errors.userName }}</div>
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="form.password" :class="{ 'is-invalid': errors.password }"
          placeholder="Ingrese la Contraseña" />
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <div class="form-group">
        <label for="estado">Estado:</label>
        <select id="estado" v-model="form.estado" :class="{ 'is-invalid': errors.estado }">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <div v-if="errors.estado" class="invalid-feedback">{{ errors.estado }}</div>
      </div>

      <div class="form-group">
        <label for="rol">Rol:</label>
        <select id="rol" v-model="form.rol" :class="{ 'is-invalid': errors.rol }">
          <option value="1">Admin</option>
          <option value="2">Stock</option>
          <option value="3">Almacenero</option>
        </select>
        <div v-if="errors.rol" class="invalid-feedback">{{ errors.rol }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'RegisterUsuario',
  data() {
    return {
      form: {
        nombre: '',
        userName: '',
        password: '',
        estado: 'activo', // Valor por defecto
        rol: '1'          // Valor por defecto
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

      if (!this.form.userName) {
        this.errors.userName = 'El Nombre de Usuario es obligatorio.';
      }

      if (!this.form.password) {
        this.errors.password = 'La Contraseña es obligatoria.';
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(this.form.password)) {
        this.errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
      }

      if (!this.form.estado) {
        this.errors.estado = 'Debe seleccionar un estado.';
      }

      if (!this.form.rol) {
        this.errors.rol = 'Debe seleccionar un rol.';
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
          userName: '',
          password: ''
        };
      }
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/usuarios", this.form)
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