<template>
  <div>
    <b-alert dismissible variant="success" :show="!!lastCreatedProduct.name">
      Product <strong>{{lastCreatedProduct.name}}</strong> was created! department: {{lastCreatedProduct.department}}; Price: {{lastCreatedProduct.price}}.
    </b-alert>
    <b-card title="Create Product">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group label="Product:"
                      label-for="name">
          <b-form-input id="name"
                        type="text"
                        v-model="product.name"
                        required
                        placeholder="Enter product name">
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
                        type="number"
                        v-model="product.price"
                        required
                        placeholder="Enter product price">
          </b-form-input>
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

export default {
  data() {
    return {
      product: {
        name: '',
        department: '',
        price: '',
        status: 'PROD_ACTIVE',
      },
      show: true,
      lastCreatedProduct: {},
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      productService.create(this.product);
      this.lastCreatedProduct = { ...this.product };
      this.onReset();
    },
    onReset(evt) {
      if (evt) evt.preventDefault();
      /* Reset our form values */
      this.product.name = '';
      this.product.department = '';
      this.product.price = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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
