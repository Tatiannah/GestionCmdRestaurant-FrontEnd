import './assets/main.css'
import  'jquery';
import 'datatables.net';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



const app = createApp(App)

app.component('EasyDataTable', Vue3EasyDataTable);

app.use(router)

app.mount('#app')



