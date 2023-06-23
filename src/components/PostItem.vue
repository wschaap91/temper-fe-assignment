<template>
    <li class="post-item o-card p-4 bg-white flex items-center justify-between">
        <p>Post {{ props.post.id }}</p>
        <span class="flex flex-col justify-between text-indigo-500" :class="{'self-stretch': !(first || last)}">
            <i @click.prevent="store.movePost(props.post.id, 'UP')" v-if="!first"
               class="fa-solid fa-chevron-up fa-xs cursor-pointer"></i>
            <i @click.prevent="store.movePost(props.post.id, 'DOWN')" v-if="!last"
               class="fa-solid fa-chevron-down fa-xs cursor-pointer"></i>
        </span>
    </li>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {Post, usePostsStore} from "../stores/posts.ts";

interface PostItemProps {
    post: Post;
    index: number;
    total: number;
}

const store = usePostsStore();

const props = defineProps<PostItemProps>();

const first = computed(() => props.index === 0);
const last = computed(() => props.index === (props.total - 1));
</script>

<style scoped lang="scss">
.post-item {
  min-height: 5rem;
}
</style>
