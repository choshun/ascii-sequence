<template>
  <!-- <button class="play-button" @click="togglePlay">
    play button yo
    {{ play }}
  </button> -->

  <section>
    <button @click='increment'>Increment +1</button>
  </section>
</template>

<script>
  import { incrementCounter } from '../vuex/actions';

  export default {
    vuex: {
      actions: {
        increment: incrementCounter
      }
    }
  }
</script>