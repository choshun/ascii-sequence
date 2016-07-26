<style scoped lang="sass">
	$ease: cubic-bezier(.23, 1, .32, 1);
  $width: 5;

  li[class*="event"] {
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 1) 0%, rgba(35, 128, 91, 0.8) 100%);
    border: 1px solid rgb(10, 168, 204);
    height: 101%;
    position: absolute;
    bottom: 0;
    transition: all .5s $ease;
    width: $width * 1px;
    margin-left: $width/2 * -1px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 2;

    &.is-active {
      // background: -webkit-linear-gradient(top, rgba(255, 255, 255, 1) 0%, rgba(35, 128, 91, 0.8) 100%);
      // border:1px solid transparent;
      height: 150%;
      bottom: -10%;
      margin-left: ($width) * -1px;
      width: ($width * 2) * 1px;
    }

    &.is-selected {
      border: 1px solid rgb(0, 255, 159);
    }
  }
</style>

<template>
  <li id="{{ event.key }}" class="event {{ isActive(activeStyle, event.key) }} {{ isSelected(event.selected) }}" @click="selectStyle($event, event)"><!-- {{event.selected}} -->
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
          dispatch('CLEAR_SELECTED_EVENTS', [eventData.key]);
          dispatch('SET_SELECTED_EVENTS', [eventData.key]);
        }
      }
    },
    methods: {
      isActive: (activeStyle, eventClass) => {
        return (activeStyle === eventClass) ? 'is-active' : '';
      },
      isSelected: (isSelected) => {
        return isSelected ? 'is-selected' : '';
      }
    }
  }
</script>