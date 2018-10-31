<template>
  <div>
    <b-alert dismissible variant="success" :show="!this.product.id">
      Product <strong>{{this.product.name}}</strong> was deleted!;
    </b-alert>
    <b-card v-bind:title="product.name" footer="">
      <div class="container">
        <div class="row">
          <div class="col" id="name">
            <h6><strong>Departament</strong></h6>
          </div>
          <div class="col-9">
            {{product.department}}
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h6><strong>Price</strong></h6>
          </div>
          <div class="col-9">
            {{product.price | formatPrice}}
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h6><strong>Status</strong></h6>
            <b-btn v-b-modal.modalPrevent variant="danger">Delete</b-btn>
            <b-modal id="modalPrevent"
             ref="modal"
             @ok="handleOk">
              <form @submit.stop.prevent="handleSubmit">
                Are you sure you want to delete {{this.product.name}}?
              </form>
             </b-modal>
          </div>
          <div class="col-9">
            <b-badge variant="success" v-if="product.status === 'PROD_ACTIVE'">{{ product.status | formatStatus }}</b-badge>
            <b-badge variant="danger" v-else>{{ product.status | formatStatus }}</b-badge>
          </div>
        </div>
      </div>     
    </b-card>
  </div>
</template>

<script>
import productService from '@/services/product';
import formatStatus from '@/components/formatProductList.js';
import {VMoney} from 'v-money';
import VuejsDialog from 'vuejs-dialog';
export default {
  data() {
    //console.log(productService.get(this.$route.params.id));
    return {
      product: productService.get(this.$route.params.id),
      modalShow: false,
    };
  },
  methods: {
      //evt.preventDefault();
      //productService.remove(this.product);
      handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      productService.remove(this.product);
      this.$refs.modal.hide();
    },
  },
  computed: {
    timeStamp: function() {
      var time = product.date.fromNow();
      return time;

    },
  },
};
</script>

<style lang="stylus" scoped>
form {
  button[type='submit'] {
    margin-right: 10px;
  }
}
</style>