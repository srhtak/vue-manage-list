<script setup>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import ListView from "@/components/ListView.vue";

const { user } = getUser();
const { documents: playlists } = getCollection("playlists", [
  "userId",
  "==",
  user.value.uid,
]);
</script>

<template>
  <div>
    <h1>My Playlist</h1>
    <ListView :playlists="playlists" />
  </div>
</template>

<style lang="scss" scoped></style>
