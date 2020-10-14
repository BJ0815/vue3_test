<template>
  <p>[目前總數]: {{ total }}</p>
  <input type="range" min="100" max="3500" :step="total" v-model="total" />
  <svg viewbox="-500 -500 1000 1000" class="scene">
    <BaseSvgCircle
      v-for="(item, i) in elements"
      :key="i"
      :item="item"
    ></BaseSvgCircle>
  </svg>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watchEffect, reactive } from "vue";
import { useRandomBubble, Particle } from "./core";
import BaseSvgCircle from "./BaseSvgCircle.vue";
export default defineComponent({
  components: {
    BaseSvgCircle
  },
  setup() {
    const { total, elements } = useRandomBubble();
    return {
      total,
      elements,
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
