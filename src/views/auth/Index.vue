<template>
    <div class="container-fluid container-login d-flex justify-content-center align-items-center">
        <div class="card p-4">
            <h1 class="text-center mb-2">Login</h1>
            <div class="card-body">
                <form @submit.prevent="auth({ user, password })">
                    <label for="input-usuario" class="w-100">
                        <span>Usuario</span>
                        <input type="text" class="form-control" id="input-usuario" v-model="user" required>
                    </label>
                    <label for="input-password" class="w-100 mt-2">
                        <span>Password</span>
                        <input type="password" class="form-control" id="input-password" v-model="password" required>
                    </label>
                    <button type="submit" class="btn btn-success w-100 mt-3">Ingresar</button>
                    <p class="text-danger text-center my-2" v-if="message !== null">
                        {{ message }}
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            user: '',
            password: '',
        }
    },
    methods: {
        ...mapActions(['auth'])
    },
    computed: {
        ...mapState(['message'])
    }
}
</script>

<style scoped>
.container-login {
    width: 100%;
    height: 90vh;
}
.card {
    width: 45rem;
    height: 21rem;
}
</style>