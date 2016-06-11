<style scoped lang="sass">
	$ease: cubic-bezier(.23, 1, .32, 1);
  $width: 10;

  li[class*="event"] {
    background: green;
    height: 100%;
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
  <li class="{{ event.key }}">

    {{ eventCSS }}
    layer {{ layer }} asd
    {{ event.layer }}
    {{ event.time }}
  </li>
</template>

<script>
  import store from '../vuex/store';
  import { clone, uniq, map, each, filter } from 'lodash';

  class Event {
    constructor() {
      this.styleBlock = document.createElement('style');
    }

    // TODO: put in getter
    initGridCSS(events) {
      _.each(events, (item, index) => {
        let left = this.createPosition(item.time),
            key = item.key,
            css = this.createCSS('left', left);

        this.addGridStyleToHead(key, css);
      });
    }

    addGridStyleToHead(className, css) {
      // TODO: make .grid a constant
      this.styleBlock.innerHTML = this.styleBlock.innerHTML + `.grid .${className} ${css}\n`;
    }

    createPosition(time) {
      return time * 100 + '%';
    }

    createCSS(property, value) {
      return `{ ${property}: ${value} }`;
    }
  }

  var event = new Event();

  export default {
    store,
    init: () => {
      document.head.appendChild(event.styleBlock);
    },
    props: ['event'],
    vuex: {
      getters: {
        sequence: store => store.sequence,
        eventCSS: store => {
          event.initGridCSS(store.sequence);
        }
      }
    }
  }
</script>