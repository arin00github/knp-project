import React from "react";

import { RouteComponentProps } from "react-router-dom";

import { useAppSelector } from "@/services/store/hooks";
import { StyledPageDiv } from "@/styles";
import { SubMenuRoutes } from "@/views/router/SubMenuRoutes";

const AssetGroupManagementPage = ({ match }: RouteComponentProps) => {
    const storedCommon = useAppSelector((state) => state.common);
    const { pageLoading } = storedCommon;
    return (
        <StyledPageDiv>
            <SubMenuRoutes parentPath={match.path} />
        </StyledPageDiv>
    );
};

export default AssetGroupManagementPage;
