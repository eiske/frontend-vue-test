<template>
  <div>
    <b-card v-bind:title="product.name">
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
export default {
  data() {
    //console.log(productService.get(this.$route.params.id));
    return {
      product: productService.get(this.$route.params.id),
    };
  },
  methods: {},
  computed: {
    title() {
      return product.name;
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