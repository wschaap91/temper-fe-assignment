<template>
  <section class="flex flex-col gap-6">
    <h2 class="text-white font-semibold text-3xl">Sortable Post List</h2>

    <TransitionGroup tag="ul" name="list" v-if="store.posts.length">
      <PostItem v-for="(post, index) in store.posts" :post="post" :key="post.id"
                :edge="getArrayEdge(index, postListLength)"/>
    </TransitionGroup>
    <div class="o-card p-4 bg-white flex align-center justify-between" v-else>
      <p>No posts have been loaded</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import PostItem from "./PostItem.vue";
import {computed} from "vue";
import {usePostsStore} from "../stores/posts.ts";
import {getArrayEdge} from '../utilities.ts'

const store = usePostsStore();
const postListLength = computed(() => store.posts.length);
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
  gap: 28px;
  list-style: none;
  padding-inline-start: 0;
}
</style>
