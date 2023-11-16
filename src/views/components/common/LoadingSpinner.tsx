import React, { useEffect, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

import { THEME_LIGHT } from "../../../services/constant";
import { CommonState } from "../../../services/store/common/common-slice";
import { useAppSelector } from "../../../services/store/hooks";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledLoadingSpinnerWrap = styled.div<{ bgColor: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: ${({ bgColor }) => bgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

/**
 * component interface 정의 영역
 */
interface LoadingSpinnerProps {
    isPage?: boolean;
}

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
    const { isPage } = props;

    const storedCommon = useAppSelector((state) => state.common) as CommonState;
    const { theme } = storedCommon;

    const [color, setColor] = useState("rgba(0, 0, 0, .9)");
    const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 1)");

    const override: React.CSSProperties = {
        borderWidth: 5,
    };

    /**
     * @private
     * @description [useEffect hooks] 테마 변경 처리
     */
    useEffect(() => {
        if (theme && !isPage) {
            if (theme === THEME_LIGHT) {
                setColor("rgba(0, 0, 0, 0.9)");
                setBgColor("rgba(255, 255, 255, 1)");
            } else {
                setColor("rgba(255, 255, 255, 1)");
                setBgColor("#22252a");
            }
        }

        if (theme && isPage) {
            if (theme === THEME_LIGHT) {
                setColor("rgba(0, 0, 0, 0.9)");
                setBgColor("rgba(0, 0, 0, 0.3)");
            } else {
                setColor("rgba(255, 255, 255, 1)");
                setBgColor("rgba(255, 255, 255, 0.3)");
            }
        }
    }, [theme, isPage]);

    return (
        <StyledLoadingSpinnerWrap bgColor={bgColor}>
            <ClipLoader color={color} cssOverride={override} size={60} />
        </StyledLoadingSpinnerWrap>
    );
};
