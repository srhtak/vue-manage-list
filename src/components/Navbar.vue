<script setup>
import { ref } from "vue";
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

const router = useRouter();
const isMenuOpen = ref(false);
const { error, logout } = useLogout();
const { user } = getUser();

const handleLogout = async () => {
  await logout();
  if (!error.value) {
    router.push({ name: "Login" });
    console.log("logout");
  }
};
</script>

<template>
  <div
    class="backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black/20 m-3 rounded-2xl shadow-lg"
  >
    <div
      class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
    >
      <div class="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
        <ul class="flex items-center hidden space-x-8 lg:flex">
          <li>
            <router-link
              :to="{ name: 'Home' }"
              aria-label="Home"
              title="Home"
              class="font-bold text-xl tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >Playlist</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'CreatePlayList' }"
              aria-label="Create List"
              title="Create"
              class="font-bold text-xl tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >Create</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'UserList' }"
              aria-label="User List"
              title="Create"
              class="font-bold text-xl tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >My List</router-link
            >
          </li>
        </ul>
        <a
          href="/"
          aria-label="Company"
          title="Company"
          class="inline-flex items-center lg:mx-auto"
        >
          <span
            class="ml-2 text-xl font-bold tracking-wide text-white uppercase"
            >Vuelist</span
          >
        </a>
        <ul
          v-if="!user"
          class="flex items-center hidden ml-auto space-x-8 lg:flex"
        >
          <li>
            <router-link
              :to="{ name: 'Login' }"
              aria-label="Sign in"
              title="Sign in"
              class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-blue-400"
              >Sign in</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'Signup' }"
              class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-400 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Sign up
            </router-link>
          </li>
        </ul>
        <div class="flex items-center hidden ml-auto space-x-8 lg:flex" v-else>
          <button
            @click="handleLogout"
            class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-400 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
            aria-label="Sign up"
            title="Sign up"
          >
            Logout
          </button>
        </div>
        <!-- Mobile menu -->
        <div class="ml-auto lg:hidden">
          <button
            @click="isMenuOpen = true"
            aria-label="Open Menu"
            title="Open Menu"
            class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
          >
            <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              ></path>
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              ></path>
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              ></path>
            </svg>
          </button>
          <div v-if="isMenuOpen" class="absolute top-0 left-0 w-full">
            <div class="p-5 bg-white border rounded shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <a
                    href="/"
                    aria-label="Company"
                    title="Company"
                    class="inline-flex items-center"
                  >
                    <span
                      class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase"
                      >Vuelist</span
                    >
                  </a>
                </div>
                <div>
                  <button
                    @click="isMenuOpen = false"
                    aria-label="Close Menu"
                    title="Close Menu"
                    class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  >
                    <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <nav>
                <ul class="space-y-4">
                  <li>
                    <a
                      href="/"
                      aria-label="Our product"
                      title="Our product"
                      class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >Product</a
                    >
                  </li>
                  <li>
                    <a
                      href="/"
                      aria-label="Our product"
                      title="Our product"
                      class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >Features</a
                    >
                  </li>
                  <li>
                    <a
                      href="/"
                      aria-label="Product pricing"
                      title="Product pricing"
                      class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >Pricing</a
                    >
                  </li>
                  <li>
                    <a
                      href="/"
                      aria-label="Sign in"
                      title="Sign in"
                      class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >Sign in</a
                    >
                  </li>
                  <li>
                    <a
                      href="/"
                      class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      aria-label="Sign up"
                      title="Sign up"
                    >
                      Sign up
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
