<template>
  <div id="app">
    <canvas id="renderCanvas"></canvas>
    <div id="gui">
      <Narrative :babylon="babylon" />
    </div>
  </div>
</template>

<script>
import BabylonApp from './BabylonApp'
import Narrative from './components/Narrative.vue'
import script from './assets/scripts/script'

export default {
  name: 'App',
  components: { Narrative },
  data() {
    return {
      babylon: {},
    }
  },
  mounted() {
    this.babylon = new BabylonApp('renderCanvas')
  },
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

#renderCanvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}

#gui {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  pointer-events: none;
}
</style>
