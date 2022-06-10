<script setup>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
import Spinner from "@/components/Spinner.vue";

const { error, login } = useLogin();

const email = ref("");
const password = ref("");
const btn = ref(true);

const handleSubmit = async () => {
  btn.value = false;
  await login(email.value, password.value);

  if (!error.value) {
    console.log("user login");
    btn.value = true;
  } else {
    console.log(error.value);
    btn.value = true;
  }
};
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <h1 class="text-2xl font-extrabold mb-3">Log In</h1>
    <form @submit.prevent="handleSubmit" class="w-1/3">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <div class="flex justify-center items-center">
        <button v-if="btn">Log in</button>
        <div v-else>
          <Spinner />
        </div>
      </div>
      <div class="text-red-400 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
