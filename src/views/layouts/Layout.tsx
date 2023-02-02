/**
 * 모든 레이아웃을 포괄하는 부모 컴포넌트
 * @file src/views/layouts/Layout.tsx
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import React, { useState } from "react";

import { FaBars } from "react-icons/fa";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";

import { InitDataState } from "../../services/store/common/init-data-slice";
import { useAppSelector } from "../../services/store/hooks";
import { ProSideBar } from "../components/common";
import { Aside } from "../layouts";

import { Content } from "./Content";
import { ContentLayout } from "./ContentLayout";
import { Header } from "./Header";

export const Layout = () => {
    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { authMenus } = storedInitData;

    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const GIS_URL = "/gis";

    console.log("authMenus", authMenus);

    return (
        <StyledLayoutDiv /* className={`${toggled ? "toggled" : ""}`} */>
            <Aside>
                <ProSideBar />
            </Aside>
            <ContentLayout>
                {process.env.REACT_APP_HEADER === "true" && (
                    <Header>
                        <StyledHeaderDivWrap>
                            {process.env.REACT_APP_COLLAPSED === "true" && (
                                <FaBars onClick={() => setIsCollapsed(!isCollapsed)} />
                            )}
                            {/* <Breadcrumb /> */}
                        </StyledHeaderDivWrap>
                        <StyledHeaderDivWrap>
                            {/* {process.env.REACT_APP_TRANSLATE === "true" && <ToggleSwitch />}
                            {process.env.REACT_APP_ALARM_BELL === "true" && <NoticeDropDown />}
                            {process.env.REACT_APP_USER_PROFILE === "true" && <UserProfile />}
                            {process.env.REACT_APP_CURRENT_DATE === "true" && <CurrentDate />} */}
                        </StyledHeaderDivWrap>
                    </Header>
                )}
                <Content>
                    <Switch>
                        {authMenus.map((menu, index) => (
                            <Route key={index} path={menu.path} component={menu.component} exact={menu.isLeafMenu} />
                        ))}
                        <Redirect from="*" to={GIS_URL}></Redirect>
                    </Switch>
                </Content>
            </ContentLayout>
        </StyledLayoutDiv>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledLayoutDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
`;

const StyledHeaderDivWrap = styled.div`
    display: flex;
    gap: 8px;
    color: ${({ theme }) => theme.layoutHeaderColor};
    > img {
        height: 45px;
        width: 100px;
    }
    > svg {
        cursor: pointer;
        &:active {
            transform: translateY(1px);
        }
    }
`;
