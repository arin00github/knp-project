/**
 * [공통컴포넌트] 메인프레임의 SideBar 컴포넌트
 * @file src/views/components/common/CrumbNav.tsx
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import React, { useCallback, useEffect, useState } from "react";

import { FaBars } from "react-icons/fa";
import { ProSidebar, Menu as SideBarMenu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { InitDataState } from "@/services/store/common/init-data-slice";
import { useAppSelector } from "@/services/store/hooks";
import { Menu } from "@/views/router/MenuConstant";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledSideBarHeaderDiv = styled.div`
    height: 50px;
    min-height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    padding: 24px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledAbsoluteButtonDiv = styled.div<{ collapsed: boolean }>`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    ${(props) =>
        props.collapsed &&
        css`
            right: 50%;
            transform: translate(50%, -50%);
        `}
`;

const StyledOverrideProSidebar = styled(ProSidebar)`
    .pro-sidebar-inner {
        .pro-menu-item .pro-inner-item {
            padding: 8px 25px 8px 10px !important;
        }
        .pro-icon > * {
            font-size: 20px;
        }
    }
    .active {
        font-weight: bold;
    }
`;

/**
 * @typedef ProSideBarProps
 * @prop {boolean} isCollapsed Side Bar 펼침 여부
 */
interface ProSideBarProps {
    isCollapsed: boolean;
}

export const ProSideBar = (props: ProSideBarProps) => {
    console.log("props", props);
    //const dispatch = useAppDispatch();
    //const storedCommon = useAppSelector((state) => state.common) as CommonState;

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { authMenus } = storedInitData;

    const [collapsed, setCollapsed] = useState(false);
    const [activeMenuPath, setActiveMenuPath] = useState(window.location.pathname);
    //const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean | undefined>(undefined);

    /**
     * @name setOneDepthMenuPath
     * @function
     * @param {LinkItemProps} item 메뉴 Item 정보
     * @param {string} path 선택 메뉴 Path 정보
     * @description One Depth 메뉴 선택 시, 메뉴 path 정보 저장 및 후 처리
     * @return {void}
     */
    // const setOneDepthMenuPath = useCallback(
    //     (item: LinkItemProps, path: string) => {
    //         dispatch(setStoredCurrentCrumb([{ name: item.name, path: path }]));
    //         setActiveMenuPath(`${process.env.PUBLIC_URL}${path}`);
    //         setIsSubMenuOpen(false);
    //     },
    //     [dispatch]
    // );

    // /**
    //  * @name setMultipleDepthMenuPath
    //  * @function
    //  * @param {LinkItemProps} item 메뉴 Item 정보
    //  * @param {Array<LinkItemProps>} childrenItem 메뉴 Item children 정보
    //  * @param {string} path 선택 메뉴 Path 정보
    //  * @description Multiple Depth 메뉴 선택 시, 메뉴 path 정보 저장 및 후 처리
    //  * @return {void}
    //  */
    // const setMultipleDepthMenuPath = useCallback(
    //     (item: LinkItemProps, childrenItem: LinkItemProps[], path: string) => {
    //         const crumbArr: Array<{ name: string; path: string }> = [];
    //         crumbArr.push({ name: item.name, path: path });
    //         const matchedIndex = childrenItem.findIndex((childrenItem: LinkItemProps) => {
    //             return childrenItem.path === path;
    //         });
    //         crumbArr.push({
    //             name: childrenItem[matchedIndex].name,
    //             path: childrenItem[matchedIndex].path || "",
    //         });
    //         dispatch(setStoredCurrentCrumb(crumbArr));
    //         setActiveMenuPath(`${process.env.PUBLIC_URL}${childrenItem[matchedIndex].path || ""}`);
    //         setIsSubMenuOpen(true);
    //     },
    //     [dispatch]
    // );

    // /**
    //  * @name handleSelectedMenuItemClick
    //  * @function
    //  * @param {LinkItemProps} item 메뉴 Item 정보
    //  * @param {string} path 선택 메뉴 Path 정보
    //  * @description Side Bar 메뉴 선택 클릭 이벤트 핸들러
    //  * @return {void}
    //  */
    // const handleSelectedMenuItemClick = useCallback(
    //     (item: LinkItemProps, path: string) => {
    //         if (!item.children) {
    //             setOneDepthMenuPath(item, path);
    //         } else {
    //             setMultipleDepthMenuPath(item, item.children, path);
    //         }
    //     },
    //     [setMultipleDepthMenuPath, setOneDepthMenuPath]
    // );

    /**
     * @name isChildActive
     * @function
     * @description 서브메뉴일 경우 하위 목록이 선택되었는지의 여부에 따라 active 반환
     * @return {boolean}
     */
    const isChildActive = useCallback(
        (subMenus: Menu[]): boolean =>
            subMenus.some((subMenu) => activeMenuPath === `${process.env.REACT_APP_URL}${subMenu.path}`),
        [activeMenuPath]
    );

    /**
     * @private
     * @description [useEffect hooks] store에 저장된 메뉴 active path를 가져와 셋팅
     */
    useEffect(() => {
        setActiveMenuPath(activeMenuPath);
    }, [activeMenuPath]);

    /**
     * @private
     * @description [useEffect hooks] 사이드바 여닫기 처리
     */
    // useEffect(() => {
    //     setCollapsed(isCollapsed);
    //     dispatch(setStoredCollapsedChange(true));
    // }, [dispatch, isCollapsed]);
    console.log("authMenus", authMenus);

    return (
        <StyledOverrideProSidebar collapsed={collapsed} width={250} collapsedWidth={60}>
            <SidebarHeader>
                <StyledSideBarHeaderDiv>
                    <StyledAbsoluteButtonDiv collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}>
                        <FaBars />
                    </StyledAbsoluteButtonDiv>
                </StyledSideBarHeaderDiv>
            </SidebarHeader>
            <SidebarContent>
                <SideBarMenu iconShape="circle">
                    {authMenus.map((item, index: number) => {
                        if (!item.children || item.hideChildren) {
                            return (
                                <MenuItem
                                    key={index}
                                    //icon={item.icon}
                                    active={
                                        activeMenuPath === "/"
                                            ? index === 0
                                            : activeMenuPath === `${process.env.REACT_APP_URL}${item.path}`
                                    }
                                >
                                    <Link to={item.path || ""} />
                                    {item.name}
                                </MenuItem>
                            );
                        } else {
                            return (
                                <SubMenu
                                    title={item.name}
                                    //icon={item.icon}
                                    key={index}
                                    defaultOpen={true}
                                    className={isChildActive(item.children) ? "active" : ""}
                                >
                                    {item.children.map((childrenItem, childrenIndex: number) => {
                                        return (
                                            <MenuItem
                                                key={childrenIndex}
                                                active={
                                                    activeMenuPath === `${process.env.PUBLIC_URL}${childrenItem.path}`
                                                }
                                            >
                                                <Link to={childrenItem.path || ""} />
                                                {childrenItem.name}
                                            </MenuItem>
                                        );
                                    })}
                                </SubMenu>
                            );
                        }
                    })}
                </SideBarMenu>
            </SidebarContent>
        </StyledOverrideProSidebar>
    );
};
