import React, { useCallback, useEffect, useState } from "react";

import { Stack } from "@innodep/tms-react-ui";

import { NewTmsKnpNoticeInterface } from "../../../../../services/api/tmsKnpNotice/TmsKnpNoticeApi";
import {
    ApproveSituationNoticeEndResponse,
    DeleteSituationNoticeResponse,
    RefuseSituationNoticeEndResponse,
} from "../../../../../services/api/tmsKnpNotice/TmsKnpNoticeInterface";
import { setStoredDisastersLoading } from "../../../../../services/store/disasterManagement/disasters-slice";
import { useAppDispatch } from "../../../../../services/store/hooks";
import { StyledSmButton } from "../../../../../styles/components/Button.styles";
import {
    StyledDialogBody,
    StyledDialogBodyMessage,
    StyledDialogFooter,
    StyledDialogHeader,
    StyledDialogWrapper,
} from "../../../../../styles/components/Dialog.styles";

interface ApproveDisasterEndDialogProps {
    disasterId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ApproveDisasterEndDialog = (props: ApproveDisasterEndDialogProps) => {
    const { disasterId, isOpen, onClose } = props;

    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string>();
    const [submitted, setSubmitted] = useState<boolean>();
    const [response, setResponse] = useState<DeleteSituationNoticeResponse>();

    /**
     * @name handleCloseButtonClick
     * @function
     * @description 닫기 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleCloseButtonClick = useCallback(() => {
        onClose();

        if (response) {
            dispatch(setStoredDisastersLoading(true));
            setResponse(undefined);
        }
    }, [dispatch, onClose, response]);

    /**
     * @name approveSituationNoticeEnd
     * @async
     * @function
     * @description 상황 전파 상황 종료 요청 승인
     * @return {Promise<ApproveSituationNoticeEndResponse>}
     */
    const approveSituationNoticeEnd = useCallback(
        async (disasterId: string): Promise<ApproveSituationNoticeEndResponse> => {
            const tmsKnpNoticeService = NewTmsKnpNoticeInterface();
            const approveNoticeEndRes = await tmsKnpNoticeService.approveSituationNoticeEnd({
                situation_uuid: disasterId,
            });

            return new Promise((resolve, reject) => {
                if (approveNoticeEndRes?.code === 200) {
                    resolve(approveNoticeEndRes as ApproveSituationNoticeEndResponse);
                } else {
                    reject(approveNoticeEndRes?.message);
                }
            });
        },
        []
    );

    /**
     * @name handleApproveEndButtonClick
     * @function
     * @description 상황 전파 상황 종료 요청 승인 처리 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleApproveEndButtonClick = useCallback(() => {
        approveSituationNoticeEnd(disasterId)
            .then((approveNoticeEndRes) => {
                setMessage("상황종료 승인에 성공하였습니다.");
                setSubmitted(true);
                setResponse(approveNoticeEndRes);
            })
            .catch(() => {
                setMessage("상황종료 승인에 실패하였습니다.");
                setSubmitted(true);
            });
    }, [approveSituationNoticeEnd, disasterId]);

    /**
     * @name refuseSituationNoticeEnd
     * @async
     * @function
     * @description 상황 전파 상황 종료 요청 거절
     * @return {Promise<RefuseSituationNoticeEndResponse>}
     */
    const refuseSituationNoticeEnd = useCallback(
        async (disasterId: string): Promise<RefuseSituationNoticeEndResponse> => {
            const tmsKnpNoticeService = NewTmsKnpNoticeInterface();
            const refuseSituationNoticeEndResponse = await tmsKnpNoticeService.refuseSituationNoticeEnd({
                situation_uuid: disasterId,
            });
            return new Promise((resolve, reject) => {
                if (refuseSituationNoticeEndResponse?.code === 200) {
                    resolve(refuseSituationNoticeEndResponse as RefuseSituationNoticeEndResponse);
                } else {
                    reject(refuseSituationNoticeEndResponse?.message);
                }
            });
        },
        []
    );

    /**
     * @name handleRefuseEndButtonClick
     * @function
     * @description 상황 전파 상황 종료 요청 거절 처리 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleRefuseEndButtonClick = useCallback(() => {
        refuseSituationNoticeEnd(disasterId)
            .then((refuseSituationNoticeEndResponse) => {
                setMessage("상황종료 거절에 성공하였습니다.");
                setSubmitted(true);
                setResponse(refuseSituationNoticeEndResponse);
            })
            .catch(() => {
                setMessage("상황종료 거절에 실패하였습니다.");
                setSubmitted(true);
            });
    }, [refuseSituationNoticeEnd, disasterId]);

    /**
     * @private
     * @description [useEffect hooks] 상황종료 승인 Dialog 가 닫힌 경우, state 초기화 처리
     */
    useEffect(() => {
        if (!isOpen) {
            setMessage("상황종료 승인 여부를 선택해주세요");
            setSubmitted(false);
        }
    }, [isOpen]);

    return (
        <StyledDialogWrapper isOpen={isOpen} onClose={handleCloseButtonClick} size={"sm"}>
            <StyledDialogHeader>알림</StyledDialogHeader>
            <StyledDialogBody>
                <StyledDialogBodyMessage>{message}</StyledDialogBodyMessage>
            </StyledDialogBody>
            <StyledDialogFooter>
                <Stack>
                    {!submitted && (
                        <>
                            <StyledSmButton size="sm" onClick={handleApproveEndButtonClick}>
                                승인
                            </StyledSmButton>
                            <StyledSmButton size="sm" colorScheme="red" onClick={handleRefuseEndButtonClick}>
                                거절
                            </StyledSmButton>
                        </>
                    )}
                    {submitted && (
                        <StyledSmButton size="sm" variant="outline" colorScheme="gray" onClick={handleCloseButtonClick}>
                            닫기
                        </StyledSmButton>
                    )}
                </Stack>
            </StyledDialogFooter>
        </StyledDialogWrapper>
    );
};
