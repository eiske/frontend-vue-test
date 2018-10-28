import Vue from 'vue';
import Moment from 'moment';
import Status from '@/components/formatStatus.js';

Vue.filter('formatDate', function(value) {
    if (value) {
        return Moment(value).format('DD/MM/YYYY hh:mm')
    }
});

Vue.filter('formatPrice', function(value) {
    console.log(Status)
    if (value) {
        return 'R$' + value.replace('.', ',')
    }
});

Vue.filter('formatStatus', function(value) {
    return Status.product[value]
});