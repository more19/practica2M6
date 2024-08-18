<template>
    <div>
        <Modal v-model:modelValue="showModalNuevo">
            <RegisterProductoView @on-register="onRegister($event)" />
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <EditProductoView @on-update="onUpdate($event)" :item="itemToEdit" />
        </Modal>
        <div style="text-align: center;">

            <h1>Lista de Productos</h1>
            <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>

            <!--  
            
            <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
            <input type="search" style="float:right" v-model="textToSearch" @search="buscar()">

            <div style="margin: 20px 0;">
                <h3>Filtro por Categoria</h3>
                <select id="categoria" v-model="filter.categoriaId">
                    <option :value="categoria.id" v-for="(categoria, index) in categoriaList"
                        :key="`categoria-${index}`">{{
                            categoria.nombre }}
                    </option>
                </select>
                <button @click="filtrar()" class="btn btn-lith" style="float:right">Filtrar</button>

            </div>
-->

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                <button @click="buscar()" class="btn btn-lith">Buscar</button>
                <input type="search" v-model="textToSearch" @search="buscar()" placeholder="Buscar..."
                    style="margin-left: 10px;">

                <div style="margin-left: auto; display: flex; align-items: center;">
                    <h3 style="margin: 0 10px 0 0;">Filtro por Categoria</h3>
                    <select id="categoria" v-model="filter.categoriaId" style="margin-right: 10px;">
                        <option value="">
                            Todos
                        </option>
                        <option :value="categoria.id" v-for="(categoria, index) in categoriaList"
                            :key="`categoria-${index}`">
                            {{ categoria.nombre }}
                        </option>
                    </select>
                    <button @click="filtrar()" class="btn btn-lith">Filtrar</button>
                </div>
            </div>


        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Codigo</th>
                    <th>Categoria</th>
                    <th>Marca</th>
                    <th>Medidas</th>
                    <th>Vehiculo</th>
                    <th>Descripcion</th>
                    <th>Stock</th>
                    <th>Precio(Bs)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.categoria.nombre }}</td>
                    <td>{{ item.marca }}</td>
                    <td>{{ item.medidas }}</td>
                    <td>{{ item.vehiculo }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>{{ item.stock }}</td>
                    <td>{{ item.precio }}</td>
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
import RegisterProductoView from './RegisterProductoView.vue'
import EditProductoView from './EditProductoView.vue'

export default {
    name: 'Producto',
    data() {
        return {
            categoriaList: [],
            filter: {
                categoriaId: '',
            },
            message: 'Hola Mundo',
            currentPage: 1,
            totalPages: 100,
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            textToFilter: '',
            itemList: []
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        Modal,
        RegisterProductoView,
        EditProductoView
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        ...mapActions(['increment']),
        getCategoriaList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/categorias")
                .then(function (response) {
                    vm.categoriaList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        getList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/productos?_expand=categoria" + this.textToFilter + "&q=" + this.textToSearch)
                .then(function (response) {
                    console.log(response);
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        /*
        filtrar() {
            const vm = this;
            this.axios.get(this.baseUrl + "/productos?_expand=categoria" + this.textToFilter + "&q=" + this.textToSearch)
                .then(function (response) {
                    console.log(response);
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
*/
        filtrar() {
            this.textToFilter = '';
            if (this.filter.categoriaId != null && this.filter.categoriaId != '') {
                this.textToFilter += "&categoriaId=" + this.filter.categoriaId;
            }
            this.getList();
        },


        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Esta Seguro de eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + "/productos/" + id)
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
            this.getList();
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
        this.getCategoriaList();
        this.getList();
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>