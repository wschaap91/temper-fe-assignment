<template>
  <li class="flex justify-between p-3 gap-4 items-center">
    <p>Moved post {{ props.history.postId }} from index {{ props.history.prevPostIndex }} to index
      {{ props.history.currPostIndex }}</p>
    <button class="c-button" @click.prevent="store.timeTravel(index)">Time travel</button>
  </li>
</template>

<script setup lang="ts">
import {PostOrderHistory, usePostsStore} from '../stores/posts.js';

const store = usePostsStore();

interface HistoryItemProps {
  history: PostOrderHistory,
  index: number
}

const props = defineProps<HistoryItemProps>();
</script>
