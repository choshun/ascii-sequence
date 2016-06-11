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
      <button @click="togglePlay">Play Button</button>
    </section>

    {{ time }}
    <section class="transport-time">
      <input :value="time" type="number" @input="updateTime" /> loop time
    </section>

  </section>
</template>

<script>
  import store from '../vuex/store';
  import { togglePlay } from '../vuex/actions';
  import { getIsPlaying } from '../vuex/getters';

  export default {
    store,
    vuex: {
      getters: {
        isPlaying: getIsPlaying,
        time: store => store.transport.time
      },
      actions: {
        togglePlay,
        updateTime: ({ dispatch }, event) => {
          dispatch('UPDATE_TIME', event.target.value);
        }
      }
    }
  }
</script>