<template>
    <section class="flex flex-col gap-4">
        <h2 class="font-semibold text-2xl"> Sortable Post List</h2>

        <ul>
            <PostItem v-for="(post, index) in store.posts" :post="post" :key="post.id" :index="index"
                      :total="postListLength"/>
        </ul>
    </section>
</template>

<script setup>
import PostItem from "./PostItem.vue";
import {computed} from "vue";
import {usePostsStore} from "../stores/posts.ts";

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
