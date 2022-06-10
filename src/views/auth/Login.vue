<script setup>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
import Spinner from "@/components/Spinner.vue";

const { error, login, isPending } = useLogin();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await login(email.value, password.value);

  if (!error.value) {
    console.log("user login");
  } else {
    console.log(error.value);
  }
};
</script>

<template>
  <div class="w-full h-screen flex flex-col mt-14 justify-start items-center">
    <h1
      class="font-extrabold tracking-wide text-4xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
    >
      Log In
    </h1>
    <form
      @submit.prevent="handleSubmit"
      class="w-2/3 backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black/10"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          v-model="email"
          type="text"
          required
          placeholder="john@doe.com"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold" for="username">
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          v-model="password"
          required
          type="password"
          placeholder="Password"
        />
      </div>
      <div class="flex justify-center items-center">
        <button class="bg-white px-6" v-if="!isPending">Log in</button>
        <div v-else>
          <Spinner />
        </div>
      </div>
      <div class="text-red-700 mt-3 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
