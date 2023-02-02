/**
 * [공통컴포넌트] 현재 페이지 위치,경로 표시용 컴포넌트
 * @file src/views/components/common/CrumbNav.tsx
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import React from "react";

import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CrumbSeparator from "../../../assets/images/crumb-separator.svg";
import { CommonState } from "../../../services/store/common/common-slice";
import { useAppSelector } from "../../../services/store/hooks";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledCrumbNav = styled.nav`
    display: flex;
    padding: 0.5em 1em;
    border-radius: 0.25em;
    font-weight: 500;
    li {
        display: flex;
        align-items: center;
        float: left;
        margin: 0.5em 0;
        &:after {
            display: inline-block;
            margin: 0 0.6em;
            color: tint(#2c3f4c, 50%);
            content: "";
            height: 10px;
            width: 10px;
            background: url(${CrumbSeparator}) no-repeat center center;
            vertical-align: middle;
        }
        &:last-of-type::after {
            display: none;
        }
    }
    li > * {
        display: flex;
        font-size: 12px;
        color: #2c3f4c;
    }

    li.current > * {
        color: #96c03d;
    }
`;

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: underline;
    }
`;

export const CrumbNav = () => {
    const storedCommon = useAppSelector((state) => state.common) as CommonState;

    return (
        <StyledCrumbNav>
            <li>
                <Link to="/">
                    <FaHome />
                </Link>
            </li>
            {storedCommon.crumbInfo.map((crumb, index) => {
                return (
                    <li key={index}>
                        <StyledLink to={crumb.path ? crumb.path : ""}>{crumb.name ? crumb.name : ""}</StyledLink>
                    </li>
                );
            })}
        </StyledCrumbNav>
    );
};
