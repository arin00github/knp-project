/**
 * [공통컴포넌트] 메인프레임의 SideBar 컴포넌트
 * @file src/views/components/common/CrumbNav.tsx
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import React, { ReactElement, useCallback, useState } from "react";

import { CgMenuRound } from "react-icons/cg";
import { FaBars, FaUserLock, FaUsersCog } from "react-icons/fa";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import BlackLogo from "../../../assets/images/black-logo.svg";
import { CommonState, setStoredCurrentCrumb } from "../../../services/store/common/common-slice";
import { useAppDispatch, useAppSelector } from "../../../services/store/hooks";

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

const StyledSideBarFooterDiv = styled.div`
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledSidebarFooter = styled(SidebarFooter)`
    text-align: center;
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
 * component interface 정의 영역
 */
interface LinkItemProps {
    name: string;
    icon?: ReactElement;
    path?: string;
    children?: LinkItemProps[];
}

const LinkItems: Array<LinkItemProps> = [
    { name: "사용자관리", icon: <FaUsersCog />, path: "/user-management" },
    { name: "권한그룹관리", icon: <FaUserLock />, path: "/auth-group-management" },
    { name: "메뉴관리", icon: <CgMenuRound />, path: "/" },
    /* {
        name: "관리",
        icon: <FcSettings />,
        children: [
            { name: "사용자 관리", path: "/page5-1" },
            { name: "권한그룹 관리", path: "/page5-2" },
            { name: "메뉴 관리", path: "/page5-3" },
        ],
    }, */
];

export const ProSideBar = () => {
    const dispatch = useAppDispatch();
    const storedCommon = useAppSelector((state) => state.common) as CommonState;
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenuPath, setActiveMenuPath] = useState(window.location.pathname);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean | undefined>(undefined);

    console.log(activeMenuPath);

    /**
     * @name setOneDepthMenuPath
     * @function
     * @param {LinkItemProps} item 메뉴 Item 정보
     * @param {string} path 선택 메뉴 Path 정보
     * @description One Depth 메뉴 선택 시, 메뉴 path 정보 저장 및 후 처리
     * @return {void}
     */
    const setOneDepthMenuPath = useCallback(
        (item: LinkItemProps, path: string) => {
            dispatch(setStoredCurrentCrumb([{ name: item.name, path: path }]));
            setActiveMenuPath(`${process.env.PUBLIC_URL}${path}`);
            setIsSubMenuOpen(false);
        },
        [dispatch]
    );

    /**
     * @name setMultipleDepthMenuPath
     * @function
     * @param {LinkItemProps} item 메뉴 Item 정보
     * @param {Array<LinkItemProps>} childrenItem 메뉴 Item children 정보
     * @param {string} path 선택 메뉴 Path 정보
     * @description Multiple Depth 메뉴 선택 시, 메뉴 path 정보 저장 및 후 처리
     * @return {void}
     */
    const setMultipleDepthMenuPath = useCallback(
        (item: LinkItemProps, childrenItem: LinkItemProps[], path: string) => {
            const crumbArr: Array<{ name: string; path: string }> = [];
            crumbArr.push({ name: item.name, path: path });
            const matchedIndex = childrenItem.findIndex((childrenItem: LinkItemProps) => {
                return childrenItem.path === path;
            });
            crumbArr.push({
                name: childrenItem[matchedIndex].name,
                path: childrenItem[matchedIndex].path || "",
            });
            dispatch(setStoredCurrentCrumb(crumbArr));
            setActiveMenuPath(`${process.env.PUBLIC_URL}${childrenItem[matchedIndex].path || ""}`);
            setIsSubMenuOpen(true);
        },
        [dispatch]
    );

    /**
     * @name handleSelectedMenuItemClick
     * @function
     * @param {LinkItemProps} item 메뉴 Item 정보
     * @param {string} path 선택 메뉴 Path 정보
     * @description Side Bar 메뉴 선택 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleSelectedMenuItemClick = useCallback(
        (item: LinkItemProps, path: string) => {
            if (!item.children) {
                setOneDepthMenuPath(item, path);
            } else {
                setMultipleDepthMenuPath(item, item.children, path);
            }
        },
        [setMultipleDepthMenuPath, setOneDepthMenuPath]
    );

    return (
        <StyledOverrideProSidebar collapsed={collapsed} width={250} collapsedWidth={60}>
            <SidebarHeader>
                <StyledSideBarHeaderDiv>
                    {!collapsed ? <img src={BlackLogo} alt="Data Hub Logo" /> : ""}
                    <StyledAbsoluteButtonDiv collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}>
                        <FaBars />
                    </StyledAbsoluteButtonDiv>
                </StyledSideBarHeaderDiv>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    {LinkItems.map((item: LinkItemProps, index: number) => {
                        if (!item.children) {
                            return (
                                <MenuItem
                                    key={index}
                                    icon={item.icon}
                                    onClick={() => handleSelectedMenuItemClick(item, item.path || "")}
                                    active={
                                        activeMenuPath === "/"
                                            ? index === 0
                                                ? true
                                                : false
                                            : activeMenuPath === `${process.env.PUBLIC_URL}${item.path}`
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
                                    icon={item.icon}
                                    key={index}
                                    defaultOpen={storedCommon.crumbInfo.length > 1 ? true : undefined}
                                    open={isSubMenuOpen}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSubMenuOpen(!isSubMenuOpen);
                                    }}
                                >
                                    {item.children.map((childrenItem: LinkItemProps, childrenIndex: number) => {
                                        return (
                                            <MenuItem
                                                key={childrenIndex}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectedMenuItemClick(item, childrenItem.path || "");
                                                }}
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
                </Menu>
            </SidebarContent>
            <StyledSidebarFooter>
                <StyledSideBarFooterDiv>*</StyledSideBarFooterDiv>
            </StyledSidebarFooter>
        </StyledOverrideProSidebar>
    );
};
