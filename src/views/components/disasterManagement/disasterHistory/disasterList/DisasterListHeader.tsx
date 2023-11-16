import React, { useMemo } from "react";

import { Stack, useDisclosure } from "@innodep/tms-react-ui";

import { MENU_SITU_NOTION_HIST } from "../../../../../services/constant";
import { InitDataState } from "../../../../../services/store/common/init-data-slice";
import { useAppSelector } from "../../../../../services/store/hooks";
import { StyledSmButton } from "../../../../../styles/components/Button.styles";
import { StyledLayoutHeader } from "../../../../../styles/components/Layout.styles";

import { DisasterListFilterBar } from ".";

export const DisasterListHeader = (): JSX.Element => {
    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { userAuth } = storedInitData;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const authDelete = useMemo((): boolean => {
        const currentMenuRole = userAuth?.user_menu_role.find((role) => role.menu_code === MENU_SITU_NOTION_HIST);
        return currentMenuRole ? currentMenuRole.auth_delete : false;
    }, [userAuth?.user_menu_role]);

    return (
        <StyledLayoutHeader>
            <Stack>
                <DisasterListFilterBar />
                <Stack>
                    <StyledSmButton>엑셀다운</StyledSmButton>
                    {authDelete && <StyledSmButton>삭제</StyledSmButton>}
                </Stack>
            </Stack>
        </StyledLayoutHeader>
    );
};
