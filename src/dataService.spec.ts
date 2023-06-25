import {mockPostsArray} from "./mocks.ts"
import {describe, expect, it, vi} from "vitest"
import {fetchPosts} from "./dataService.ts"

const MOCK_POSTS = [...mockPostsArray];
const ERROR_MESSAGE = 'No response'

//@ts-ignore
global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve(MOCK_POSTS)
}))

describe('Data service', () => {
    let posts;

    it('Should throw an error', async () => {
        //@ts-ignore
        fetch.mockRejectedValueOnce(new Error(ERROR_MESSAGE));
        try {
            await fetchPosts();
            expect.fail('Expect an error to be thrown')
        } catch (e) {
            if (e instanceof Error) {
                expect(e.message).toBe(ERROR_MESSAGE);
            }
        }
    })

    it('Should fetch posts', async () => {
        posts = await fetchPosts();
        expect(posts).toHaveLength(5);
    })
})
