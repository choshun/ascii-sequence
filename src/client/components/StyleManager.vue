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
        onStyleChange: ({ dispatch }, event) => dispatch('UPDATE_EVENT_DATA', event.target.value)
      }
    }
  }
</script>
