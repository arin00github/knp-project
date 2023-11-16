import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router";

import { setStoredActiveApp } from "@/services/store/common/common-slice";
import { useAppDispatch, useAppSelector } from "@/services/store/hooks";
import { LoadingSpinner } from "@/views/components/common";
import { SubMenuRoutes } from "@/views/router/SubMenuRoutes";

export const GisPage = ({ match }: RouteComponentProps): JSX.Element => {
    const storedCommon = useAppSelector((state) => state.common);
    const { pageLoading } = storedCommon;

    const dispatch = useAppDispatch();

    /**
     * @hooks
     * @description [useEffect hooks] Side Nav, 현재 Active 앱 Store 저장 처리
     */
    useEffect(() => {
        dispatch(setStoredActiveApp(`${process.env.REACT_APP_URL}${match.url}`));
    }, [dispatch, match.url]);

    return (
        <>
            {pageLoading && <LoadingSpinner isPage={true} />}
            <SubMenuRoutes parentPath={match.path} />
        </>
    );
};
