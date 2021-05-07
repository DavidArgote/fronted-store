<template>
    <form @submit.prevent="save(product)" class="row g-3 p-3">
        <div v-if="msg !== ''">
            <div class="alert alert-warning alert-dismissible fade show"
                role="alert">
                {{ msg }}
            <button type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close">
            </button>
        </div>
        </div>
        <div class="col-md-4">
            <label for="name">
                <span>Producto</span>
                <input type="text" id="name" class="form-control" maxlength="50" 
                   v-model="product.name" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="brand">
                <span>Marca</span>
                <input type="text" id="brand" class="form-control" maxlength="50" 
                    v-model="product.brand" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="price">
                <span>Precio</span>
                <input type="number" id="price" class="form-control" 
                    v-model="product.price" required>
            </label>
        </div>
         <div class="col-12">
            <label for="description" class="w-100">
                <span>Descripción</span>
                <textarea name="description" id="description"
                    class="form-control" v-model="product.description" required></textarea>
            </label>
        </div>
        <div class="col-md-4">
            <label for="iva">
                <span>Valor iva</span>
                <input type="number" id="iva" class="form-control" 
                    v-model="product.iva" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="stock">
                <span>Cantidad de productos</span>
                <input type="number" id="stock" class="form-control" 
                    v-model="product.stock" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="warranty">
                <span>Garantía</span>
                <input type="text" id="warranty" class="form-control" maxlength="20" 
                    v-model="product.warranty" required>
            </label>
        </div>
        <button class="btn btn-success" type="submit">Guardar</button>
    </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { post } from '@/assets/network/request';

export default {
    name: 'InsertProuctCard',
    data() {
        return {
            msg: '',
            product: {
                name: '',
                brand: '',
                price: 0,
                iva: 0,
                stock: 1,
                description: '',
                warranty: '',
            },
        }
    },
    watch: {
        product: {
            deep: true,
            handler(product) {
                this.product.iva = (Number(product.price) * 0.19);
            }
        }
    },
    computed: {
        ...mapState(['token', 'url']),
    },
    methods: {
        ...mapActions(['getProducts']),
        save() {
            this.product.price = Number(this.product.price);
            this.product.iva = Number(this.product.iva);
            this.product.stock = Number(this.product.stock);
            post(`${this.url}/product`, this.token, this.product)
                .then((response) => {
                    if(response.status === 201) {
                        this.msg = 'Producto creado con exito';
                        this.clear();
                        this.getProducts();
                    }
                }).catch((error) => {
                    console.error(error.message);
                    this.msg = 'Error al resgistrat el producto';
                });
        },
        clear() {
            setInterval(() => {
                this.msg = '';
            }, 2000);
            this.product.name = '';
            this.product.brand = '';
            this.product.price = 0;
            this.product.iva = 0;
            this.product.stock = 1;
            this.product.description = '';
            this.product.warranty = '';
        }
    }
}
</script>