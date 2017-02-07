// this line and require line just need one
// import Vue from 'vue'
import App from './App.vue'

var Vue = require('vue');
var VueResource = require('vue-resource');

Vue.use(VueResource);

require('./app.css');
// require('vue-strap');

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
})
