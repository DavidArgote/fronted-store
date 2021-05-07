<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-lg-9">
                <h1 class="mt-4">Empleados
                    <button class="btn btn-success"
                        data-bs-toggle="modal" data-bs-target="#modalInsert">
                        Agregar
                    </button>
                </h1>
            </div>
            <div class="col-md-12 col-lg-3">
                <input class="form-control mt-4" placeholder="Buscar" v-model="valueFilter" @input="filterEmployees()"/>
            </div>
            <hr class="mt-2">
        </div>
        <!-- Table --> 
        <div class="col-12 mt-2">
            <table class="table table-striped table-hover">
                <thead class="bg-dark text-white">
                    <tr>
                        <th>CC</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Cellphone</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee of listEmployees" :key="employee._id">
                        <td>
                            {{ employee.cc }}
                        </td>
                        <td>
                            {{ employee.name + ' ' + employee.lastname }}
                        </td>
                         <td>
                            {{ employee.email }}
                        </td>
                        <td>
                            {{ employee.cellphone }}
                        </td>
                        <td>
                            <i class="fas fa-pen mx-2 text-primary" data-bs-toggle="modal" 
                                data-bs-target="#modalUpdate" id="btn-update" @click="changeSelectedEmployee(employee)"></i>
                            <i class="fas fa-trash text-danger" id="btn-deleted" @click="deleted(employee._id)"></i>
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
                        <h5 class="modal-title" id="modalInsert">Insertar empleado</h5>
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
                        <h5 class="modal-title" id="modalUpdate">Actualizar empleado</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <Update :employee="employeeSelected" />
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
    name: 'Employees',
    components: {
        Insert: () => import('@/components/cards/employee/Insert.vue'),
        Update: () => import('@/components/cards/employee/Update.vue')
    },
    data() {
        return {
            msg: '',
            valueFilter: '',
            employeeSelected: {},
            listEmployees: [],
        }
    },
    watch: {
        employees: {
            handler(employees) {
                this.listEmployees = employees;
            }
        }
    },
    computed: {
        ...mapState(['token', 'url', 'employees']),
    },
    methods: {
        ...mapActions(['getEmployees']),
        filterEmployees() {
            this.listEmployees = this.employees.filter((element) => 
                element.name.toLowerCase().indexOf(this.valueFilter.toLowerCase()) >= 0);
        },
        deleted(id) {
            this.$swal.fire({
            title: 'Deseas eliminar el empleado?',
            showDenyButton: true,
            confirmButtonText: `Aceptar`,
            denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    remove(`${this.url}/employee/${id}`, this.token)
                        .then((response) => {
                            if(!response.error) {
                                this.getEmployees();
                                this.$swal.fire('Empleado eliminado', '', 'success');
                            }
                        }).catch((error) => {
                            console.log(error);
                            this.$swal.fire('Error al intentar eliminar el empleado', '', 'info');
                        });
                }
            });
        },
        changeSelectedEmployee(employee) {
            this.employeeSelected = employee;
        }
    },
    created() {
        this.getEmployees();
    },
    mounted() {
        this.listEmployees = this.employees;
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