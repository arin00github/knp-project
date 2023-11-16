import React from "react";

import { FormControl, Stack } from "@innodep/tms-react-ui";

import { useAppDispatch, useAppSelector } from "@/services/store/hooks";
import { setIsFormOpen, setStoredFilterParams, setStoredSelectedRow } from "@/services/store/setting/asset-group-slice";
import { StyledFilterBarFormInput, StyledFilterBarFormLabel, StyledLayoutHeader, StyledSmButton } from "@/styles";

/**
 * 자산종류 목록을 보여주는 테이블이 있는 페이지
 * @returns
 */
const ListPageHeader = () => {
    const dispatch = useAppDispatch();
    const storedAssetGroup = useAppSelector((state) => state.assetGroup);
    const { filterParams } = storedAssetGroup;

    const [searchWord, setSearchWord] = React.useState<string>("");

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchWord(e.target.value);
        //dispatch(setStoredFilterParams({ search_word: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setStoredFilterParams({ search_word: searchWord }));
    };

    const handleOpen = () => {
        dispatch(setIsFormOpen(true));
        dispatch(setStoredSelectedRow(undefined));
    };
    return (
        <StyledLayoutHeader>
            <Stack justifyContent="space-between" gap="32px">
                <form onSubmit={handleSubmit}>
                    <Stack>
                        <FormControl>
                            <StyledFilterBarFormLabel htmlFor="asset-group-search">
                                자원종류 관리
                            </StyledFilterBarFormLabel>
                            <StyledFilterBarFormInput
                                id="asset-group-search"
                                placeholder="자원종류명, 코드를 입력하세요"
                                value={filterParams.search_word}
                                onChange={handleFilterChange}
                            />
                        </FormControl>
                        <StyledSmButton type="submit">검색</StyledSmButton>
                    </Stack>
                </form>
                <StyledSmButton onClick={handleOpen}>등록</StyledSmButton>
            </Stack>
        </StyledLayoutHeader>
    );
};

export default ListPageHeader;
