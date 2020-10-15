<template>
  <circle :cx="cx" :cy="cy" r="3" fill="#FC309D"></circle>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: ['cx', 'cy']
});
</script>

<style></style>
