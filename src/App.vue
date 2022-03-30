<template>
  <div id="app">
    <h3 @click="demoClick">crud-demo</h3>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { throttle } from "./utils";

export default defineComponent({
  name: 'app',
  setup() {
    const demoLog = () => {
      console.log('This is demo click.');
    }

    const demoClick = throttle(demoLog, 1000);

    return {
      demoClick
    }
  }
})

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
