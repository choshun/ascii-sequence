import Vue from 'vue';
import Transport from './components/Transport.vue';
import Grid from './components/Grid.vue';
import StyleManager from './components/StyleManager.vue';
import Scheduler from './components/Scheduler.vue';

new Vue({
  el: '#app',
  components: {
    Transport,
    Grid,
    StyleManager,
    Scheduler
  }
});

