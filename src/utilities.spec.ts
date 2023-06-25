import {swapArrayItems, getArrayEdge} from "./utilities";
import {describe, expect, it} from "vitest";
import {mockSwapArray} from "./mocks";

describe('Utilities', () => {
    describe('Swap array items', () => {
        it('Should swap items', () => {
            const newArr = swapArrayItems(mockSwapArray, 0, 1);
            expect(newArr).toEqual(['b', 'a', 'c']);
        })
        it('Should throw error', () => {
            expect(() => {
                swapArrayItems(mockSwapArray, -1, 1);
            }).toThrowError();
            expect(() => {
                swapArrayItems(mockSwapArray, 3, 1);
            }).toThrowError();
        })
    })
    describe('Get array edge', () => {
        it('Should return first', () => {
            expect(getArrayEdge(0, 3)).toBe('FIRST');
        })
        it('Should return last', () => {
            expect(getArrayEdge(2, 3)).toBe('LAST');
        })
        it('Should return false', () => {
            expect(getArrayEdge(1, 3)).toEqual(false);
        })
    })
});
