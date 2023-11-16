import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router";

import { setStoredActiveApp } from "@/services/store/common/common-slice";
import { resetStoredSituationStatus } from "@/services/store/dashboard/situation-status-slice";
import { useAppDispatch } from "@/services/store/hooks";
import { StyledPageDiv } from "@/styles/components/Layout.styles";
import { SubMenuRoutes } from "@/views/router/SubMenuRoutes";

export const DisasterHistoryPage = ({ match }: RouteComponentProps): JSX.Element => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setStoredActiveApp(`${process.env.REACT_APP_URL}${match.url}`));
    }, [dispatch, match.url]);

    useEffect(() => {
        dispatch(resetStoredSituationStatus());
        return () => {
            dispatch(resetStoredSituationStatus());
        };
    }, [dispatch]);

    return (
        <StyledPageDiv>
            <SubMenuRoutes parentPath={match.path} />
        </StyledPageDiv>
    );
};
