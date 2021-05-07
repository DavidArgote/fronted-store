<template>
    <form @submit.prevent="update()" class="row g-3 p-3">
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
            <label for="name-update">
                <span>Producto</span>
                <input type="text" id="name-update" class="form-control" maxlength="50" 
                   v-model="product.name" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="brand-update">
                <span>Marca</span>
                <input type="text" id="brand-update" class="form-control" maxlength="50" 
                    v-model="product.brand" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="price-update">
                <span>Precio</span>
                <input type="number" id="price-update" class="form-control" 
                    v-model="product.price" required>
            </label>
        </div>
         <div class="col-12">
            <label for="description-update" class="w-100">
                <span>Descripción</span>
                <textarea name="description" id="description-update"
                    class="form-control" v-model="product.description" required></textarea>
            </label>
        </div>
        <div class="col-md-4">
            <label for="iva-update">
                <span>Valor iva</span>
                <input type="number" id="iva-update" class="form-control" 
                    v-model="product.iva" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="stock-update">
                <span>Cantidad de productos</span>
                <input type="number" id="stock-update" class="form-control" 
                    v-model="product.stock" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="warranty-update">
                <span>Garantía</span>
                <input type="text" id="warranty-update" class="form-control" maxlength="20" 
                    v-model="product.warranty" required>
            </label>
        </div>
        <button class="btn btn-success" type="submit">Guardar</button>
    </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { update } from '@/assets/network/request';

export default {
    name: 'UpdateProuctCard',
    props: {
        product: {},
    },
    data() {
        return {
            msg: '',
        }
    },
    computed: {
        ...mapState(['token', 'url']),
    },
    methods: {
        ...mapActions(['getProducts']),
        update() {
            this.product.price = Number(this.product.price);
            this.product.iva = Number(this.product.iva);
            this.product.stock = Number(this.product.stock);
            update(`${this.url}/product`, this.token, this.product)
                .then((response) => {
                    if(response.status === 201) {
                        this.msg = 'Producto editado con exito!';
                        this.getProducts();
                    }
                }).catch((error) => {
                    console.error(error.message);
                    this.msg = 'Error al editar el producto';
                });
        },
    }
}
</script>