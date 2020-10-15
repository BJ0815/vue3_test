<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Vue 3.0" />
  <BaseSvgPlatform></BaseSvgPlatform>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BaseSvgPlatform from "./components/BaseSvgPlatform.vue";

export default {
  name: 'App',
  components: {
    HelloWorld,
    BaseSvgPlatform
  }
}
</script>
