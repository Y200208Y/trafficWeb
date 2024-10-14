<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
html {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  /* background: red; */
}
#app {
  margin: 0px !important;
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background: red; */
}
/* 滚动条宽度 */
div::-webkit-scrollbar {
  width: 6px;
}
/* 滚动条轨道 */
div::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
/* 小滑块 */
div::-webkit-scrollbar-thumb {
  background: #40a0ff49;
  border-radius: 10px;
}
div::-webkit-scrollbar-thumb:hover {
  background: #40a0ff;
}
</style>
