<script setup>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import Spinner from "@/components/Spinner.vue";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestap } from "@/firebase/config";

const { filePath, url, uploadImage } = useStorage();
const { error, addDoc } = useCollection("playlist");
const { user } = getUser();

const isPending = ref(false);
const title = ref("");
const description = ref("");
const file = ref(null);
const fileError = ref(null);

// allowed file types
const types = ["image/png", "image/jpeg"];

const handleFile = (e) => {
  const selected = e.target.files[0];
  console.log(selected);
  if (selected && types.includes(selected.type)) {
    file.value = selected;
    fileError.value = "";
  }
};

const handleSubmit = async () => {
  if (file.value) {
    isPending.value = true;
    await uploadImage(file.value);
    await addDoc({
      title: title.value,
      description: description.value,
      userId: user.value.uid,
      userName: user.value.displayName,
      coverUrl: url.value,
      filePath: filePath.value,
      songs: [],
      createdAt: timestap(),
    });
    isPending.value = false;
    if (!error.value) {
      console.log("playlist added");
    }
    console.log("image uploaded, url:", url.value);
    title.value = "";
    description.value = "";
    file.value = null;
    fileError.value = null;
  }
};
</script>

<template>
  <div class="w-full h-screen flex flex-col mt-8 justify-start items-center">
    <h1
      class="font-extrabold tracking-wide text-4xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
    >
      Create Playlist
    </h1>
    <form
      @submit.prevent="handleSubmit"
      class="w-2/3 backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black/10"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
          Title
        </label>
        <input
          class="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="title"
          type="text"
          required
          placeholder="List Title"
        />
      </div>
      <div class="mb-4">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >Description</label
        >
        <textarea
          v-model="description"
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Playlist description"
        ></textarea>
      </div>
      <div class="mb-4">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="user_avatar"
          >Upload file</label
        >
        <input
          @change="handleFile"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
        />
        <h2 class="text-red-500">
          {{ fileError }}
        </h2>
      </div>
      <div class="flex justify-center items-center">
        <button v-if="!isPending" class="bg-white hover:bg-gray-100 px-8">
          Create
        </button>
        <div v-else>
          <Spinner />
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
