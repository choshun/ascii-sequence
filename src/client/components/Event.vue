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
  <li id="{{ event.key }}" class="event {{ isActive(activeStyle, event.key) }}" @click="selectStyle($event, event)">
    {{ event.layer }}
    {{ event.time }}
    {{ event.data }}
  </li>
</template>

<script>
  import store from '../vuex/store';

  export default {
    store,
    props: ['event'],
    vuex: {
      getters: {
        activeStyle: store => store.styleManager.active[0].key
      },
      actions: {
        selectStyle: ({ dispatch }, event, eventData) => {
          dispatch('SET_ACTIVE_STYLE', eventData.key);
        }
      }
    },
    methods: {
      isActive: (activeStyle, eventClass) => {
        return (activeStyle === eventClass) ? 'is-active' : '';
      }
    }
  }
</script>