import React, { useEffect } from "react";

import AssetGroupListPage from "./ListPage";

import { useAppSelector, useAppDispatch } from "@/services/store/hooks";
import { setStoredFilterParams, setStoredSelectedRow, setIsFormOpen } from "@/services/store/setting/asset-group-slice";
import { StyledPageLeft, StyledPageRight, StyledPageWrap } from "@/styles";

const AssetGroupManagement = () => {
    // 옆에 사이드바가 열려있는지 여부
    const dispatch = useAppDispatch();
    const storedAssetGroup = useAppSelector((state) => state.assetGroup);
    const { isFormOpen } = storedAssetGroup;

    useEffect(() => {
        dispatch(setStoredFilterParams({ search_word: "" }));
        dispatch(setStoredSelectedRow(undefined));
        dispatch(setIsFormOpen(false));
    }, [dispatch]);

    return (
        <StyledPageWrap>
            <StyledPageLeft isSideBarOpen={isFormOpen}>
                <AssetGroupListPage />
            </StyledPageLeft>
            {isFormOpen && <StyledPageRight></StyledPageRight>}
        </StyledPageWrap>
    );
};

export default AssetGroupManagement;
