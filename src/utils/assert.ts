export function assert(assertion: boolean, message: string): void {
    if (!assertion) {
        throw new Error(message);
    }
}

export function assertDefined<T>(value: T | undefined | null, message: string): T {
    assert(value !== null, message);
    return value!;
}