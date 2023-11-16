import React, { useCallback, useMemo, useRef, useState } from "react";

import { useDisclosure } from "@innodep/tms-react-ui";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { RiFileHwpFill, RiImage2Line } from "react-icons/ri";
import { useHistory } from "react-router";
import { ColumnDefinition, ReactTabulator } from "react-tabulator";
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";

import { NewTmsKnpNoticeInterface } from "../../../../../services/api/tmsKnpNotice/TmsKnpNoticeApi";
import {
    ApproveSituationNoticeModifyResponse,
    GetSituationNoticeImagePreviewResponse,
    GetSituationNoticeImagePreviewResult,
    GetSituationNoticeResult,
} from "../../../../../services/api/tmsKnpNotice/TmsKnpNoticeInterface";
import {
    DSAS_EDIT,
    DSAS_END,
    DSAS_END_REQ,
    MENU_SITU_NOTION_HIST,
    DS_OCCUR,
    DS_PROCEED,
    DS_OCCUR_AND_PROCEED,
} from "../../../../../services/constant";
import { InitDataState } from "../../../../../services/store/common/init-data-slice";
import {
    DisastersFilterParams,
    setStoredDisastersLoading,
    setStoredDisastersSelectedIds,
} from "../../../../../services/store/disasterManagement/disasters-slice";
import { useAppDispatch, useAppSelector } from "../../../../../services/store/hooks";
import { badgeRenderer, buttonRenderer, getSituationColor } from "../../../../../services/utils";
import { StyledSmButton } from "../../../../../styles/components/Button.styles";
import { StyledTableIconButtonWrap, StyledTableWrap } from "../../../../../styles/components/Table.styles";
import { TableRowCount } from "../../../common/TableRowCount";

import { ApproveDisasterEndDialog } from "./ApproveDisasterEndDialog";
import { ImageCarouselDialog } from "./ImageCarouselDialog";

interface DisasterListTableProps {
    disasters: GetSituationNoticeResult[];
}

