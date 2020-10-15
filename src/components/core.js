import { computed, reactive, ref, watchEffect } from "vue";

const round = Math.round,
  abs = Math.abs,
  pow = Math.pow,
  sqrt = Math.sqrt,
  PI = Math.PI,
  sin = Math.sin,
  cos = Math.cos,
  u = 50,
  vb_w = ~~1000,
  vb_h = ~~1000,
  vb_x = ~~-500,
  vb_y = ~~-500;

const rand = function (max, min) {
  const b = !max && max !== 0 ? 1 : max,
    a = min || 0;

  return a + (b - a) * Math.random();
};
export const useRandomBubble = () => {
  const total = ref(100);

  const elements = computed(() => Array(+total.value).fill(0))

  return {
    total,
    elements
  };
};

export const Particle = function (r, p, m, v) {
  var a = PI * rand(2),
    va = rand(10, 3) * u;

  this.r = 3;
  this.p = p || {
    x: round(rand(vb_w - 4 * this.r) - vb_w / 2),
    y: round(rand(vb_h - 4 * this.r) - vb_h / 2),
  };
  this.m = m || rand(10, 1);
  this.v = v || {
    x: va * cos(a),
    y: va * sin(a),
  };

  this.d = function (b) {
    return sqrt(pow(this.p.x - b.p.x, 2) + pow(this.p.y - b.p.y, 2));
  };

  this.dx = function (x) {
    return abs(this.p.x - x);
  };

  this.dy = function (y) {
    return abs(this.p.y - y);
  };

  this.hitsWallX = function () {
    return this.dx(vb_x) <= 2 * this.r || this.dx(vb_w + vb_x) <= 2 * this.r;
  };

  this.hitsWallY = function () {
    return this.dy(vb_y) <= 2 * this.r || this.dy(vb_h + vb_y) <= 2 * this.r;
  };
};
