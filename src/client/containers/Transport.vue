<style scoped lang="sass">
	.transport {
	  color: red;

	  .nested {
	  	color: green;
	  }
	}
</style>

<template>
	<section class="transport">
    Transport!!?
    <play-button></play-button>
    <transport-time></transport-time>
    <span class="nested" v-on:click="log">{{ test }}</span>
  </section>
</template>

<script>
  import store from '../store';
  import PlayButton from '../components/PlayButton.vue';
  import TransportTime from '../components/TransportTime.vue';

  export default {
    data() {
      return {
        transport: this.$select('transport')
      }
    },
    methods: {
      log: function() {
        console.log('transport?', this.transport.toObject(), 'events?', this.events.toArray(), this.events.toObject(), this.events.toJS()); 
        // need to loop through, since it's a collection of maps. then do .toArrray()
      }
    },
    components: {
      PlayButton,
      TransportTime
    }
  }
</script>