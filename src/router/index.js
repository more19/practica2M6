import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UsuarioView from '../views/usuario/UsuarioView.vue';
import ProveedorView from '../views/proveedor/ProveedorView.vue';
import CategoriaView from '../views/categoria/CategoriaView.vue';
import PedidoView from '../views/pedido/PedidoView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/proveedor',
    name: 'proveedor',
    component: ProveedorView,
  },
  {
    path: '/categoria',
    name: 'categoria',
    component: CategoriaView,
  },
  {
    path: '/producto',
    name: 'producto',
    component: ProductoView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuarioView,
    // meta: { requiresAuth: true, role: ['admin','secretaria','veterinario'] }
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: PedidoView,
    // meta: { requiresAuth: true, role: ['admin','secretaria','veterinario'] } 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
