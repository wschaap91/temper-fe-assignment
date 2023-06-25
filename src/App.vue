<script setup lang="ts">
import PostList from "./components/PostList.vue";
import HistoryList from "./components/HistoryList.vue";
import {onMounted, onUnmounted} from "vue";
import {fetchPosts} from "./dataService.ts";
import {usePostsStore} from "./stores/posts.ts";

// const data = ref(null);
const store = usePostsStore();

let fetchInterval;

const populateStore = async () => {
  if (store.posts.length) {
    return;
  }
  try {
    const res = await fetchPosts();
    const firstFivePosts = res.slice(0, 5);
    store.addPosts(firstFivePosts);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  populateStore();
  fetchInterval = setInterval(populateStore, 5000);
});
onUnmounted(() => clearInterval(fetchInterval));
</script>

<template>
  <div class="page-wrapper items-start">
    <PostList/>
    <HistoryList/>
  </div>

  <div class="flex justify-center mb-6">
    <p class="text-gray-300">Copyright Koffie met Schaap | Wouter Schaap 2023</p>
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper {
  margin-inline: auto;
  max-width: 1600px;
  padding: 3.25rem;
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 4rem;

  @media screen and (min-width: 900px) {
    grid-template-rows: 1fr;
    gap: 6rem;
    grid-template-columns: repeat(2, 1fr);
  }

  &:before {
    display: block;
    content: "";
    width: 100%;
    height: 250px;
    position: absolute;
    top: 0;
    left: 0;
    clip-path: polygon(0 0, 0% 100%, 100% 0);
    z-index: -1;
    @apply bg-lavender-500;
  }
}
</style>
