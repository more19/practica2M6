<template>
    <div class="navbar">
        <div class="logo">Mi Logo</div>
        <div class="menu">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    computed: {

    },
    methods: {

    }
}
</script>


<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #34495e;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.logo {
  font-size: 1.8em;
  font-weight: bold;
  color: #f1c40f;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.menu {
  display: flex;
  align-items: center;
}

.menu-item {
  margin: 0 20px;
  text-decoration: none;
  color: #ecf0f1 !important;
  font-weight: 600;
  font-size: 1.1em;
  transition: color 0.3s ease, transform 0.3s ease;
}

.menu-item:hover {
  color: #1abc9c !important;
  transform: translateY(-2px);
}

.menu-item.router-link-exact-active {
  color: #e74c3c !important;
  font-weight: bold;
  border-bottom: 2px solid #e74c3c;
  padding-bottom: 2px;
}
</style>