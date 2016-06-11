<style scoped lang="sass">
	.grid {
		position: relative;
	}
</style>

<template>
  <section class="grid">
    Grid!!
    {{ gridCSS }}
    <ul class="layers">
      <layer v-for="layer in layers" :layer="$index"></layer>
    </ul>
  </section>
</template>

<script>
  import store from '../vuex/store';
  import Layer from './Layer.vue';

  export default {
    store,
    vuex: {
      getters: {
        layers: store => store.layers,
      }
    },
    components: {
      Layer
    }
  }
</script>