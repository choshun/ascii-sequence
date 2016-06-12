import Vue from 'vue';
import Transport from './components/Transport.vue';
import Grid from './components/Grid.vue';
import StyleManager from './components/StyleManager.vue';
import Scheduler from './components/Scheduler.vue';
import Scene from './components/Scene.vue';

new Vue({
  el: '#app',
  components: {
    Transport,
    Grid,
    StyleManager,
    Scheduler,
    Scene
  }
});

