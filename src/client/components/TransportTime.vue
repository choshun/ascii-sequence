<template>
  <section class="transport-time">
    <input type="number" value={{ this.transport.get('time') }} v-on:change="changeTime" /> oh hai
  </section>
</template>

<script>
  export default {
    methods: {
      changeTime: function(event) {
        console.log('prop?', this);
        // this.props.dispatch(setTime(event.target.value));
      }
    }
  }
</script>