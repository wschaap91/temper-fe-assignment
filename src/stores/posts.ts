import {ref, computed} from 'vue'
import type {Ref, ComputedRef} from 'vue'
import {defineStore} from 'pinia'
import {swapArrayItems} from "../utilities.ts";

type Direction = 'UP' | 'DOWN';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type PostOrder = Post['id'][];

export interface PostOrderHistory {
    postId: number;
    postOrder: PostOrder;
    prevPostIndex: number;
    currPostIndex: number;
}

export const usePostsStore = defineStore('posts', () => {
    const posts: Ref<Post[]> = ref([]);
    const postsOrderHistory: Ref<PostOrderHistory[]> = ref([]);

    const postsOrder: ComputedRef<PostOrder> = computed(() => {
        return posts.value.map(post => post.id);
    })

    function addPosts(data: Post | Post[]) {
        if (Array.isArray(data)) {
            data.forEach(post => {
                posts.value.push(post);
            })
        } else {
            posts.value.push(data);
        }
    }

    function isValidPostId(id: number): id is Post['id'] {
        return posts.value.some(post => post.id === id);
    }

    function movePost(postId: number, direction: Direction) {
        const postIndex = postsOrder.value.indexOf(postId);
        if (postIndex === -1) {
            // console.log(`Post with ID ${postId} does not exist.`);
            throw new Error(`Post with ID ${postId} does not exist`);
        }
        let newPostIndex: number = -1;
        if (direction === 'UP') {
            newPostIndex = postIndex - 1;
        }
        if (direction === 'DOWN') {
            newPostIndex = postIndex + 1;
        }
        if (newPostIndex !== -1 && newPostIndex < posts.value.length) {
            const prevPostOrder: PostOrder = [...postsOrder.value];
            posts.value = swapArrayItems(posts.value, postIndex, newPostIndex);
            addPostOrderHistory({
                postId,
                prevPostIndex: postIndex,
                currPostIndex: newPostIndex,
                postOrder: prevPostOrder
            })
        }
    }

    function addPostOrderHistory(obj: PostOrderHistory) {
        postsOrderHistory.value.push(obj);
    }

    function sortPosts(order: PostOrder) {
        const checkedOrder = order.filter(id => isValidPostId(id));
        const orderedPosts = checkedOrder.map((id) => {
            return posts.value.find(post => post.id === id) as Post;
        })

        posts.value = orderedPosts;
    }

    function timeTravel(index: number) {
        if (index < 0 || index > postsOrderHistory.value.length - 1) {
            return;
        }
        sortPosts(postsOrderHistory.value[index].postOrder);
        postsOrderHistory.value = postsOrderHistory.value.slice(0, index);
    }

    return {posts, postsOrderHistory, postsOrder, addPosts, movePost, timeTravel}
})

export type PostsStore = ReturnType<typeof usePostsStore>
