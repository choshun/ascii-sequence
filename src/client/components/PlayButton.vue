<template>
  <button className={ 'play-button' } v-on:click="togglePlay">
    play button yo
  </button>
</template>

<script>
  export default {
    methods: {
      togglePlay: function() {
        var playing = !this.props.transport.get('play');
        this.props.dispatch(setPlay(playing));
      }
    }
  }
</script>