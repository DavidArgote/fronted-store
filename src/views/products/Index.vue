<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-lg-9">
                <h1 class="mt-4">Productos
                    <button class="btn btn-success"
                        data-bs-toggle="modal" data-bs-target="#modalInsert">
                        Agregar
                    </button>
                </h1>
            </div>
            <div class="col-md-12 col-lg-3">
                <input class="form-control mt-4" placeholder="Buscar" v-model="valueFilter" @input="filterProducts()"/>
            </div>
            <hr class="mt-2">
        </div>
        <div class="col-12 mt-2">
            <table class="table table-striped table-hover">
                <thead class="bg-dark text-white">
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Garantía</th>
                        <th>Stock</th>
                        <th>Valor(U)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product of listProducts" :key="product._id">
                        <td>
                            {{ product._id }}
                        </td>
                        <td>
                            {{ product.name }}
                        </td>
                         <td>
                            {{ product.brand }}
                        </td>
                        <td>
                            {{ product.warranty }}
                        </td>
                        <td :class="product.stock <= 1 ? 'text-danger' : ''">
                            {{ product.stock }}
                        </td>
                        <td>
                            ${{ new Intl.NumberFormat('es-CO').format(product.price + product.iva) }}
                        </td>
                        <td>
                            <i class="fas fa-pen mx-2 text-primary" data-bs-toggle="modal" 
                                data-bs-target="#modalUpdate" id="btn-update" @click="changeSelectedProduct(product)"></i>
                            <i class="fas fa-trash text-danger" id="btn-deleted" @click="deleted(product._id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Modals -->
        <div class="modal fade" id="modalInsert" tabindex="-1" aria-labelledby="modalInsert" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalInsert">Insertar producto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <Insert />
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalUpdate" tabindex="-1" aria-labelledby="modalUpdate" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalUpdate">Actualizar producto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <Update :product="productSelected"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { remove } from '@/assets/network/request';

export default {
    name: 'Products',
    components: {
        Insert: () => import('@/components/cards/product/Insert.vue'),
        Update: () => import('@/components/cards/product/Update.vue'),
    },
    data() {
        return {
            listProducts: [],
            valueFilter: '',
            productSelected: {},
        }
    },
    watch: {
        products: {
            handler(products) {
                this.listProducts = products;
            }
        }
    },
    computed: {
        ...mapState(['products', 'token', 'url'])
    },
    methods: {
        ...mapActions(['getProducts']),
        filterProducts() {
            this.listProducts = this.products.filter((element) => 
                element.name.toLowerCase().indexOf(this.valueFilter.toLowerCase()) >= 0);
        },
        deleted(id) {
            this.$swal.fire({
            title: 'Deseas eliminar el producto?',
            showDenyButton: true,
            confirmButtonText: `Aceptar`,
            denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    remove(`${this.url}/product/${id}`, this.token)
                        .then((response) => {
                            if(!response.error) {
                                this.getProducts();
                                this.$swal.fire('Producto eliminado', '', 'success');
                            }
                        }).catch((error) => {
                            console.error(error);
                            this.$swal.fire('Error al intentar eliminar el producto', '', 'info');
                        });
                }
            });
        },
        changeSelectedProduct(product) {
            this.productSelected = product;
        }
    },
    created() {
        this.getProducts();
    },
    mounted() {
        this.listProducts = this.products;
    }
}
</script>

<style scoped>
#btn-deleted, #btn-update {
    cursor: pointer;
}

#btn-deleted:hover {
    color: rgb(250, 104, 104)!important;
}

#btn-update:hover {
   color: rgb(47, 168, 224)!important;
}
</style>