<script setup lang="ts">
import PostList from "./components/PostList.vue";
import HistoryList from "./components/HistoryList.vue";
import {onMounted} from "vue";
import {fetchData} from "./dataService.ts";
import {Post, usePostsStore} from "./stores/posts.ts";

// const data = ref(null);
const store = usePostsStore();

onMounted(async () => {
    try {
        const res: Post[] = await fetchData();
        const firstFivePosts = res.slice(0, 5);
        store.addPosts(firstFivePosts);
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="page-wrapper items-start">
        <PostList/>
        <HistoryList/>
    </div>
</template>

<style scoped>
.page-wrapper {
    margin-inline: auto;
    max-width: 1600px;
    padding: 3.25rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
}
</style>
