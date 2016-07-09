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
    <section class="play-button">
      {{ getIsPlaying }}
      <button @click="togglePlay">Play Button</button>
    </section>

    duration {{ getDuration }}
    <section class="transport-getTime">
      <input :value="getTime" type="number" @input="updateTime" /> loop time
      <input :value="getStart" type="number" @input="updateStart" step="0.1" /> loop start
      <input :value="getDuration" type="number" step="0.1"  @input="updateDuration" /> loop end
    </section>

  </section>
</template>

<script>
  import store from '../vuex/store';
  import ContextUtils from '../utils/context-utils.js';

  const contextUtils = new ContextUtils();

  export default {
    store,
    vuex: {
      getters: {
        getIsPlaying: store => store.transport.playing,
        getTime: store => store.transport.time,
        getStart: store => store.transport.start,
        getDuration: store => store.transport.duration
      },
      actions: {
        togglePlay: ({ dispatch, state }) => {
          // TODO delete next line, actual
          // context will never be exposed, only through context-utils
          // getTranslatedContext.
          const context = contextUtils.getContext();
          dispatch('TOGGLE_PLAY', context);
          contextUtils.togglePlay(state);
        },
        updateTime: ({ dispatch }, event) => dispatch('UPDATE_TIME', event.target.value),
        updateStart: ({ dispatch }, event) => dispatch('UPDATE_START', event.target.value),
        updateDuration: ({ dispatch }, event) => dispatch('UPDATE_DURATION', event.target.value)
      }
    }
  }
</script>