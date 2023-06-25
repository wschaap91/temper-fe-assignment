import {createPinia, setActivePinia} from "pinia";
import {beforeEach, describe, expect, it} from "vitest";
import {Post, PostsStore, usePostsStore} from "./posts.ts";
import {mockPostsArray, mockPostsOrderHistory, mockSinglePost} from "../mocks.ts";

describe('Posts store', () => {

    let store: PostsStore

    beforeEach(() => {
        setActivePinia(createPinia())
        store = usePostsStore() as PostsStore
        store.posts = [...mockPostsArray] as Post[];
        store.postsOrderHistory = [];
    })

    it('Should add a post', () => {
        store.addPosts(mockSinglePost);
        expect(store.posts).toHaveLength(mockPostsArray.length + 1);
    })
    it('Should add multiple posts', () => {
        store.addPosts([...mockPostsArray]);
        expect(store.posts).toHaveLength(mockPostsArray.length * 2)
    })
    it('Should move post down', () => {
        store.movePost(1, 'DOWN');
        expect(store.postsOrderHistory).toHaveLength(1);
        const {postId, prevPostIndex, currPostIndex} = store.postsOrderHistory[0];
        expect(postId).equals(1);
        expect(prevPostIndex).equals(0);
        expect(currPostIndex).equals(1);
        expect(store.posts[1].id).equals(1);
    })
    it('Should move post up', () => {
        store.movePost(2, 'UP');
        expect(store.postsOrderHistory).toHaveLength(1);
        const {postId, prevPostIndex, currPostIndex} = store.postsOrderHistory[0];
        expect(postId).equals(2);
        expect(prevPostIndex).equals(1);
        expect(currPostIndex).equals(0);
        expect(store.posts[0].id).equals(2);
    })
    it('Should throw error on invalid postId move', () => {
        expect(() => {
            store.movePost(6, 'UP');
        }).toThrowError();
        expect(store.postsOrderHistory).toHaveLength(0);
        expect(store.posts).toEqual(mockPostsArray);
    })
    it('Should ignore invalid post move down', () => {
        store.movePost(5, 'DOWN');
        expect(store.postsOrderHistory).toHaveLength(0);
        expect(store.posts).toEqual(mockPostsArray);
    })
    it('Should ignore invalid post move up', () => {
        store.movePost(1, 'UP');
        expect(store.postsOrderHistory).toHaveLength(0);
        expect(store.posts).toEqual(mockPostsArray);
    })
    it('Should time travel', () => {
        store.postsOrderHistory = [...mockPostsOrderHistory];
        store.timeTravel(1);
        expect(store.postsOrderHistory).toHaveLength(1);
        expect(store.posts[0].id).toBe(2);
    })
    it('Should ignore invalid time travel', () => {
        store.postsOrderHistory = [...mockPostsOrderHistory];
        store.timeTravel(-1);
        store.timeTravel(mockPostsOrderHistory.length);
        expect(store.postsOrderHistory).toHaveLength(mockPostsOrderHistory.length);
        expect(store.posts).toEqual(mockPostsArray);
    })
})
