<template>
  <div class="add-song">
    <button
      class="bg-blue-500 text-white px-6 py-4"
      v-if="!showForm"
      @click="showForm = true"
    >
      Add Songs
    </button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4 class="text-xl font-bold">Add a New song</h4>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button class="bg-blue-500 text-white py-3 px-6">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import useDocument from "@/composables/useDocument";
const props = defineProps(["playlist"]);

const title = ref("");
const artist = ref("");
const showForm = ref(false);

const { updateDoc } = useDocument("playlists", props.playlist.id);

const handleSubmit = async () => {
  const newSong = {
    title: title.value,
    artist: artist.value,
    id: Math.floor(Math.random() * 1000000),
  };

  await updateDoc({
    songs: [...props.playlist.songs, newSong],
  });

  title.value = "";
  artist.value = "";
};
</script>

<style lang="scss" scoped>
.add-song {
  margin-top: 40px;
  text-align: center;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
