<style>
  
</style>

<template>
	<section className={'style-manager'}>
    <textarea :value="getActiveStyle" @input="onStyleChange"></textarea>
  </section>
</template>

<script>
  import store from '../vuex/store';

  export default {
    store,
    vuex: {
      getters: {
        getActiveStyle: store => store.styleManager.active[0].data
      },
      actions: {
        onStyleChange: ({ dispatch }, event) => {
          console.log('boop, style change motherfucker');

          // update selected event with input value
        }
      }
    }
  }
</script>
