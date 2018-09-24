<template>
  <div class="home">
    <b-form>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" size="lg" placeholder="Search..." />
    </b-form>
    <b-table bordered striped hover :items="products" :fields="tableFields"></b-table>
  </div>
</template>

<script>
// @ is an alias to /src
import productService from '@/services/product';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      products: productService.list(),
      tableFields: [
        { key: 'name', label: 'Product' },
        { key: 'department', label: 'Department' },
        { key: 'price', label: 'Price' },
        { key: 'date', label: 'Last Modified' },
        { key: 'status', label: 'Status' },
      ],
    };
  },
};
</script>


<style lang="stylus" scoped>
form {
  margin-bottom: 30px;
}
</style>
