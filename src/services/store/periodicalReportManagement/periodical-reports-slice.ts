import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

/**
 * TODO: API 미 존재로 임시 interface 선언
 * @typedef {Object} TemporaryListDataInterface
 * @property {string} id 고유 id
 * @property {string} npk_nm 국립공원명
 * @property {string} npo_nm 국립공원 사무소명
 * @property {string} title 제목
 * @property {string} reg_date 등록일
 * @property {string} upd_date 수정일
 */
export interface TemporaryListDataInterface {
    id: string;
    npk_cd: string;
    npk_nm: string;
    npo_cd: string;
    npo_nm: string;
    title: string;
    reg_date: string;
    upd_date: string;
}

export interface PeriodicalReportsFilterParams {
    npk_cd?: string;
    npo_cd?: string;
    start_dt?: string;
    end_dt?: string;
}

export interface PeriodicalReportsState {
    loading: boolean;
    filterParams: PeriodicalReportsFilterParams;
    selectedIds: number[];
    selectedRowId?: number;
    imageIds: number[];
    isEditFormOpen: boolean;
    isRootGroupMember: boolean;
}

const initialState: PeriodicalReportsState = {
    loading: true,
    filterParams: {
        npk_cd: "",
        npo_cd: "",
        start_dt: "",
        end_dt: "",
    },
    selectedIds: [],
    imageIds: [],
    isEditFormOpen: false,
    isRootGroupMember: false,
};

export const periodicalReportsSlice = createSlice({
    name: "periodicalReports",
    initialState: initialState,
    reducers: {
        setStoredPeriodicalReportsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredPeriodicalReportsFilterParams: (state, action: PayloadAction<PeriodicalReportsFilterParams>) => {
            state.filterParams = action.payload;
        },
        setStoredPeriodicalReportsSelectedId: (state, action: PayloadAction<number[]>) => {
            state.selectedIds = action.payload;
        },
        setStoredPeriodicalReportsSelectedRowId: (state, action: PayloadAction<number | undefined>) => {
            state.selectedRowId = action.payload;
        },
        setStoredPeriodicalReportsImageIds: (state, action: PayloadAction<number[]>) => {
            state.imageIds = action.payload;
        },
        setStoredPeriodicalReportsIsEditFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isEditFormOpen = action.payload;
        },
        setStoredPeriodicalReportsIsRootGroupMember: (state, action: PayloadAction<boolean>) => {
            state.isRootGroupMember = action.payload;
        },
        resetStoredPeriodicalReports: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredPeriodicalReportsLoading,
    setStoredPeriodicalReportsFilterParams,
    setStoredPeriodicalReportsSelectedId,
    setStoredPeriodicalReportsSelectedRowId,
    setStoredPeriodicalReportsImageIds,
    setStoredPeriodicalReportsIsEditFormOpen,
    setStoredPeriodicalReportsIsRootGroupMember,
    resetStoredPeriodicalReports,
} = periodicalReportsSlice.actions;

export default periodicalReportsSlice.reducer;
