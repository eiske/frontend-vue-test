<template>
  <div class="home">
    <b-form>
      <b-input v-model="filter" class="mb-2 mr-sm-2 mb-sm-0" size="lg" placeholder="Search..." />
    </b-form>
    <b-table bordered striped hover :items="products" :fields="tableFields" :filter="filter" :perPage="20" :currentPage='currentPage' @filtered="onFiltered" @row-clicked="click">
      <template slot="date" slot-scope="data"> 
        {{data.value | formatDate}}
      </template>
      <template slot="price" slot-scope="data"> 
        {{data.value | formatPrice}}
      </template>
      <template slot="status" slot-scope="data"> 
        {{data.value | formatStatus}}
      </template>
    </b-table>
    <b-pagination size="md" :total-rows="totalRow" v-model="currentPage" align="center">
    </b-pagination>
  </div>
</template>

<script>
// @ is an alias to /src
import productService from '@/services/product';
import formatDate from '@/components/formatProductList.js';
import {VMoney} from 'v-money';;

export default {
  name: 'home',
  components: {},
  data() {
    return {
      products: productService.list(),
      tableFields: [
        { key: 'name', label: 'Product', sortable: true },
        { key: 'department', label: 'Department', sortable: true },
        { key: 'price', label: 'Price', sortable: true, },
        { key: 'date', label: 'Last Modified', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
      ],
      filter: null,
      currentPage: 1,
      totalRow: productService.list().length,
    };
  },
  methods: {
    onFiltered (filteredItems) {
      this.totalRow = filteredItems.length
      this.currentPage = 1
    },
    click (evt) {
      //console.log(evt),
      this.$router.push('detail/'+evt.id)
    }
  },
  directives: {
    money: VMoney
  },
};
</script>


<style lang="stylus" scoped>
form {
  margin-bottom: 30px;
}
</style>
