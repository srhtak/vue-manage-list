<script setup>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";
import Spinner from "@/components/Spinner.vue";

const { error, signup, isPending } = useSignup();

const displayName = ref("");
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await signup(email.value, password.value, displayName.value);

  if (!error.value) {
    console.log("user sign up");
  }
};
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <h1 class="text-2xl font-extrabold mb-3">Sign up</h1>
    <form @submit.prevent="handleSubmit" class="w-1/3">
      <input type="text" v-model="displayName" placeholder="Fullname" />
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <div class="flex justify-center items-center">
        <button v-if="!isPending">Sign up</button>
        <div v-else>
          <Spinner />
        </div>
      </div>
      <div class="text-red-400 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
