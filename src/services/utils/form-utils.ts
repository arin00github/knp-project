/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

import { isObject } from "./object-utils";

export type EVENT_OR_VALUE =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>
    | ChangeEvent<HTMLTextAreaElement>
    | string
    | number
    | boolean;

export const isInputEvent = (value: any): value is { target: HTMLInputElement } => {
    return value && isObject(value) && isObject(value.target);
};

export const isSelectEvent = (value: any): value is { target: HTMLSelectElement } => {
    return value && isObject(value) && isObject(value.target);
};
