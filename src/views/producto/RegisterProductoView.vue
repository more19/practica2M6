<template>
    <div>
      <h1>Registrar Producto</h1>
      <form @submit.prevent="submitForm()">
        <div class="form-group">
          <label for="codigo">Codigo del producto:</label>
          <input type="text" id="name" v-model="form.codigo" :class="{ 'is-invalid': errors.codigo }"
            placeholder="Ingrese el codigo del producto" />
          <div v-if="errors.codigo" class="invalid-feedback">{{ errors.codigo }}</div>
        </div>

        <div class="form-group">
          <label for="categoria">Categoria:</label>
          <select id="categoria" v-model="form.categoriaId" :class="{ 'is-invalid': errors.categoriaId }">
            <option :value="categoria.id" v-for="(categoria, index) in categoriaList" :key="`categoria-${index}`">{{ categoria.nombre }}
            </option>
          </select>
          <div v-if="errors.categoriaId" class="invalid-feedback">{{ errors.categoriaId }}</div>
        </div>

        <div class="form-group">
          <label for="marca">Marca:</label>
          <input type="text" id="marca" v-model="form.marca" :class="{ 'is-invalid': errors.marca }"
            placeholder="Ingrese la marca del producto" />
        <div v-if="errors.marca" class="invalid-feedback">{{ errors.marca }}</div>
        </div>
        <div class="form-group">
          <label for="medida">Medidas:</label>
          <input type="medida" id="medidas" v-model="form.medidas"
            placeholder="Ingrese las medidas (opcional)" />
        </div>
  
        <div class="form-group">
          <label for="vehiculo">Vehiculo:</label>
          <input id="vehiculo" v-model="form.vehiculo" :class="{ 'is-invalid': errors.vehiculo }"
            placeholder="Ingrese el vehiculo"/>
          <div v-if="errors.vehiculo" class="invalid-feedback">{{ errors.vehiculo }}</div>
        </div>

        <div class="form-group">
          <label for="stock">Stock/Cantidad:</label>
          <input type="number" id="stock" v-model="form.stock" :class="{ 'is-invalid': errors.stock }"
            placeholder="Ingrese el stock"/>
          <div v-if="errors.stock" class="invalid-feedback">{{ errors.stock }}</div>
        </div>

        <div class="form-group">
          <label for="precio">Precio(Bs):</label>
          <input type="text" id="precio" v-model="form.precio" :class="{ 'is-invalid': errors.precio }"
            placeholder="Ingrese el precio"/>
          <div v-if="errors.precio" class="invalid-feedback">{{ errors.precio }}</div>
        </div>
  
        <div class="form-group">
          <label for="descripcion">Descripcion:</label>
          <textarea type="text" id="descripcion" v-model="form.descripcion"
            placeholder="Ingrese la descripcion (opcional)"></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </template>
    
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    name: 'RegisterProducto',
    data() {
      return {
        categoriaList: [],
        form: {
          codigo: '',
          categoriaId: null,
          marca: '',
          medidas: '',
          vehiculo: '',
          descripcion: '',
          stock: '',
          precio: ''
        },
        errors: {}
      };
    },
    methods: {
      ...mapActions(['increment']),
      validateForm() {
        this.errors = {};
        if (!this.form.codigo) {
          this.errors.codigo = 'El codigo es obligatorio.';
        }

        if (!this.form.categoriaId) {
          this.errors.categoriaId = 'La categoria es obligatorio.';
        }

        if (!this.form.marca) {
          this.errors.marca = 'Marca es obligatorio.';
        }

        if (!this.form.vehiculo) {
          this.errors.vehiculo = 'El vehiculo es obligatorio.';
        }
  
        if (!this.form.stock) {
          this.errors.stock = 'stock es obligatorio.';
        }

        if (!this.form.precio) {
          this.errors.precio = 'El precio es obligatorio.';
        } else {
          const precioPattern = /^\d+(\.\d{1,2})?$/;
          if (!precioPattern.test(this.form.precio)) {
            this.errors.precio = 'Por favor, ingrese un precio válido, con hasta dos decimales(opcional)';
          }
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
            categoriaId: null,
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
        console.log(this.form)
        this.axios.post(this.baseUrl + "/productos", this.form)
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
      },
      getCategoriaList(){
        const vm = this;
        this.axios.get(this.baseUrl + "/categorias")
          .then(function (response) {
            vm.categoriaList = response.data;
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
    mounted(){
      this.getCategoriaList();
    },
  }
  </script>
    
  <style scoped></style>
    