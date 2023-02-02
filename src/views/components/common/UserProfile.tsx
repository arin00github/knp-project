/**
 * [공통컴포넌트] 유저 정보 표시 및 DropDown 기능 컴포넌트
 * @file src/views/components/common/UserProfile.tsx
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import React, { useEffect, useRef, useState } from "react";

import { BiLogOut } from "react-icons/bi";
import { GrUserSettings } from "react-icons/gr";
import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledUserProfileWrap = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-end;
    color: #000;
    padding: 8px;
`;

const StyledCircleUserProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: ${(props) => props.color};
    color: #000;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

const StyledDropDown = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 150px;
    box-shadow: 0 24px 54px rgb(0 0 0 / 15%), 0 4.5px 13.5px rgb(0 0 0 / 8%);
    inset: 48px 8px auto auto;
    right: 8px;
    padding: 16px 8px;
    gap: 16px;
    cursor: default;
`;

const StyledDropDownHeader = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    span {
        font-weight: bold;
        &:last-child {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
        }
    }
`;

const StyledDropDownBody = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 16px;
    ul {
        width: 100%;
        position: relative;
        list-style: none;
        li {
            font-size: 14px;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
            cursor: pointer;
            div {
                width: 100%;
                position: relative;
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px 8px 0px;
            }
            span:hover {
                color: skyblue;
            }
        }
    }
`;

/**
 * component interface 정의 영역
 */
interface UserProfileProps {
    color: string;
}

export const UserProfile = (props: UserProfileProps): JSX.Element => {
    const { color } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement;
            if (isMenuOpen && !dropDownRef.current?.contains(target)) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, [isMenuOpen]);

    return (
        <StyledUserProfileWrap>
            <StyledCircleUserProfile color={color} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {"주"}
            </StyledCircleUserProfile>
            {isMenuOpen ? (
                <StyledDropDown ref={dropDownRef}>
                    <StyledDropDownHeader>
                        <span>주성진</span>
                        <span>jsj@innodep.com</span>
                    </StyledDropDownHeader>
                    <StyledDropDownBody>
                        <ul>
                            <li>
                                <div>
                                    <GrUserSettings />
                                    <span>프로필 수정</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <BiLogOut />
                                    <span>로그아웃</span>
                                </div>
                            </li>
                        </ul>
                    </StyledDropDownBody>
                </StyledDropDown>
            ) : undefined}
        </StyledUserProfileWrap>
    );
};
