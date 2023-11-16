/**
 * 3D GIS 컴포넌트, redux slice 정의 파일
 * @file src/services/store/common/ws-slice.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-11-21, 최초 작성
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import {
    WsMessageDisasterReg,
    WsMessageDisasterModify,
    WsMessageDisasterDelete,
    WsMessageResponseReg,
    WsMessageResponseModify,
    WsMessageResponseDelete,
    WsMessageEndRequest,
    WsMessageEndApprove,
    WsMessageEdit,
    WsMessageEndRefuse,
} from "../../constant";

export type WsMessage =
    | WsMessageDisasterReg
    | WsMessageDisasterModify
    | WsMessageDisasterDelete
    | WsMessageResponseReg
    | WsMessageResponseModify
    | WsMessageResponseDelete
    | WsMessageEndRequest
    | WsMessageEndApprove
    | WsMessageEndRefuse
    | WsMessageEdit;

export interface WsState {
    socket?: WebSocket;
    message?: WsMessage;
}

const initialState: WsState = {};

export const wsSlice = createSlice({
    name: "ws",
    initialState: initialState,
    reducers: {
        setWebSocket: (state, action: PayloadAction<WebSocket>) => {
            state.socket = action.payload;
        },
        setStoredWsMessage: (state, action: PayloadAction<WsMessage>) => {
            state.message = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { setStoredWsMessage, setWebSocket } = wsSlice.actions;

export default wsSlice.reducer;
