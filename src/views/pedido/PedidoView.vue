<template>
    <div>
        <Modal v-model:modelValue="showModalNuevo">
            <RegisterPedidoView @on-register="onRegister($event)" />
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <EditPedidoView @on-update="onUpdate($event)" :item="itemToEdit" />
        </Modal>
        <div style="text-align: center;">
            <h1>Lista de Pedidos</h1>
            <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
        </div>
        <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar por Producto</button>
        <input type="search" style="float:right" v-model="textToSearch" @search="buscar()">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Compra</th>
                    <th>Fecha de Pedido</th>
                    <th>Proveedor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.producto.descripcion }}</td>
                    <td>{{ item.cantidad }}</td>
                    <td>{{ item.precio_compra }}</td>
                    <td>{{ item.fecha_pedido }}</td>
                    <td>{{ item.proveedor.nombre }}</td>
                    <td>
                        <button @click="edit(item)" class="btn btn-info" style="margin-right: 15px;">Editar</button>
                        <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import RegisterPedidoView from './RegisterPedidoView.vue'
import EditPedidoView from './EditPedidoView.vue'

export default {
    name: 'Pedido',
    data() {
        return {
            message: 'Hola Mundo',
            currentPage: 1,
            totalPages: 100,
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            itemList: []
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        Modal,
        RegisterPedidoView,
        EditPedidoView
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        ...mapActions(['increment']),
        getList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/pedidos?_expand=producto&_expand=proveedor")
                .then(function (response) {
                    // console.log(response);
                    const pedidos = response.data;

                    // Obtener los datos relacionados de proveedor para cada pedido
                    const promises = pedidos.map(pedido => {
                        return vm.axios.get(vm.baseUrl + "/proveedores/" + pedido.proveedorId)
                            .then(proveedorResponse => {
                                pedido.proveedor = proveedorResponse.data;
                                return pedido;
                            });
                    });
                    // Esperar que todas las promesas se resuelvan
                    Promise.all(promises).then(pedidosConProveedores => {
                        vm.itemList = pedidosConProveedores;
                        console.log(vm.itemList);
                    });
                    // vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Esta Seguro de eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + "/pedidos/" + id)
                    .then(function (response) {
                        console.log(response);
                        vm.getList();
                        vm.$toast.show("Registro eliminado.", "danger");
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }

        },
        buscar() {
            
            const searchTerm = this.textToSearch.toLowerCase(); // Convert to lowercase for case-insensitive search
            console.log(this.textToSearch)
            if (searchTerm) {
                this.itemList = this.itemList.filter(item =>
                    item.producto.descripcion.toLowerCase().includes(searchTerm)
                );
            }else{
                this.getList();
            }
        },
        onRegister(event) {
            console.log("on register");
            this.getList();
            this.showModalNuevo = false;
            this.$toast.show('Registro exitoso', 'success');
        },
        onUpdate(event) {
            console.log("on update");
            this.getList();
            this.showModalEdit = false;
            this.itemToEdit = null;
            this.$toast.show('Edicion exitosa', 'info');
        },
        showToast(message, type) {
            console.log("showToast");
            this.$toast.show(message, type);
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
    props: {
        // propiedades que el componente puede recibir.
    },
    mounted() {
        this.getList();
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>