import { onBeforeUpdate, onMounted, onUnmounted, onUpdated, reactive, ref, watch } from "vue";

import Stats from "stats.js";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

const MAX_X = 800;
const MAX_Y = 600;

export const useRandomBubble = () => {
  const total = ref(100);
  const elements = ref(
    Array(+total.value)
      .fill(0)
      .map(() => {
        return reactive(new Particle());
      })
  );
  let anime = null;
  const cancelAnime = () => anime && window.cancelAnimationFrame(anime);
  const move = () => {
    stats.begin();
    for (let i = 0; i < +total.value; i++) {
      const particles = elements.value[i];
      if (particles) {
        if (particles.hitsWallX()) particles.v.x *= -1;
        if (particles.hitsWallY()) particles.v.y *= -1;
        particles.p.y += particles.v.y;
        particles.p.x += particles.v.x;
      }
    }
    stats.end();
  };

  const render = () => {
    cancelAnime();
    anime = window.requestAnimationFrame(render);
    move();
  };
  watch(total, (count) => {
    elements.value = Array(+count)
      .fill(0)
      .map(() => {
        return reactive(new Particle());
      });
    render();
  });

  onMounted(() => {
    render();
    document.body.appendChild(stats.dom);
  });
  onUnmounted(() => {
    cancelAnime();
  });

  return {
    total,
    elements,
  };
};

export const Particle = function () {
  this.r = 3;
  this.p = {
    x: Math.random() * MAX_X,
    y: Math.random() * MAX_Y,
  };
  this.v = {
    x: 4 * Math.random() - 2,
    y: 4 * Math.random() - 2,
  };

  this.hitsWallX = function () {
    return this.p.x > MAX_X || this.p.x < 0;
  };

  this.hitsWallY = function () {
    return this.p.y > MAX_Y || this.p.y < 0;
  };
};
