<template>
  <section class="scheduler">
    Scheduler!!! :D
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