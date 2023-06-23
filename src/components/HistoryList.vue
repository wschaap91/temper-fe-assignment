<template>
    <section class="o-card flex flex-col">
        <div class="bg-white p-4">
            <h2 class="text-2xl font-semibold">List of actions committed</h2>
        </div>
        <div class="p-4 bg-neutral-100">
            <ul v-if="store.postsOrderHistory.length" class="o-card bg-white divide-y">
                <HistoryItem v-for="(history, index) in store.postsOrderHistory" :index="index" :history="history"
                             :key="history.postId"/>
            </ul>
            <p v-else class="o-card bg-white p-2">
                No actions taken yet.
            </p>
        </div>
    </section>
</template>

<script setup>
import HistoryItem from "./HistoryItem.vue";
import {usePostsStore} from "../stores/posts.ts";

const store = usePostsStore();

</script>

<style lang="scss" scoped>
</style>

