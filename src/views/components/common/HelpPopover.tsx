import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { MdClose } from "react-icons/md";
import styled, { css } from "styled-components";

import { NewTmsKnpInterface } from "../../../services/api/tmsKnp/TmsKnpApi";
import { GetTemplatesResponse } from "../../../services/api/tmsKnp/TmsKnpInterface";
import { GetTemplatesResult } from "../../../services/api/tmsKnp/TmsKnpInterface";
import { useAppDispatch, useAppSelector } from "../../../services/store/hooks";
import { HelpMessageState, setStoredHelpMessageLoading } from "../../../services/store/setting/help-message-slice";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledPopoverButtonWrap = styled.div``;

const StyledPopover = styled.div<{ isOpen: boolean; placement: "bottom-start" | "bottom-end" }>`
    background: ${({ theme }) => theme.proSideBarBgColor};
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: 230px;
    min-height: 150px;
    z-index: 1;
    cursor: default;
    background-clip: border-box;
    border: 2px solid ${({ theme }) => theme.proSideBarBorderColor};
    line-height: 1.43;
    letter-spacing: 0.3px;
    ${(props) =>
        !props.isOpen &&
        css`
            display: none;
        `}
    ${(props) =>
        props.placement === "bottom-end" &&
        css`
            inset: auto 0 auto auto;
        `}
    ${(props) =>
        props.placement === "bottom-start" &&
        css`
            inset: auto auto auto 0;
        `}
`;

const StyledHelpPopoverHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    padding: 8px;
    font-size: 12px;
    > span {
        font-weight: 700;
    }
    > svg {
        font-size: 18px;
        cursor: pointer;
        &:active {
            transform: translateY(1px);
        }
    }
`;

const StyledHelpPopoverBody = styled.div<{ noData?: boolean }>`
    position: relative;
    display: flex;
    align-items: flex-start;
    padding: 8px 16px;
    height: auto;
    flex-direction: column;
    gap: 8px;
    strong {
        font-weight: bold !important;
    }
    em {
        font-style: italic !important;
    }
    ${(props) =>
        props.noData &&
        css`
            height: 100px;
            font-size: 12px;
            align-items: center;
            justify-content: center;
        `}
`;

interface HelpPopoverProps {
    children: ReactNode;
    templateTitle: string;
    placement: "bottom-start" | "bottom-end";
}

export const HelpPopover = (props: HelpPopoverProps): JSX.Element => {
    const { children, templateTitle, placement } = props;

    const dispatch = useAppDispatch();

    const storedHelpMessage = useAppSelector((state) => state.helpMessage) as HelpMessageState;
    const { loading } = storedHelpMessage;

    const [content, setContent] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const buttonWrapRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const popOverBodyRef = useRef<HTMLDivElement>(null);

    /**
     * @private
     * @description [useEffect hooks] dropdown 영역 외 클릭 시 hide 처리
     */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement;
            if (
                popoverRef.current &&
                buttonWrapRef.current &&
                !popoverRef.current.contains(target) &&
                !buttonWrapRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    /**
     * @name getTemplates
     * @async
     * @function
     * @description 도움말 템플릿 목록 조회
     * @return {Promise<GetTemplatesResponse>}
     */
    const getTemplates = useCallback(async (): Promise<GetTemplatesResponse> => {
        const params = {
            template_type: "HELP",
        };
        const tmsKnpService = NewTmsKnpInterface();
        const getTemplatesResponse = await tmsKnpService.getTemplates(params);
        return new Promise((resolve, reject) => {
            if (getTemplatesResponse?.code === 200) {
                resolve(getTemplatesResponse as GetTemplatesResponse);
            } else {
                reject(getTemplatesResponse?.message);
            }
        });
    }, []);

    /**
     * @private
     * @description [useEffect hooks] sms 템플릿 목록 조회를 위한 초기 호출 처리
     */
    useEffect(() => {
        if (loading) {
            getTemplates().then((getTemplatesRes) => {
                const helpMessage = getTemplatesRes.response.results.find(
                    (template: GetTemplatesResult) => template.title === templateTitle
                );
                if (helpMessage) {
                    if (helpMessage.content === "<p><br></p>") {
                        setContent("");
                    } else {
                        setContent(helpMessage.content);
                    }
                }
                dispatch(setStoredHelpMessageLoading(false));
            });
        }
    }, [dispatch, getTemplates, loading, templateTitle]);

    /**
     * @private
     * @description [useEffect hooks] 컴포넌트 unmount 시 loading 초기화
     */
    useEffect(() => {
        return () => {
            dispatch(setStoredHelpMessageLoading(true));
        };
    }, [dispatch]);

    return (
        <>
            <StyledPopoverButtonWrap ref={buttonWrapRef} onClick={() => setIsOpen(!isOpen)}>
                {children}
            </StyledPopoverButtonWrap>
            <StyledPopover isOpen={isOpen} placement={placement} ref={popoverRef}>
                <StyledHelpPopoverHeader>
                    <span>도움말</span>
                    <MdClose onClick={() => setIsOpen(false)} />
                </StyledHelpPopoverHeader>
                {content ? (
                    <StyledHelpPopoverBody ref={popOverBodyRef} dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                    <StyledHelpPopoverBody noData={true} ref={popOverBodyRef}>
                        데이터가 없습니다.
                    </StyledHelpPopoverBody>
                )}
            </StyledPopover>
        </>
    );
};
