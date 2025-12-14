/**
 * Returns a shuffled array using the cryptographically secure Fisher-Yates algorithm.
 * @param array The array to shuffle (will not be updated)
 * @return a shuffled copy of `array`.
 */
export function secureShuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    const randomBuffer = new Uint32Array(shuffledArray.length);
    crypto.getRandomValues(randomBuffer);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = randomBuffer[i] % (i + 1);
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}