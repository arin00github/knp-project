/* eslint-disable @typescript-eslint/no-explicit-any */
export const divideArray = (array: any[]): any[] => {
    return array.reduce((prev, curr, index) => {
        const chunkIndex = Math.floor(index / 2);
        if (!prev[chunkIndex]) {
            prev[chunkIndex] = [];
        }
        prev[chunkIndex].push(curr);
        return prev;
    }, []);
};

export const setUniqArray = (array: any[]): any[] => {
    return Array.from(new Set(array));
};

export function sortArrayOfObjects<T extends Record<K, string>, K extends keyof T>(arr: T[], key: K): T[] {
    return arr.sort((a, b) => a[key].localeCompare(b[key]));
}
