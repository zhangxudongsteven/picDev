import Vue from 'vue'
import App from './App.vue'

require('./app.css');
require('vue-strap');

Vue.use(require('vue-resource'));

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
})