export const DisasterListTable = (props: DisasterListTableProps): JSX.Element => {
    const { disasters } = props;

    console.log("disasters", disasters);

    const dispatch = useAppDispatch();
    const history = useHistory();
    const tableRef = useRef(null);

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { userAuth } = storedInitData;

    const storedDisasters = useAppSelector((state) => state.disasters);
    const { loading, filterParams, selectedIds } = storedDisasters;

    const [selectedFileImageInfoList, setSelectedFileImageInfoList] = useState<GetSituationNoticeImagePreviewResult[]>(
        []
    );

    const [selectedDisasterIdForApproveEnd, setSelectedDisasterIdForApproveEnd] = useState<string>("");

    const { isOpen: isImageCarouselOpen, onOpen: onImageCarouselOpen, onClose: onImageCarouselClose } = useDisclosure();
    const { isOpen: isApproveEndOpen, onOpen: onApproveEndOpen, onClose: onApproveEndClose } = useDisclosure();

    const { t } = useTranslation();

    const authApproval = useMemo(() => {
        const currentMenuRole = userAuth?.user_menu_role.find((role) => role.menu_code === MENU_SITU_NOTION_HIST);
        return currentMenuRole ? currentMenuRole.auth_approval : false;
    }, [userAuth?.user_menu_role]);

    /**
     * @name approveSituationNoticeModify
     * @async
     * @function
     * @description 상황 전파 상황 편집 승인
     * @return {Promise<ApproveSituationNoticeModifyResponse>}
     */
    const approveSituationNoticeModify = useCallback(
        async (disasterId: string): Promise<ApproveSituationNoticeModifyResponse> => {
            const tmsKnpNoticeService = NewTmsKnpNoticeInterface();
            const approveModifyRes = await tmsKnpNoticeService.approveSituationNoticeModify({
                situation_uuid: disasterId,
            });
            return new Promise((resolve, reject) => {
                if (approveModifyRes?.code === 200) {
                    resolve(approveModifyRes as ApproveSituationNoticeModifyResponse);
                } else {
                    reject(approveModifyRes?.message);
                }
            });
        },
        []
    );

    /**
     * @name handleApproveModifyButtonClick
     * @function
     * @description 상황 전파 상황 편집 승인 처리 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleApproveModifyButtonClick = useCallback(
        (disasterId: string) => {
            approveSituationNoticeModify(disasterId).then(() => {
                dispatch(setStoredDisastersLoading(true));
            });
        },
        [approveSituationNoticeModify, dispatch]
    );

    /**
     * @name handleApproveEndButtonClick
     * @function
     * @description 상황 전파 상황 종료 요청 승인 처리 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleApproveEndButtonClick = useCallback(
        (disasterId: string) => {
            setSelectedDisasterIdForApproveEnd(disasterId);
            onApproveEndOpen();
        },
        [onApproveEndOpen]
    );

    /**
     * @name downloadSituationNoticeHwpFile
     * @function
     * @description 상황 전파 목록 파일 다운로드
     */
    const downloadSituationNoticeHwpFile = useCallback((responseId: string) => {
        const tmsKnpNoticeService = NewTmsKnpNoticeInterface();
        tmsKnpNoticeService.downloadSituationNoticeHwpFile({ situation_last_uuid: responseId });
    }, []);

    /**
     * @name handleDownloadButtonClick
     * @function
     * @description 상황 전파 목록 파일 다운로드 처리 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleDownloadButtonClick = useCallback(
        (responseId: string) => {
            downloadSituationNoticeHwpFile(responseId);
        },
        [downloadSituationNoticeHwpFile]
    );

    /**
     * @name getSituationNoticeImagePreview
     * @async
     * @function
     * @description 상황 전파 이력 요청
     * @return {Promise<GetSituationNoticeImagePreviewResponse>}
     */
    const getSituationNoticeImagePreview = useCallback(
        async (responseId: string): Promise<GetSituationNoticeImagePreviewResponse> => {
            const tmsKnpNoticeService = NewTmsKnpNoticeInterface();
            const getSituateImagePreviewRes = await tmsKnpNoticeService.getSituationNoticeImagePreview({
                situation_last_uuid: responseId,
            });
            return new Promise((resolve, reject) => {
                if (getSituateImagePreviewRes?.code === 200) {
                    resolve(getSituateImagePreviewRes as GetSituationNoticeImagePreviewResponse);
                } else {
                    reject(getSituateImagePreviewRes?.message);
                }
            });
        },
        []
    );

    /**
     * @name handleShowImagesButtonClick
     * @function
     * @description 이미지 보기 처리 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleShowImagesButtonClick = useCallback(
        (responseId: string) => {
            getSituationNoticeImagePreview(responseId).then((getImagePreiveRes) => {
                setSelectedFileImageInfoList(getImagePreiveRes.response.results);
                onImageCarouselOpen();
            });
        },
        [getSituationNoticeImagePreview, onImageCarouselOpen]
    );

    const columns = useMemo((): ColumnDefinition[] => {
        return [
            {
                title: "",
                formatter: "rowSelection",
                titleFormatter: "rowSelection",
                headerHozAlign: "center",
                hozAlign: "center",
                vertAlign: "middle",
                headerSort: false,
                width: 30,
            },
            {
                title: "재난구분",
                field: "situation_step",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: (cell) => {
                    return cell.getValue() ? t(`DISASTER.${cell.getValue()}`) : "-";
                },
                formatter: (cell) => {
                    return cell.getValue() ? t(`DISASTER.${cell.getValue()}`) : "-";
                },
            },
            {
                title: "재난상황",
                field: "situation_level1",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: (cell) => {
                    return cell.getValue() ? t(`SITUATION.${cell.getValue()}`) : "-";
                },
                formatter: (cell) => {
                    if (cell.getValue()) {
                        const value = cell.getValue();
                        const situationColor = getSituationColor(value);
                        return badgeRenderer(t(`SITUATION.${value}`), situationColor);
                    }
                    return "-";
                },
            },
            {
                title: "재난명",
                field: "situation_name",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: true,
            },
            {
                title: "위치",
                field: "situation_place_name",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: true,
            },
            {
                title: "전파자",
                field: "situation_user_name",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: true,
            },
            {
                title: "상황전파 시각",
                field: "situation_update_time",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: (cell) => {
                    return cell.getValue() ? moment(cell.getValue()).format("YYYY-MM-DD HH:mm:ss") : "-";
                },
                formatter: (cell) => {
                    return cell.getValue() ? moment(cell.getValue()).format("YYYY-MM-DD HH:mm:ss") : "-";
                },
            },
            {
                title: "상황전파 국립공원",
                field: "situation_national_park",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: (cell) => {
                    return cell.getValue() ? t(`PARK.${cell.getValue()}`) : "-";
                },
                formatter: (cell) => {
                    return cell.getValue() ? t(`PARK.${cell.getValue()}`) : "-";
                },
            },
            {
                title: "대응단계",
                field: "situation_response_stage",
                sorter: "number",
                resizable: true,
                headerTooltip: true,
                tooltip: (cell) => {
                    return cell.getValue() ? `${cell.getValue()}보` : "-";
                },
                formatter: (cell) => {
                    return cell.getValue() ? `${cell.getValue()}보` : "-";
                },
            },
            {
                title: "첨부파일",
                field: "situation_file",
                headerSort: false,
                resizable: true,
                headerTooltip: true,
                formatter: (cell) => {
                    const rowData = cell.getRow().getData() as GetSituationNoticeResult;

                    const divElement = document.createElement("div");
                    divElement.style.margin = "-5px 0";
                    divElement.style.display = "flex";
                    divElement.style.gap = "4px";

                    if (rowData.exists_file) {
                        const downloadHwpButtonElement = buttonRenderer(
                            <StyledTableIconButtonWrap>
                                <RiFileHwpFill />
                            </StyledTableIconButtonWrap>,
                            rowData.situation_last_uuid,
                            handleDownloadButtonClick
                        );
                        divElement.appendChild(downloadHwpButtonElement);
                    }

                    if (rowData.exists_image) {
                        const showImageButtonElement = buttonRenderer(
                            <StyledTableIconButtonWrap>
                                <RiImage2Line />
                            </StyledTableIconButtonWrap>,
                            rowData.situation_last_uuid,
                            handleShowImagesButtonClick
                        );
                        divElement.appendChild(showImageButtonElement);
                    }

                    return divElement;
                },
            },
            {
                title: "작업",
                field: "situation_approval",
                headerSort: false,
                resizable: true,
                headerTooltip: true,
                formatter: (cell) => {
                    const rowData = cell.getRow().getData() as GetSituationNoticeResult;

                    const divElement = document.createElement("div");
                    divElement.style.margin = "-5px 0";

                    // 승인상태가 '종료승인요청' 인 경우
                    if (rowData.situation_approval_step === DSAS_END_REQ) {
                        if (authApproval) {
                            const approveEndButtonElement = buttonRenderer(
                                <StyledSmButton size="sm" variant="outline" colorScheme={"gray"}>
                                    상황종료 승인
                                </StyledSmButton>,
                                rowData.situation_uuid,
                                handleApproveEndButtonClick
                            );
                            divElement.appendChild(approveEndButtonElement);
                        } else {
                            const textElement = document.createElement("div");
                            textElement.innerHTML = "상황종료 승인요청";
                            textElement.style.lineHeight = "24px";
                            divElement.appendChild(textElement);
                        }
                    }

                    // 승인상태가 '상황종료' 인 경우
                    if (rowData.situation_approval_step === DSAS_END) {
                        if (authApproval) {
                            const approveModifyButtonElement = buttonRenderer(
                                <StyledSmButton size="sm" variant="outline" colorScheme={"gray"}>
                                    편집 승인
                                </StyledSmButton>,
                                rowData.situation_uuid,
                                handleApproveModifyButtonClick
                            );
                            divElement.appendChild(approveModifyButtonElement);
                        }
                    }

                    // 승인상태가 '편집가능' 인 경우
                    if (rowData.situation_approval_step === DSAS_EDIT) {
                        const textElement = document.createElement("div");
                        textElement.innerHTML = "편집 가능";
                        textElement.style.lineHeight = "24px";
                        divElement.appendChild(textElement);
                    }

                    return divElement;
                },
            },
        ];
    }, [
        authApproval,
        handleApproveEndButtonClick,
        handleApproveModifyButtonClick,
        handleDownloadButtonClick,
        handleShowImagesButtonClick,
        t,
    ]);

    const customFilter = useCallback((data: GetSituationNoticeResult, filterParams: DisastersFilterParams) => {
        const { situation_step, situation_level1, start_time, end_time } = filterParams;
        let isValid = true;
        if (isValid && situation_step) {
            if (situation_step === DS_OCCUR_AND_PROCEED) {
                isValid = data.situation_step === DS_OCCUR || data.situation_step === DS_PROCEED;
            } else {
                isValid = data.situation_step === DS_PROCEED;
            }
        }
        if (isValid && situation_level1) {
            isValid = data.situation_level1 === situation_level1;
        }
        if (isValid && (start_time || end_time)) {
            if (start_time === "") {
                isValid = moment(data.situation_update_time, "YYYY-MM-DD").isSameOrBefore(end_time);
            } else if (end_time === "") {
                isValid = moment(data.situation_update_time, "YYYY-MM-DD").isSameOrAfter(end_time);
            } else {
                isValid = moment(data.situation_update_time, "YYYY-MM-DD").isBetween(
                    start_time,
                    end_time,
                    undefined,
                    "[]"
                );
            }
        }
        return isValid;
    }, []);

    const data = useMemo((): GetSituationNoticeResult[] => {
        return disasters.filter((disaster) => customFilter(disaster, filterParams));
    }, [customFilter, disasters, filterParams]);

    /**
     * @name handleRowClick
     * @function
     * @description 테이블 row 클릭 이벤트 핸들러
     * @param {UIEvent} e
     * @param {Tabulator.RowComponent} row
     * @return {void}
     */
    const handleRowClick = useCallback(
        (e: UIEvent, row: Tabulator.RowComponent) => {
            const selectedRow = row.getData() as GetSituationNoticeResult;
            const selectedId = selectedRow.situation_uuid;
            history.push(`/disaster-management/disaster-history/responses/${selectedId}`);
        },
        [history]
    );

    /**
     * @name handleRowSelectionChanged
     * @function
     * @description 테이블 row 변경 이벤트 핸들러
     * @param {GetSituationNoticeResult[]} data
     * @return {void}
     */
    const handleRowSelectionChanged = useCallback(
        (data: GetSituationNoticeResult[]) => {
            const selectedIds = data.map((row) => row.situation_uuid);
            dispatch(setStoredDisastersSelectedIds(selectedIds));
        },
        [dispatch]
    );

    return (
        <StyledTableWrap>
            <ReactTabulator
                ref={tableRef}
                data={data}
                columns={columns}
                options={{
                    height: "calc(100% - 30px)",
                    layout: "fitColumns",
                    placeholder: "데이터가 없습니다.",
                }}
                events={{ rowSelectionChanged: handleRowSelectionChanged, rowClick: handleRowClick }}
            />
            <TableRowCount totalCount={data.length} selectedCount={selectedIds.length} />
            <ImageCarouselDialog
                isOpen={isImageCarouselOpen}
                fileImageInfoList={selectedFileImageInfoList}
                onClose={onImageCarouselClose}
            />
            <ApproveDisasterEndDialog
                disasterId={selectedDisasterIdForApproveEnd}
                isOpen={isApproveEndOpen}
                onClose={onApproveEndClose}
            />
        </StyledTableWrap>
    );
};
