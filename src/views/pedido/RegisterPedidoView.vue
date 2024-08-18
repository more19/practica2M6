<template>
    <div>
        <h1>Registrar Pedido</h1>
        <form @submit.prevent="submitForm()">
            <div class="form-group">
                <label for="usuario">Seleccionar Usuario:</label>
                <select v-model="form.usuarioId" id="usuario">
                    <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                        {{ usuario.nombre }}
                    </option>
                </select>
                <div v-if="errors.usuarioId" class="invalid-feedback">{{ errors.usuarioId }}</div>
            </div>

            <div class="form-group">
                <label for="proveedor">Seleccionar Proveedor:</label>
                <select v-model="form.proveedorId" id="proveedor">
                    <option v-for="proveedor in proveedores" :key="proveedor.id" :value="proveedor.id">
                        {{ proveedor.nombre }}
                    </option>
                </select>
                <div v-if="errors.proveedorId" class="invalid-feedback">{{ errors.proveedorId }}</div>
            </div>

            <div class="form-group">
                <label for="producto">Seleccionar Producto:</label>
                <select v-model="form.productoId" id="producto">
                    <option v-for="producto in productos" :key="producto.id" :value="producto.id">
                        {{ producto.descripcion }}
                    </option>
                </select>
                <div v-if="errors.productoId" class="invalid-feedback">{{ errors.productoId }}</div>
            </div>

            <div class="form-group">
                <label for="cantidad">Cantidad de Items:</label>
                <input type="text" id="cantidad" v-model="form.cantidad" :class="{ 'is-invalid': errors.cantidad }"
                    placeholder="Ingrese la cantidad de Items" />
                <div v-if="errors.cantidad" class="invalid-feedback">{{ errors.cantidad }}</div>
            </div>

            <div class="form-group">
                <label for="precio_compra">Precio Total de Compra:</label>
                <input id="precio_compra" v-model="form.precio_compra" :class="{ 'is-invalid': errors.precio_compra }"
                    placeholder="Ingrese el precio de la Compra" />
                <div v-if="errors.precio_compra" class="invalid-feedback">{{ errors.precio_compra }}</div>
            </div>

            <div class="form-group">
                <label for="fecha_pedido">Fecha de realización de Pedido:</label>
                <input type="date" id="fecha_pedido" v-model="form.fecha_pedido"
                    :class="{ 'is-invalid': errors.fecha_pedido }" placeholder="Ingrese la fecha del Pedido" />
                <div v-if="errors.fecha_pedido" class="invalid-feedback">{{ errors.fecha_pedido }}</div>
            </div>

            <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'RegisterPedido',
    data() {
        return {
            form: {
                precio_compra: '',
                cantidad: '',
                fecha_pedido: '',
                proveedorId: '',
                productoId: '',
                usuarioId: ''
            },
            errors: {},
            usuarios: [],
            proveedores: [],
            productos: []
        };
    },
    methods: {
        ...mapActions(['increment']),

        getUsuarios() {
            this.axios.get(this.baseUrl + "/usuarios")
                .then(response => {
                    this.usuarios = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Error al obtener usuarios:", error);
                });
        },
        getProveedores() {
            this.axios.get(this.baseUrl + "/proveedores")
                .then(response => {
                    this.proveedores = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Error al obtener proveedores:", error);
                });
        },
        getProductos() {
            this.axios.get(this.baseUrl + "/productos")
                .then(response => {
                    this.productos = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Error al obtener productos:", error);
                });
        },



        validateForm() {
            this.errors = {};

            if (!this.form.precio_compra) {
                this.errors.precio_compra = 'El Precio de la Compra es obligatorio.';
            } else if (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.precio_compra)) {
                this.errors.precio_compra = 'El monto del Precio no es válido.';
            }

            if (!this.form.cantidad) {
                this.errors.cantidad = 'La Cantidad es obligatoria.';
            } else if (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.cantidad)) {
                this.errors.cantidad = 'La Cantidad no es válida.';
            } else if (!/^\d+$/.test(this.form.cantidad)) {
                this.errors.cantidad = 'La Cantidad debe ser un número entero.';
            }

            if (!this.form.fecha_pedido) {
                this.errors.fecha_pedido = 'La Fecha del Pedido es obligatoria.';
            }
            const today = new Date().setHours(0, 0, 0, 0); // Elimina la parte de tiempo para comparar solo la fecha
            const pedidoDate = new Date(this.form.fecha_pedido).setHours(0, 0, 0, 0);
            if (pedidoDate > today) {
                this.errors.fecha_pedido = 'La Fecha del Pedido no puede ser posterior al día de hoy.';
            }

            if (!this.form.proveedorId) {
                this.errors.proveedorId = 'El Proveedor es obligatorio.';
            }

            if (!this.form.productoId) {
                this.errors.productoId = 'El Producto es obligatorio.';
            }

            if (!this.form.usuarioId) {
                this.errors.usuarioId = 'El Usuario es obligatorio.';
            }

            return Object.keys(this.errors).length === 0;
        },

        submitForm() {
            if (this.validateForm()) {
                // Enviar los datos al servidor
                this.save();
                // Reiniciar el formulario
                this.form = {
                    precio_compra: '',
                    cantidad: '',
                    fecha_pedido: '',
                    proveedorId: '',
                    productoId: '',
                    usuarioId: '',
                };
            }
        },
        save() {
            const vm = this;
            this.axios.post(this.baseUrl + "/pedidos", this.form)
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
    mounted() {
        this.getUsuarios();
        this.getProveedores();
        this.getProductos();
    },
}
</script>

<style scoped></style>