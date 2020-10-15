<template>
  <svg class="scene">
    <slot></slot>
  </svg>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
});
</script>

<style lang="css" scoped>
.scene {
  display: block;
  margin: 20px auto;
  width: 800px;
  height: 600px;
  background: black;
}
</style>
