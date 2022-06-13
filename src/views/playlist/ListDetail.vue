<script setup>
import getDocument from "@/composables/getDocument";
import Spinner from "@/components/Spinner.vue";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import { useRouter } from "vue-router";
import { computed } from "vue";
import AddSong from "../../components/addSong.vue";

const props = defineProps(["id"]);
const router = useRouter();

const { user } = getUser();
const { error, document: playlist } = getDocument("playlists", props.id);
const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
const { deleteImage } = useStorage();

const ownerShip = computed(() => {
  return (
    playlist.value && user.value && user.value.uid === playlist.value.userId
  );
});

const handleDelete = async () => {
  await deleteImage(playlist.value.filePath);
  await deleteDoc();
  router.push({ name: "Home" });
};

const deleteSong = async (id) => {
  let filterSongs = playlist.value.songs.filter((song) => song.id !== id);
  await updateDoc({ songs: [...filterSongs] });
};
</script>

<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details m-8">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2 class="text-2xl text-blue-500">{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button
        v-if="ownerShip"
        class="bg-red-500 mt-3 px-6 py-3 hover:bg-red-400 text-white rounded-md shadow-md"
        @click="handleDelete"
      >
        Delete Playlist
      </button>
    </div>

    <!-- song list -->
    <div v-auto-animate class="song-list">
      <div
        class="bg-white rounded-md m-2 shadow-lg flex flex-col justify-start"
        v-auto-animate
        v-for="song in playlist.songs"
        :key="song.id"
      >
        <div class="flex justify-between items-center p-1">
          <div class="flex flex-col justify-start items-start p-3">
            <h2 class="text-xl font-extrabold">{{ song.title }}</h2>
            <h3 class="text-lg font-bold">{{ song.artist }}</h3>
          </div>
          <button
            @click="deleteSong(song.id)"
            class="bg-red-400 hover:bg-red-300 text-white rounded-md shadow-xl px-2 mr-2"
          >
            Delete
          </button>
        </div>
      </div>
      <AddSong v-if="ownerShip" :playlist="playlist" />
    </div>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 14px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #000;
  font-weight: 700;
}
</style>
