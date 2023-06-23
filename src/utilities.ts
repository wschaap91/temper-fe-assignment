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
