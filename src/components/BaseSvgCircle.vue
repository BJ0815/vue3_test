<template>
  <circle :cx="particles.p.x" :cy="particles.p.y" r="3" fill="#FC309D"></circle>
</template>

<script>
import { defineComponent, onMounted, reactive, onUnmounted, ref } from "vue";
export default defineComponent({
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
  setup (props) {
    const particles = reactive(props.item)
    const id = ref(null)
    const move = function () {
        particles.p.x += Math.round(particles.v.x / 60);
        particles.p.y += Math.round(particles.v.y / 60);

        if (particles.hitsWallX()) {
          particles.v.x *= -1;
        }
        if (particles.hitsWallY()) {
          particles.v.y *= -1;
        }

      id.value = requestAnimationFrame(move);
    };

    onMounted(() => {
      move();
    });

    onUnmounted(() => {
      if(id.value) cancelAnimationFrame(id.value)
    })

    return {
      particles,
    }
  },
});
</script>

<style></style>
