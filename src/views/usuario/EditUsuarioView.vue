<template>
  <div>
    <h1>Editar Usuario</h1>
    <form @submit.prevent="submitForm">
      <!-- Campo Nombre -->
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="item.nombre" :class="{ 'is-invalid': errors.nombre }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <!-- Campo Nombre de Usuario -->
      <div class="form-group">
        <label for="userName">Nombre de Usuario:</label>
        <input type="text" id="userName" v-model="item.userName" :class="{ 'is-invalid': errors.userName }"
          placeholder="Ingrese el Nombre de Usuario" />
        <div v-if="errors.userName" class="invalid-feedback">{{ errors.userName }}</div>
      </div>

      <!-- Campo Contraseña -->
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="item.password" :class="{ 'is-invalid': errors.password }"
          placeholder="Ingrese la Contraseña">
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <!-- Campo Estado -->
      <div class="form-group">
        <label for="estado">Estado:</label>
        <select id="estado" v-model="item.estado" :class="{ 'is-invalid': errors.estado }">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <div v-if="errors.estado" class="invalid-feedback">{{ errors.estado }}</div>
      </div>

      <!-- Campo Rol -->
      <div class="form-group">
        <label for="rol">Rol:</label>
        <select id="rol" v-model="item.rol" :class="{ 'is-invalid': errors.rol }">
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
  name: 'EditUsuario',
  data() {
    return {
      errors: {}
    };
  },
  props: ['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.item.nombre) {
        this.errors.nombre = 'El nombre es obligatorio.';
      }

      if (!this.item.userName) {
        this.errors.userName = 'El nombre de Usuario es obligatorio.';
      }

      if (!this.item.password) {
        this.errors.password = 'La Contraseña es obligatoria.';
      } else if (this.item.password.length < 8) {
        this.errors.password = 'La contraseña debe tener al menos 8 caracteres.';
      } else if (!/[A-Z]/.test(this.item.password)) {
        this.errors.password = 'La contraseña debe tener al menos una letra mayúscula.';
      } else if (!/[a-z]/.test(this.item.password)) {
        this.errors.password = 'La contraseña debe tener al menos una letra minúscula.';
      } else if (!/\d/.test(this.item.password)) {
        this.errors.password = 'La contraseña debe tener al menos un número.';
      }

      if (!this.item.estado) {
        this.errors.estado = 'El estado es obligatorio.';
      }

      if (!this.item.rol) {
        this.errors.rol = 'El rol es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/usuarios/" + this.item.id, this.item)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    }
  },
}
</script>

<style scoped></style>
