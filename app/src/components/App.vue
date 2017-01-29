<style lang="sass">
  /* Base styles, so not scoped */
  html {
    background-color: rgb(14, 10, 14);
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
    /* color: #653737; */
    font-family: "Raleway";
    font-weight: 200;
    margin: 0;
    padding: 0;
    width: 100%;
    z-index: 1;
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

  input,
  textarea,
  button {
    border: 0px solid #653737;
    background-color: transparent;
    color: rgba(0, 255, 159, 1);
    box-sizing: border-box;
    font-size: 0.9em;
    font-family: "Raleway";
    font-weight: 800;
    outline-color: #0aa8cc;
    padding: 0.8em;
    text-align: left;
    text-stroke: 1px white;
    text-shadow: 1px 1px 0 rgba(0, 220, 255, 0.75);
    -webkit-text-fill-color: transparent;

    &[type=number] {
      width: 4em;
      line-height: 2em;
      -webkit-appearance: none;
    }
  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    text-shadow: none;
    -webkit-text-fill-color: initial;
  }

  ::selection {
    background: rgba(0, 255, 159, 0.65);
    font-size: 1em;
  }
</style>

<template @keyup="deleteEvent($event, event)">
	<body>
    <main id="app">
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
  import store from '../vuex/store';

  export default {
    components: {
      Transport,
      Grid,
      StyleManager,
      Scheduler,
      Scene
    },
    ready () {
      this.bindGlobalKeys();
    },
    methods: {
      bindGlobalKeys () {
        // App level key controls.
        window.addEventListener('keydown', (event) => {
          // Take over delete.
          let dispatch = store.dispatch;

          console.log(event.which);
          
          // Delete.
          if (event.which === 8) {
            event.preventDefault();
            dispatch('DELETE_EVENT');
          }

          // Space bar.
          if (event.which === 32) {
            /*const context = contextUtils.getContext();*/
            /*dispatch('TOGGLE_PLAY', context);*/
          }
        });
      }
    }
  }
</script>