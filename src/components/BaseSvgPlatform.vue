<template>
  <p>[目前總數]: {{ total }}</p>
  <input type="range" min="100" max="3500" :step="total" v-model="total" />
  <svg viewbox="-500 -500 1000 1000" class="scene">
    <BaseSvgCircle
      v-for="(item, i) in elements"
      :key="i"
      :ref="
        (el) => {
          divs[i] = el;
        }
      "
    ></BaseSvgCircle>
  </svg>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watchEffect,
  reactive,
  onBeforeUpdate,
  onUnmounted,
  onUpdated,
} from "vue";
import { useRandomBubble, Particle } from "./core";
import BaseSvgCircle from "./BaseSvgCircle.vue";

import Stats from "stats.js";

export default defineComponent({
  components: {
    BaseSvgCircle,
  },
  setup() {
    const { total, elements } = useRandomBubble();
    const divs = ref([]);
    let anime = null;

    const stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    const move = () => {
      stats.begin()
      for (let i = 0; i < +total.value; i++) {
        const elm = divs.value[i];
        if (elm) elm.move();
      }
      stats.end()
      anime = requestAnimationFrame(move);
    };

    // Make sure to reset the refs before each update.
    onBeforeUpdate(() => {
      divs.value = [];
      if (anime) cancelAnimationFrame(anime);
    });
    onUpdated(() => {
      move();
    });
    onMounted(() => {
      move()
      document.body.appendChild( stats.dom );
    });
    onUnmounted(() => {
      if (anime) cancelAnimationFrame(anime);
    });
    return {
      total,
      elements,
      divs,
    };
  },
});
</script>

<style lang="css" scoped>
.scene {
  display: block;
  margin: 0 auto;
  width: 500px;
  height: 500px;
  background: black;
}
</style>
