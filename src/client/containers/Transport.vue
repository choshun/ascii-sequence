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

    <section class="play-button">
      {{ isPlaying }}
      <button @click="togglePlay()">Play Button</button>
    </section>

    <section class="transport-time">
      <input type="number" /> loop time
    </section>

    <!-- <play-button></play-button>?!?!?{{ play }}?!?!
    <transport-time></transport-time> -->
  </section>
</template>

<script>
  import TransportTime from '../components/TransportTime.vue';
  import store from '../vuex/store';
  import { togglePlay } from '../vuex/actions';
  import { getIsPlaying } from '../vuex/getters';

  export default {
    store,
    vuex: {
      getters: {
        isPlaying: getIsPlaying
      },
      actions: {
        togglePlay
      }
    }
  }
</script>