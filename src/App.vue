<template>
  <div id="app" class="container">
    <div id="nav">
      <router-link tag="div" :to="{name: 'list'}" class="nav-left">
        <img src="@/assets/logo-round.png">
        <h1>Shift Code - Frontend Test</h1>
      </router-link>
      <div class="nav-right">
        <b-button :to="{name: 'list'}" v-if="$route.name !== 'list'" variant="outline-primary" active-class="">
            List Products
        </b-button>
        <b-button :to="{name: 'create'}" v-if="$route.name !== 'create'" variant="outline-primary" active-class="">
            Create Product
        </b-button>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 20px 0;

  .nav-left, .nav-right {
    width: 50%;
    display: inline-block;
  }

  .nav-left {
    cursor: pointer;
    padding-left: 30px;

    img {
      height: 22px;
      width: 22px;
      position: absolute;
      margin-left: -30px;
    }
  }

  .nav-right {
    text-align: right;
  }

  h1 {
    margin: 0;
    font-size: 20px;
  }
}
</style>
