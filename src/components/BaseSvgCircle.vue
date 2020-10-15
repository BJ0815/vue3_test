<template>
  <circle :cx="particles.p.x" :cy="particles.p.y" r="3" fill="#FC309D"></circle>
</template>

<script>
import { defineComponent, onMounted, reactive, onUnmounted, ref } from "vue";
import { Particle } from "./core";
export default defineComponent({
  setup (props) {
    const particles = reactive(new Particle())
    const move = function () {
        particles.p.x += Math.round(particles.v.x / 60);
        particles.p.y += Math.round(particles.v.y / 60);

        if (particles.hitsWallX()) {
          particles.v.x *= -1;
        }
        if (particles.hitsWallY()) {
          particles.v.y *= -1;
        }

    };
    return {
      particles,
      move
    }
  },
});
</script>

<style></style>
