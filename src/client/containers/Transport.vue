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
    <span class="nested">{{ test }}</span>
  </section>
</template>

<script>

export default {
  data() {
    return {
      test: `I'm a test yo!`
      
    }
  }
}

</script>