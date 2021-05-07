<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="/img/logo-store.png" alt="logo-store" width="30" height="26 " class="d-inline-block align-text-top">
          Store
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-link" :to="{ name: 'Products' }">Productos</router-link>
        <router-link class="nav-link" :to="{ name: 'Invoices' }">Ventas</router-link>
        <router-link class="nav-link" :to="{ name: 'Employees' }">Vendedores</router-link>
        <router-link class="nav-link" :to="{ name: 'Reports' }">Reportes</router-link>
        <div class="vl"></div>
        <div class="container-user">
          <i class="fas fa-user"></i>
          David Argote
        </div>
      </div>
    </div>
  </nav>
  </div>
</template>

<style scoped>
.container-lnks {
  width: 50%;
}
.vl {
  border-left: 1px solid rgb(196, 196, 196);
  height: 40px;
  margin-left: 1rem;
  margin-right: 1rem;
}
.container-user {
  width: 10rem;
  margin-top: 7px;
}
</style>
