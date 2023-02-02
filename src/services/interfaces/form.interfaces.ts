export const EDIT_ADD = "add";
export const EDIT_MODIFY = "modify";
export const EDIT_REMOVE = "dirty";
export const EDIT_DIRTY = "dirty";
export const EDIT_RESET = "reset";
export const EDIT_OTP_RESET = "opt";
export type EDIT_MODE =
    | typeof EDIT_ADD
    | typeof EDIT_MODIFY
    | typeof EDIT_REMOVE
    | typeof EDIT_DIRTY
    | typeof EDIT_RESET
    | typeof EDIT_OTP_RESET;
