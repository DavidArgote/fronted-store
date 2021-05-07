<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-lg-9">
                <h1 class="mt-4">Facturas</h1>
            </div>
            <div class="col-md-12 col-lg-3">
                <input class="form-control mt-4" placeholder="Buscar" v-model="valueFilter" @input="filterInvoices()"/>
            </div>
            <hr class="mt-2">
        </div>
        <div class="row">
            <table class="table table-striped table-hover">
                <thead class="bg-dark text-white">
                    <tr>
                        <th># Factura</th>
                        <th>Comprador</th>
                        <th>Vendedor</th>
                        <th>Productos comprados</th>
                        <th>Fecha</th>
                        <th>Valor pago</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="invoice of listInvoices" :key="invoice._id">
                        <td>{{ invoice.num_factura }}</td>
                        <td>{{ invoice.client.name }}</td>
                        <td>{{ invoice.seller }}</td>
                        <td>
                            <ul v-for="product of invoice.products" :key="product._id">
                                <li type="square">
                                    {{  product.name }}
                                </li>
                            </ul>
                        </td>
                        <td>{{ new Intl.DateTimeFormat("es-CO").format(new Date(invoice.date)) }}</td>
                        <td>{{ '$' + new Intl.NumberFormat("es-CO").format(invoice.total_pay) }}</td>
                        <td>
                            <i class="fas fa-trash text-danger" id="btn-deleted" @click="deleted(invoice._id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { remove } from '@/assets/network/request';

export default {
    name: 'Invoices',
    data() {
        return {
            msg: '',
            listInvoices: [],
            valueFilter: '',
        }
    },
    watch: {
        invoices: {
            handler(invoices) {
                this.listInvoices = invoices;
            }
        }
    },
    computed: {
        ...mapState(['token', 'url', 'invoices']),
    },
    methods: {
        ...mapActions(['getInvoices']),
        filterInvoices() {
            this.listInvoices = this.invoices.filter((element) => 
                element.num_factura.indexOf(this.valueFilter) >= 0);
        },
        deleted(id) {
            this.$swal.fire({
            title: 'Deseas eliminar el producto?',
            showDenyButton: true,
            confirmButtonText: `Aceptar`,
            denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    remove(`${this.url}/invoice/${id}`, this.token)
                        .then((response) => {
                            if(!response.error) {
                                this.getInvoices();
                                this.$swal.fire('Factura eliminada', '', 'success');
                            }
                        }).catch((error) => {
                            console.error(error);
                            this.$swal.fire('Error al intentar eliminar la factura', '', 'info');
                        });
                }
            });
        }
    },
    created() {
        this.getInvoices();
    },
    mounted() {
        this.listInvoices = this.invoices;
    }
}
</script>

<style scoped>
#btn-deleted{
    cursor: pointer;
}

#btn-deleted:hover {
    color: rgb(250, 104, 104)!important;
}
</style>