<style scoped lang="sass">
  .scene{
    height: 100%;
    position: fixed;
  }
</style>

<template>
	<section class="scene">
    Scene!
  </section>
</template>

<script>
  import store from '../vuex/store';

  export default {
    store,
    vuex: {
      getters: {
        layers: store => store.layers
      }
    }
  }
</script>