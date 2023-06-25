<template>
  <li class="post-item o-card">
    <p class="text-xl">Post {{ props.post.id }}</p>
    <span class="post-item__icons" :class="{'self-stretch': !edge}">
            <button v-if="!(edge === 'FIRST')"
                    :aria-label="`Move post ${post.id} up`"
                    :title="`Move post ${post.id} up`"
                    class="post-item__button"
                    @click.prevent="store.movePost(props.post.id, 'UP')">
              <i class="fa-solid fa-chevron-up fa-sm"></i>
            </button>
            <button v-if="!(edge === 'LAST')"
                    :aria-label="`Move post ${post.id} down`"
                    :title="`Move post ${post.id} down`"
                    class="post-item__button"
                    @click.prevent="store.movePost(props.post.id, 'DOWN')">
              <i class="fa-solid fa-chevron-down fa-sm"></i>
            </button>
        </span>
  </li>
</template>

<script setup lang="ts">
import {Post, usePostsStore} from "../stores/posts.ts";
import {EdgePosition} from "../utilities.ts";

interface PostItemProps {
  post: Post;
  edge?: EdgePosition;
}

const store = usePostsStore();

const props = defineProps<PostItemProps>();
</script>

<style scoped lang="scss">
.post-item {
  @apply p-3 bg-white flex items-center justify-between min-h-[6.2rem];
}

.post-item__button {
  @apply -my-2 p-2 leading-none text-lavender-500;
  @apply hover:bg-lavender-200;
  transition: all 0.1s ease;
  border-radius: var(--default-border-radius)
}

.post-item__icons {
  @apply flex flex-col justify-between;
}

</style>
