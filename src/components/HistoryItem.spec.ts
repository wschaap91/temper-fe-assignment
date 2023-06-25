import {beforeEach, describe, expect, it, vi} from "vitest";
import {shallowMount, VueWrapper} from "@vue/test-utils";
import {PostsStore, usePostsStore} from "../stores/posts";
import HistoryItem from "./HistoryItem.vue";
import {createTestingPinia} from "@pinia/testing";
import {mockPostsOrderHistory} from "../mocks";

describe('History Item', () => {
    let wrapper: VueWrapper<any>
    let store: PostsStore

    beforeEach(() => {
        wrapper = shallowMount(HistoryItem, {
                plugins: [createTestingPinia({
                    createSpy: vi.fn
                })],
                propsData: {
                    history: mockPostsOrderHistory[0],
                    index: 0
                }
            }
        )
        store = usePostsStore();
    })

    it('Should call timeTravel', async () => {
        const mSpy = vi.spyOn(store, 'timeTravel')
        const button = wrapper.find('button')
        await button.trigger('click')
        expect(mSpy).toHaveBeenCalledWith(0)
    })
})
