<style lang="sass">
  /* Base styles, so not scoped */
  html {
    background-color: #000;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 100;
  }

  @media (max-width: 500px) {
    html {
      font-size: 12px;
    }
  }

  body,
  html,
  main,
  section,
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    z-index: 1;
    overflow: hidden;
  }

  body,
  html,
  main {
    height: 100%;
  }

  ul {
    list-style: none;
    -webkit-margin-after: 0;
    -webkit-margin-before: 0;
    -webkit-margin-end: 0;
    -webkit-margin-start: 0;
    -webkit-padding-start: 0;
  }
</style>

<template>
	<body>
    <main id="app">
      App!
      <grid></grid>
      <transport></transport>
      <style-manager></style-manager>
      <scheduler></scheduler>
      <scene></scene>
    </main>

    <script src="bundle.js"></script>
  </body>
</template>

<script>
  import Transport from './Transport.vue';
  import Grid from './Grid.vue';
  import StyleManager from './StyleManager.vue';
  import Scheduler from './Scheduler.vue';
  import Scene from './Scene.vue';

  export default {
    components: {
      Transport,
      Grid,
      StyleManager,
      Scheduler,
      Scene
    }
  }
</script>