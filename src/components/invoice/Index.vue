<template>
  <div class="container-fluid">
    <div
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
      v-show="message !== ''"
    >
      {{ message }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <h5>Información tienda</h5>
    <div class="form-inline">
      <label for="input-seller">
        <span>Vendedor</span>
        <select
          class="form-select"
          aria-label=""
          id="input-seller"
          required
          v-model="dataInvoice.seller"
        >
          <option
            v-for="employee of employees"
            :key="employee._id"
            :value="employee.name + ' ' + employee.lastname"
            >{{ employee.name + ' ' + employee.lastname }}</option
          >
        </select>
      </label>
      <label for="input-invoice" class="mx-3">
        <span># Factura</span>
        <input
          type="number"
          class="form-control"
          id="input-invoice"
          required
          v-model="dataInvoice.num_factura"
          min="9999"
          max="99999"
          maxlength="6"
          readonly
        />
      </label>
    </div>
    <hr />
    <h5>Información cliente</h5>
    <div class="form-inline">
      <label for="input-cc">
        <span>CC</span>
        <input
          type="number"
          class="form-control"
          id="input-cc"
          required
          v-model="dataInvoice.client.cc"
          min="9999999999"
          max="9999999999"
          maxlength="10"
        />
      </label>
      <label for="input-name" class="mx-3">
        <span>Nombre</span>
        <input
          type="text"
          class="form-control"
          id="input-name"
          required
          v-model="dataInvoice.client.name"
          maxlength="50"
        />
      </label>
      <label for="input-dir">
        <span>Dirección</span>
        <input
          type="text"
          class="form-control"
          id="input-dir"
          required
          v-model="dataInvoice.client.address"
          maxlength="70"
        />
      </label>
      <label for="input-cellphone" class="mx-3">
        <span>Teléfono / Celular</span>
        <input
          type="number"
          class="form-control"
          id="input-cellphone"
          required
          v-model="dataInvoice.client.cellphone"
          min="9999999999"
          max="9999999999"
          maxlength="10"
        />
      </label>
    </div>
    <div class="row mt-4">
      <div class="col-lg-6">
        <h5>Lista de compra</h5>
      </div>
      <div class="col-lg-6 d-flex flex-row-reverse">
        <button
          class="btn bg-white shadow"
          data-bs-toggle="modal"
          data-bs-target="#modal-cart"
        >
          <i class="fas fa-cart-plus"></i>
        </button>
      </div>
    </div>
    <div class="w-100 mt-3">
      <table
        class="table table-striped table-hover"
        v-if="listProductsInvoice.length > 0"
      >
        <thead class="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Garantía</th>
            <th>Cantidad</th>
            <th>Valor (unidad)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product of listProductsInvoice" :key="product._id">
            <td>{{ product._id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.warranty }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}</td>
          </tr>
        </tbody>
      </table>
      <h6 class="text-center my-5" v-else>No hay productos en el carrito</h6>
    </div>
    <div class="row mt-4">
      <div class="col-lg-6">
        <h6>
          Subtotal:
          <strong
            >${{ new Intl.NumberFormat('es-CO').format(subtotal) }}</strong
          >
        </h6>
        <h6>
          IVA:
          <strong>${{ new Intl.NumberFormat('es-CO').format(iva) }}</strong>
        </h6>
        <h6>
          Total:
          <strong>${{ new Intl.NumberFormat('es-CO').format(total) }}</strong>
        </h6>
      </div>
      <div class="col-lg-6 d-flex flex-row-reverse">
        <button class="btn btn-success shadow btn-pay" @click="saveInvoice()">
          Finalizar compra
        </button>
      </div>
    </div>
    <div
      class="modal fade"
      id="modal-cart"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Agregar producto a la compra
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control w-25 d-block float-end mb-3"
              placeholder="Buscar"
              @input="filterProducts()"
              v-model="valueFilter"
            />
            <table class="table table-striped">
              <thead class="bg-dark text-white">
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Stock</th>
                  <th>Valor(unidad)</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product of listProducts" :key="product._id">
                  <td>{{ product._id }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.brand }}</td>
                  <td>{{ product.stock }}</td>
                  <td>{{ product.price }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="addProductToInvoice(product)"
                    >
                      Agregar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { post, get, update } from '@/assets/network/request'
import moment from 'moment'

export default {
  name: 'Invoice',
  data() {
    return {
      listProducts: [],
      valueFilter: '',
      listProductsInvoice: [],
      total: 0,
      subtotal: 0,
      iva: 0,
      dataInvoice: {
        client: {
          cc: '',
          name: '',
          address: '',
          cellphone: '',
        },
        seller: '',
        total_pay: 0,
        total_iva: 0,
        method_pay: 'Efectivo',
        num_factura: '',
        date: '',
        products: [],
      },
      message: '',
      param: {},
    }
  },
  computed: {
    ...mapState(['employees', 'products', 'token', 'url']),
  },
  methods: {
    ...mapActions(['getEmployees', 'getProducts']),
    filterProducts() {
      this.listProducts = this.products.filter(
        element => element.name.toLowerCase().indexOf(this.valueFilter) >= 0
      )
      if (this.valueFilter === '') {
        this.listProducts = []
      }
    },
    addProductToInvoice(product) {
      product.quantity = 1
      this.listProductsInvoice.push(product)
    },
    saveInvoice() {
      if (this.validate()) {
        this.dataInvoice.products = this.listProductsInvoice
        this.dataInvoice.total_pay = this.total
        this.dataInvoice.total_iva = this.iva
        this.dataInvoice.date = moment()
        //this.dataInvoice.date = moment().subtract(1, 'days')
        post(`${this.url}/invoice`, this.token, this.dataInvoice)
          .then(response => {
            if (response.status) {
              this.message = 'Factura guardada con exito!'
              this.updateIncrementalInvoice()
              this.updateStocks(this.dataInvoice.products)
            }
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        this.message = 'Falta información importante en la factura'
      }
    },
    async updateStocks(listProducts) {
      if (listProducts.length > 0) {
        for (let product of listProducts) {
          let oldStock = await this.getProduct(product._id).stock
          oldStock -= 1
          if (!oldStock) oldStock = 0
          update(`${this.url}/product/update-stock`, this.token, {
            id: product._id,
            value: oldStock,
          })
            .then(response => {
              if (!response.status == 201) {
                console.warining(response.body)
              }
            })
            .catch(error => {
              console.error(error)
            })
        }
      }
    },
    async getProduct(id) {
      get(`${this.url}/product/${id}`, this.token)
        .then(response => {
          if (!response.status == 200) {
            return response
          }
        })
        .catch(error => {
          console.error(error)
          return null
        })
    },
    validate() {
      if (
        this.dataInvoice.client.cc === '' ||
        (this.dataInvoice.client.name === '' &&
          this.dataInvoice.client.cellphone === '')
      ) {
        return false
      } else if (this.dataInvoice.seller === '') {
        return false
      } else if (!this.listProductsInvoice.length > 0) {
        return false
      } else {
        return true
      }
    },
    getIncrementalInvoice() {
      get(`${this.url}/params`, this.token)
        .then(response => {
          this.param = response.body.filter(
            el => el.name === 'count-facturas' && el.state
          )[0]
          this.dataInvoice.num_factura = this.param.value
        })
        .catch(error => {
          console.error(error)
        })
    },
    updateIncrementalInvoice() {
      this.param.value = Number(this.param.value + 1)
      update(`${this.url}/params`, this.token, this.param)
        .then(response => {
          if (response.status === 201) {
            this.getIncrementalInvoice()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  watch: {
    listProductsInvoice: {
      handler(listProductsInvoice) {
        this.subtotal = listProductsInvoice.reduce((previus, current) => {
          const prevPrice = previus.price || previus
          const prevQuantity = previus.quantity || 1
          return prevPrice * prevQuantity + current.price * current.quantity
        }, 0)
        this.iva = listProductsInvoice.reduce((previus, current) => {
          const prevPrice = previus.iva || previus
          const prevQuantity = previus.quantity || 1
          return prevPrice * prevQuantity + current.iva * current.quantity
        }, 0)
        this.total = this.subtotal + this.iva
      },
    },
  },
  created() {
    this.getEmployees()
    this.getProducts(true)
    this.getIncrementalInvoice()
  },
}
</script>

<style scoped>
h5 {
  color: rgb(71, 71, 71);
}
#input-name {
  width: 31rem;
}
#input-dir {
  width: 16rem;
}
.table {
  height: 20rem;
}
.btn-pay {
  height: 3rem;
}
#input-seller {
  width: 20rem;
}
#input-cellphone {
  width: 18rem;
}
</style>
