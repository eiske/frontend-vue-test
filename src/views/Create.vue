<template>
  <div>
    <b-alert dismissible variant="success" :show="!!lastCreatedProduct.name">
      Product <strong>{{lastCreatedProduct.name}}</strong> was created! department: {{lastCreatedProduct.department}}; Price: {{lastCreatedProduct.price}}; Status: {{lastCreatedProduct.status}};
    </b-alert>
    <b-card v-bind:title="functionTitle">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group label="Product:"
                      label-for="name">
          <b-form-input id="name"
                        type="text"
                        v-model="product.name"
                        required
                        placeholder="Enter product name"
                        v-focus>
          </b-form-input>
        </b-form-group>
        <b-form-group label="Department:"
                      label-for="department">
          <b-form-input id="department"
                        type="text"
                        v-model="product.department"
                        required
                        placeholder="Enter department name">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Price:"
                      label-for="price">
          <b-form-input id="price"
                        v-model="product.price"
                        v-money="money"
                        required
                        placeholder="Enter product price">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Status:"
                      label-for="status">
          <b-form-radio-group id="status"
                              name="radioStatus"
                              v-model="product.status">
            <b-radio value="PROD_ACTIVE">ACTIVE</b-radio>
            <b-radio value="PROD_INACTIVE">INACTIVE</b-radio>
          </b-form-radio-group>
        </b-form-group>
        <hr class="ruler">
        <b-button type="submit" variant="outline-success">Save Product</b-button>
        <b-button type="reset" variant="outline-secondary">Cancel</b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import productService from '@/services/product';
import {VMoney} from 'v-money';
export default {
  data() {
    return {
      product: {
        name: '',
        department: '',
        price: '',
        status: 'PROD_ACTIVE',
      },
      money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false,
      },
      show: true,
      lastCreatedProduct: {},
    };
  },
  methods: {
    onSubmit(evt) {
      //console.log(this.product);
      evt.preventDefault();
      if (this.product.id) {
        productService.update(this.product);
        this.lastCreatedProduct = { ...this.product };
        this.onReset();
      } else {
        productService.create(this.product);
        this.lastCreatedProduct = { ...this.product };
        this.onReset();
      }
    },
    onReset(evt) {
      if (evt) evt.preventDefault();
      /* Reset our form values */
      this.product.name = '';
      this.product.department = '';
      this.product.price = '';
      this.product.status = 'PROD_ACTIVE';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
    money: VMoney,
  },

  mounted: function() {
    if (this.$router.currentRoute.params.id) {
      const product = productService.get(this.$router.currentRoute.params.id);
      console.log(product);
      this.product = {...product};
    }
  },
  computed: {
    functionTitle: function() {
      if (this.$router.currentRoute.params.id) {
        return 'Update Product';
      } else {
        return 'Create Product';
      }
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
