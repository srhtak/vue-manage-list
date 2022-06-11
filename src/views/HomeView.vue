<template>
  <div v-if="formattedList" class="grid grid-cols-3 gap-10 p-8">
    <ListView :playlists="formattedList" />
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script setup>
import getCollection from "@/composables/getCollection";
import { computed } from "vue";
import { formatDistanceToNow } from "date-fns";
import Spinner from "@/components/Spinner.vue";
import ListView from "../components/ListView.vue";

const { error, documents } = getCollection("playlist");

const formattedList = computed(() => {
  if (documents.value) {
    return documents.value.map((doc) => {
      let time = formatDistanceToNow(doc.createdAt.toDate());
      return { ...doc, createdAt: time };
    });
  }
});
</script>
