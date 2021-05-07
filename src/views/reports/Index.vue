<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-lg-8">
                <h1 class="mt-4">Reportes</h1>
            </div>
            <div class="col-md-12 col-lg-4 d-flex">
                <input type="date" class="form-control" v-model="sdate" format="yyyy-MM-dd" required>
                <input type="date" class="form-control mx-2" v-model="fdate" format="yyyy-MM-dd" required>
                <button class="btn btn-success" @click="getTotals()">Filtrar</button>
            </div>
            <hr class="mt-2">
        </div>
        <div class="row">
            <div class="col-12 d-flex">
                <div class="card p-4 shadow border-none bg-green">
                    <p>Total ventas</p>
                    <h2 class="text-center">$ {{ total }}</h2>
                </div>
                <div class="card p-4 shadow border-none">
                    <p>Total productos vendidos</p>
                    <h2 class="text-center">{{ totalProducts }}</h2>
                </div>
                <div class="card p-4 shadow border-none">
                    <p>Número total de facturas</p>
                    <h2 class="text-center">{{ totalInvoices }}</h2>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <h6>Productos con bajo stock</h6>
            <table class='table table-striped table-hover'>
                <thead class="bg-dark text-white">
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Descripción</th>
                        <th>Stock</th>
                        <th>Valor(Unidad)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product of listLowStock" :key="product._id">
                        <td>{{ product._id }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.brand }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.stock }}</td>
                        <td>{{ '$ ' + new Intl.NumberFormat('es-CO').format(product.price + product.iva) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { get } from '@/assets/network/request'; 
import moment from 'moment';

export default {
    name: 'Reports',
    data() {
        return {
            listLowStock: [],
            total: 0,
            totalProducts: 0,
            totalInvoices: 0,
            sdate: '',
            fdate: '',
        }
    },
    computed: {
        ...mapState(['url', 'token']),
    },
    methods: {
        getStockProucts() {
            get(`${this.url}/product/reports/stock-products`, this.token)
                .then((response) => {
                    if(response.status === 200) {
                        this.listLowStock = response.body;
                    }
                }).catch((error) => {
                    console.error(error.message);
                });
        },
        getTotals() {
            if(this.sdate === '' && this.fdate === '') {
                this.sdate = moment();
                this.fdate = moment();
            }
            get(`${this.url}/invoice/reports/totals?sdate=${moment(this.sdate).format('yyyy-MM-DD')}&fdate=${moment(this.fdate).format('yyyy-MM-DD')}`, 
                this.token)
                .then((response) => {
                    if(response.status === 200) {
                        const { totalSales, totalProducts, totalInvoices } = response.body;
                        this.total= new Intl.NumberFormat('es-CO').format(totalSales);
                        this.totalProducts= totalProducts;
                        this.totalInvoices= totalInvoices;
                    }
                }).catch((error) => {
                    console.error(error.message);
                });
        },
    },
    created() {
        this.getStockProucts();
        this.getTotals();
    }
}
</script>

<style scoped>
input, button {
    height: 40px;
    margin-top: 8%;
}
.border-none {
    border: 0px;
    border-radius: 1rem;
}
.card {
    width: 33%;
    margin: .3%;
}
.bg-green {
    background-color: #AEE9C2;
}
</style>