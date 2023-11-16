import React, { useCallback } from "react";

import { useDisclosure } from "@innodep/tms-react-ui";
import { AiOutlineColumnHeight, AiOutlineClear } from "react-icons/ai";
import { FaHome, FaRuler } from "react-icons/fa";
import { MdOutlineGrid3X3 } from "react-icons/md";
import { TbVector } from "react-icons/tb";
import styled from "styled-components";

import { setStoredIsPopupOpen } from "../../../services/store/gis/gis-slice";
import { useAppDispatch } from "../../../services/store/hooks";

import { GisPositionInfo } from "./GisWrapper";

declare const vw: any;

interface GisControlsProps {
    vMap: any;
    userGisPosition: GisPositionInfo;
}

export const GisControls = (props: GisControlsProps) => {
    const dispatch = useAppDispatch();

    const { vMap, userGisPosition } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

    /**
     * @name handleHomeButtonClick
     * @function
     * @description 홈 버튼 클릭 시 이동 처리
     * @return {void}
     */
    const handleHomeBtnClick = useCallback(() => {
        if (vMap) {
            vMap.moveTo(
                new vw.CoordZ(userGisPosition.position_x, userGisPosition.position_y, userGisPosition.position_z),
                userGisPosition.camera_heading,
                userGisPosition.camera_tilt,
                userGisPosition.camera_roll
            );
        }
    }, [
        userGisPosition.camera_heading,
        userGisPosition.camera_roll,
        userGisPosition.camera_tilt,
        userGisPosition.position_x,
        userGisPosition.position_y,
        userGisPosition.position_z,
        vMap,
    ]);

    /**
     * @name handleMeasureHeightButtonClick
     * @function
     * @description 높이 측정 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleMeasureHeightBtnClick = useCallback(() => {
        dispatch(setStoredIsPopupOpen(false));
        if (vMap) {
            vw.MeasureHeight.start();
            const evtMeasureRightHandler = () => {
                vw.MeasureHeight.stop();
            };
            vw.EventProcess.add(vw.MapController.RIGHTUPDNCLICK, vMap.onMouseRightDown, evtMeasureRightHandler);
        }
    }, [dispatch, vMap]);

    return (
        <>
            <StyledHomeButton title="홈 이동" onClick={handleHomeBtnClick}>
                <FaHome />
            </StyledHomeButton>
            <StyledMapControlButtonWrap>
                <StyledMapControlDivButton title="높이 측정">
                    <AiOutlineColumnHeight />
                </StyledMapControlDivButton>
                <StyledMapControlDivButton title="거리 측정">
                    <FaRuler />
                </StyledMapControlDivButton>
                <StyledMapControlDivButton title="면적 측정">
                    <TbVector />
                </StyledMapControlDivButton>
                <StyledMapControlDivButton title="측정 초기화">
                    <AiOutlineClear />
                </StyledMapControlDivButton>
            </StyledMapControlButtonWrap>
            <StyledUserBookmarksButtonWrap>
                <StyledMapControlDivButton title="화면 고정">
                    <MdOutlineGrid3X3 />
                </StyledMapControlDivButton>
            </StyledUserBookmarksButtonWrap>
        </>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledMapControlDivButton = styled.div`
    position: relative;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    background-color: ${({ theme }) => theme.contentBgColor};
    color: ${({ theme }) => theme.proSideBarColor};
    border: 1px solid ${({ theme }) => theme.proSideBarColor};
    cursor: pointer;
    path:hover {
        fill: ${({ theme }) => theme.proSideBarColor};
    }
    &:active {
        transform: translateY(1px);
    }
`;

const StyledHomeButton = styled(StyledMapControlDivButton)`
    position: absolute;
    top: 8px;
    left: 8px;
    &:active {
        transform: translateY(1px);
    }
`;

const StyledMapControlButtonWrap = styled.div`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    display: flex;
    flex-direction: column;
`;

const StyledUserBookmarksButtonWrap = styled.div`
    position: absolute;
    left: 8px;
    bottom: 8px;
    z-index: 1;
    display: flex;
    flex-direction: column;
`;
