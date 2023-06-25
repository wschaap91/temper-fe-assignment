export function swapArrayItems<T>(array: T[], indexA: number, indexB: number): T[] {
    // Check if the indices are valid
    if (
        indexA < 0 ||
        indexA >= array.length ||
        indexB < 0 ||
        indexB >= array.length
    ) {
        throw new Error('Invalid indices provided');
    }


    //Create a copy of the original array
    const newArray = [...array];

    // Swap the items using array destructuring
    [newArray[indexA], newArray[indexB]] = [newArray[indexB], newArray[indexA]];

    //Return the new instance of the array
    return newArray;
}

export type EdgePosition = "FIRST" | "LAST" | false;

export function getArrayEdge(index: number, arrayLength: number): EdgePosition {
    if (index === 0) {
        return "FIRST"
    } else if (index === (arrayLength - 1)) {
        return "LAST"
    } else {
        return false;
    }
}
