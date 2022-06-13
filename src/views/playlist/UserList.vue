<script setup>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import ListView from "@/components/ListView.vue";
import Spinner from "@/components/Spinner.vue";

const { user } = getUser();
const { documents: playlists } = getCollection("playlists", [
  "userId",
  "==",
  user.value.uid,
]);
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold px-6">My Playlist</h1>
    <div
      v-if="playlists"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-8"
    >
      <ListView :playlists="playlists" />
    </div>
    <div v-else>
      <Spinner />
    </div>
    <router-link
      class="bg-blue-400 text-white px-8 py-3 mx-8 rounded-sm shadow-lg hover:bg-blue-500"
      :to="{ name: 'CreatePlayList' }"
      >Create a new list</router-link
    >
  </div>
</template>

<style lang="scss" scoped></style>
