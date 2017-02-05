<style scoped lang="sass">
  $ease: cubic-bezier(.23, 1, .32, 1);

  .scene{
    height: 100%;
    position: fixed;

    .scene-item {
      font-size: 4em;
      position: fixed;
      transition: all .5s $ease;
      top: 0;
    }
    
  }
</style>

<template>
	<section class="scene">
    <ul>
      <li v-for="layer in layers">
        <figure class="layer-{{$index}} scene-item" track-by="$index">
          {{ layer.element }}
        </figure>
      </li>
    </ul>
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