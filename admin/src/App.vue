<template>
  <div id="app">
    <div id="nav">
      <router-link :key="$route.path"></router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
</style>
