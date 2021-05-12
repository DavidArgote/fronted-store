import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router/index';
import { get, update } from '../assets/network/request';

Vue.use(Vuex);
const URL_BASE = 'http://localhost:3000/api';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    message: null,
    employees: null,
    products: null,
    url: URL_BASE,
    invoices: null,
    incrementalInvoice: null,
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload
    },
    setMessage: (state, payload) => {
      state.message = payload
    },
    setEmployees: (state, payload) => {
      state.employees = payload
    },
    setProducts: (state, payload) => {
      state.products = payload
    },
    setInvoices: (state, payload) => {
      state.invoices = payload;
    },
    setIncrementalInvoice: (state, payload) => {
      state.incrementalInvoice = payload;
    }
  },
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    auth({ commit }, credentials) {
      const { user, password } = credentials;
      if(!user, !password) {
        commit('setMessage', 'Data is not valid');
        return;
      }
      fetch(`${URL_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username: user,
          password: password
        }),
      }).then((response) => response.json())
      .then((response) => {
        if(response.status === 500) {
          commit('setMessage', response.body);
          return;
        }
        localStorage.setItem('token', response.body);
        commit('setToken', response.body);
        router.push({ name: 'Home' });
      }).catch((error) => {
        console.error(error);
      });
    },
    getUser({ commit }, id) {

    },
    getEmployees({ commit, getters }) {
      get(`${URL_BASE}/employee`, getters.getToken)
        .then((response) => {
          commit('setEmployees', response.body);
        }).catch((error) => {
          console.error(error);
        });
    },
    getProducts({ commit, getters }, verifyStock = false) {
      get(`${URL_BASE}/product`, getters.getToken)
        .then((response) => {
          let products = [];
          if(verifyStock) {
            products = response.body.filter(product => product.stock > 0);
          } else {
            products = response.body;
          }
          commit('setProducts', products);
        }).catch((error) => {
          console.error(error);
        });
    },
    getInvoices({ commit, getters }) {
      get(`${URL_BASE}/invoice`, getters.getToken)
        .then((response) => {
          commit('setInvoices', response.body);
        }).catch((error) => {
          console.error(error);
        });
    },
  },
  modules: {
  }
})
