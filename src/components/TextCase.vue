<template>
  <p>[目前總數]: {{ total }}</p>
  <input type="text" v-model="total" />
  <BaseSvgPlatform>
    <BaseSvgCircle
      v-for="(item, i) in elements"
      :key="i"
      :cx="item.p.x"
      :cy="item.p.y"
    ></BaseSvgCircle>
  </BaseSvgPlatform>
</template>

<script>
import { defineComponent } from "vue";
import { useRandomBubble, Particle } from "./core.js";
import BaseSvgCircle from "./core/BaseSvgCircle.vue";
import BaseSvgPlatform from "./core/BaseSvgPlatform.vue";

export default defineComponent({
  components: {
    BaseSvgCircle,
    BaseSvgPlatform,
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
