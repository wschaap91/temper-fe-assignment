import {Post} from "./stores/posts.ts";

export async function fetchPosts(): Promise<Post[]> {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await res.json();
    } catch (error) {
        throw error;
    }
}

