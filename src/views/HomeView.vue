<template>
  <div
    class="grid overflow-hidden grid-cols-2 grid-rows-2 gap-2"
    v-for="doc in formattedList"
    :key="doc.id"
  >
    <ListView :playlist="doc" />
  </div>
</template>

<script setup>
import getCollection from "@/composables/getCollection";
import { computed } from "vue";
import { formatDistanceToNow } from "date-fns";
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
