<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <router-view></router-view>
</template>

<style lang="scss">
html {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
}
</style>
