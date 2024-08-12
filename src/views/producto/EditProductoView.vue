<template>
    <div>
      <h1>Editar Producto</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="codigo">Codigo:</label>
          <input type="text" id="name" v-model="form.codigo" :class="{ 'is-invalid': errors.codigo }"
            placeholder="Ingrese el codigo del producto" />
          <div v-if="errors.codigo" class="invalid-feedback">{{ errors.codigo }}</div>
        </div>

        <div class="form-group">
          <label for="marca">Marca:</label>
          <input type="text" id="marca" v-model="form.marca" :class="{ 'is-invalid': errors.marca }"
            placeholder="Ingrese la marca del producto" />
        <div v-if="errors.marca" class="invalid-feedback">{{ errors.marca }}</div>
        </div>
  <!--Falta Categoria-->
        <div class="form-group">
          <label for="medida">Medidas:</label>
          <input type="medida" id="medidas" v-model="form.medidas" :class="{ 'is-invalid': errors.medidas }"
            placeholder="Ingrese las medidas (opcional)" />
      <!--     <div v-if="errors.medidas" class="invalid-feedback">{{ errors.medidas }}</div> -->
        </div>
  
        <div class="form-group">
          <label for="vehiculo">Vehiculo:</label>
          <input id="vehiculo" v-model="form.vehiculo" :class="{ 'is-invalid': errors.vehiculo }"
            placeholder="Ingrese el vehiculo"/>
          <div v-if="errors.vehiculo" class="invalid-feedback">{{ errors.vehiculo }}</div>
        </div>

        <div class="form-group">
          <label for="stock">Stock/Cantidad:</label>
          <input id="stock" v-model="form.stock" :class="{ 'is-invalid': errors.stock }"
            placeholder="Ingrese el stock"/>
          <div v-if="errors.stock" class="invalid-feedback">{{ errors.stock }}</div>
        </div>

        <div class="form-group">
          <label for="precio">Precio:</label>
          <input id="precio" v-model="form.precio" :class="{ 'is-invalid': errors.precio }"
            placeholder="Ingrese el precio"/>
          <div v-if="errors.precio" class="invalid-feedback">{{ errors.precio }}</div>
        </div>
  
        <div class="form-group">
          <label for="descripcion">Descripcion:</label>
          <textarea type="text" id="descripcion" v-model="form.descripcion" :class="{ 'is-invalid': errors.descripcion }"
            placeholder="Ingrese la descripcion (opcional)"></textarea>
      <!--     <div v-if="errors.medidas" class="invalid-feedback">{{ errors.medidas }}</div> -->
        </div>
  
        <button type="submit" class="btn btn-primary">Guardar</button>
      </form>
    </div>
  </template>
    
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    name: 'EditProducto',
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
  
        if (!this.form.codigo) {
          this.errors.codigo = 'El codigo es obligatorio.';
        }
//falta categoria
        if (!this.form.marca) {
          this.errors.marca = 'Marca es obligatorio.';
        }
  
        if (!this.form.medidas) {
          this.errors.medidas = 'Las medidas es obligatoria.';
        }

        if (!this.form.vehiculo) {
          this.errors.vehiculo = 'El vehiculo es obligatorio.';
        }
  
        if (!this.form.descripcion) {
          this.errors.direccion = 'La dirección es obligatoria.';
        }
  
        if (!this.form.stock) {
          this.errors.stock = 'stock es obligatoria.';
        }

        if (!this.form.cantidad) {
          this.errors.cantidad = 'stock es obligatoria.';
        }
  
        return Object.keys(this.errors).length === 0;
      },
  
      submitForm() {
        if (this.validateForm()) {
          // Enviar los datos al servidor
          this.save();
          // Reiniciar el formulario
          this.form = {
            codigo: '',
            marca: '',
            medidas: '',
            vehiculo: '',
            descripcion: '',
            stock: '',
            precio: ''
          };
        }
      },
      save() {
        const vm = this;
        this.axios.patch(this.baseUrl + "/productos/" + this.item.id, this.form)
          .then(function (response) {
            if (response.status == '200') {
              vm.$emit('on-update', response.data);
            }
            console.log(response); vm.itemList = response.data;
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
      },
      form() {
        return Object.assign({}, this.item);
      }
    },
  }
  </script>
    
  <style scoped></style>
    