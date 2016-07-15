<style scoped lang="sass">
	.transport {
    padding: .5em 0 0 2em;
  }

  .play-button {
    background-color: rgba(0, 255, 159, 0.65);

    &.is-playing {
      background-color: transparent;
      border-width: 10px 0 10px 20px;
      border-color: transparent transparent transparent rgba(0, 255, 159, 0.65);
      padding: 0;
    }
  }
</style>

<template>
	<section class="transport">
    <button class= "play-button {{ isPlaying(getIsPlaying) }}" @click="togglePlay"></button>
  
    <input :value="getTime" type="number" @input="updateTime" />
    <!-- <input :value="getStart" type="number" @input="updateStart" step="0.1" /> loop start
    <input :value="getDuration" type="number" step="0.1"  @input="updateDuration" /> loop end -->
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
    },
    methods: {
      isPlaying: (isPlaying) => (isPlaying) ? '' : 'is-playing'
    }
  }
</script>