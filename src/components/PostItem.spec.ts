import {beforeEach, describe, expect, it, vi} from "vitest";
import {shallowMount, VueWrapper} from "@vue/test-utils";
import {PostsStore, usePostsStore} from "../stores/posts";
import PostItem from "./PostItem.vue";
import {createTestingPinia} from "@pinia/testing";
import {mockPostsArray, mockSinglePost} from "../mocks";

describe('Post Item', () => {
    let wrapper: VueWrapper<any>
    let store: PostsStore

    beforeEach(() => {
        wrapper = shallowMount(PostItem, {
                plugins: [createTestingPinia({
                    createSpy: vi.fn
                })],
                propsData: {
                    post: mockSinglePost,
                    edge: false
                }
            }
        )
        store = usePostsStore();
        store.posts = [...mockPostsArray]
    })

    it('Should call move down', async () => {
        const mSpy = vi.spyOn(store, 'movePost')
        const downButton = wrapper.findAll('button').at(1);
        await downButton.trigger('click')
        expect(mSpy).toHaveBeenCalledWith(1, "DOWN");
    })

    it('Should call move up', async () => {
        const mSpy = vi.spyOn(store, 'movePost')
        const downButton = wrapper.findAll('button').at(0);
        await downButton.trigger('click')
        expect(mSpy).toHaveBeenCalledWith(1, "UP");
    })

    it('Should have only down button', async () => {
        const mSpy = vi.spyOn(store, 'movePost')
        await wrapper.setProps({edge: 'FIRST'});
        const buttons = wrapper.findAll('button');
        expect(buttons).toHaveLength(1);
        await buttons.at(0).trigger('click')
        expect(mSpy).toHaveBeenCalledWith(1, 'DOWN')
    })
    it('Should have only up button', async () => {
        const mSpy = vi.spyOn(store, 'movePost')
        await wrapper.setProps({edge: 'LAST'});
        const buttons = wrapper.findAll('button');
        expect(buttons).toHaveLength(1);
        await buttons.at(0).trigger('click')
        expect(mSpy).toHaveBeenCalledWith(1, 'UP')
    })
})
