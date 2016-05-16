<style scoped lang="sass">
	.scene {
	  color: red;

	  .nested {
	  	color: green;
	  }
	}
</style>

<template>
	<section class="scene">
    Transport!!?
    <span class="nested" v-on:click="log">{{ test }}</span>
  </section>
</template>

<script>
  import store from '../store';

  export default {
    data() {
      return {
        transport: this.$select('transport')
      }
    },
    methods: {
      log: function() {
        console.log('transport?', this.transport.toObject(), 'events?', this.events.toArray(), this.events.toObject(), this.events.toJS()); // need to loop through, since it's a collection of maps. then do .toArrray()
      }
    }
  }
</script>