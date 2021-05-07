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
            <label for="name">
                <span>CC</span>
                <input type="text" id="cc" class="form-control" maxlength="50" 
                   v-model="employee.cc" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="name">
                <span>Nombre</span>
                <input type="text" id="employee" class="form-control" maxlength="50" 
                    v-model="employee.name" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="lasname">
                <span>Apellidos</span>
                <input type="text" id="lastname" class="form-control" 
                    v-model="employee.lastname" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="email">
                <span>Email</span>
                <input type="email" id="email" class="form-control" 
                    v-model="employee.email" required>
            </label>
        </div>
        <div class="col-md-4">
            <label for="cellphone">
                <span>Celular</span>
                <input type="number" id="cellphone" class="form-control" 
                    v-model="employee.cellphone" required>
            </label>
        </div>
        <button class="btn btn-success" type="submit">Guardar</button>
    </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { update } from '@/assets/network/request';

export default {
    name: 'UpdateEmployeeCard',
    props: ['employee'],
    data() {
        return {
            msg: '',
        }
    },
    computed: {
        ...mapState(['token', 'url']),
    },
    methods: {
        ...mapActions(['getEmployees']),
        update() {
            update(`${this.url}/employee`, this.token, this.employee)
                .then((response) => {
                    if(response.status === 201) {
                        this.msg = 'Empleado actualizado con exito';
                        this.getEmployees();
                        clear();
                    }
                }).catch((error) => {
                    console.error(error.message);
                    this.msg = 'Error al resgistrat el empleado';
                });
        },
        clear() {
            setInterval(() => {
                this.msg = '';
            }, 2000);
        }
    }
}
</script>