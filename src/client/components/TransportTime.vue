<template>
  <section class="transport-time">
    <input type="number" value={ this.props.transport.get('time') } onChange={ this.changeTime } /> oh hai
  </section>
</template>

<script>
  export default {
    methods: {
      changeTime: function(event) {
        this.props.dispatch(setTime(event.target.value));
      }
    }
  }
</script>