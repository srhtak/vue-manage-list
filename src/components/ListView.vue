<script setup>
const props = defineProps(["playlists"]);
</script>

<template>
  <div
    class="block overflow-hidden rounded-2xl shadow-lg"
    v-auto-animate
    v-for="playlist in playlists"
    :key="playlist.id"
  >
    <router-link :to="{ name: 'ListDetail', params: { id: playlist.id } }">
      <img class="object-cover w-full h-56" :src="playlist.coverUrl" />

      <div class="p-4 bg-gray-900">
        <p class="text-xs text-gray-500">{{ playlist.userName }}</p>

        <h5 class="text-sm text-white">
          {{ playlist.title }}
        </h5>

        <div class="flex justify-between">
          <p class="mt-1 text-xs text-gray-500">
            {{ playlist.description }}
          </p>
          <p class="text-green-400">Songs: {{ playlist.songs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>
