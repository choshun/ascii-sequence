<style scoped lang="sass">
	$ease: cubic-bezier(.23, 1, .32, 1);
  $width: 10;

  li[class*="event"] {
    background: green;
    height: 100%;
    left: 30%;
    position: absolute;
    top: 0;
    transition: all .5s $ease;
    width: 10px;
    margin-left: $width/2 * -1px;
    z-index: 2;

    &.is-active {
      height: 120%;
      margin-left: ($width) * -1px;
      width: ($width * 2) * 1px;
    }
  }
</style>

<template>
  <li class="event">

    {{ eventCSS }}
    layer {{ layer }} asd
    {{ event.layer }}
    {{ event.time }}
  </li>
</template>

<script>
  import store from '../vuex/store';
  import { clone, uniq, map, each, filter } from 'lodash';

  export default {
    store,
    props: ['layer', 'event'],
    vuex: {
      getters: {
        sequence: store => store.sequence,
        eventCSS: store => {
          console.log(store.sequence, 'this is an event hack!!');
        }
      }
    },
    methods: {
      init: () => {
        console.log(`c'mooooon`);
      }
    },
    init: () => {
      console.log('event');
      // layer.initGridCSS(this.store.sequence.events);
    }
  }
</script>