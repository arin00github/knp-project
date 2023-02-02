/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObject = (value: any): value is Record<string, any> => {
    const type = typeof value;
    return value != null && (type === "object" || type === "function") && !Array.isArray(value);
};
