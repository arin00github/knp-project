import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDisclosure } from "@innodep/tms-react-ui";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { RiFileHwpFill, RiImage2Line } from "react-icons/ri";
import { ColumnDefinition, ReactTabulator } from "react-tabulator";
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";

import { NewTmsKnpNoticeInterface } from "../../../../../../services/api/tmsKnpNotice/TmsKnpNoticeApi";
import {
    GetSituationNoticeFile,
    GetSituationResponseResult,
} from "../../../../../../services/api/tmsKnpNotice/TmsKnpNoticeInterface";
import {
    setStoredResponsesSelectedIds,
    setStoredResponsesSelectedRow,
    setStoredResponsesSelectedRowIndex,
} from "../../../../../../services/store/disasterManagement/responses-slice";
import { useAppDispatch, useAppSelector } from "../../../../../../services/store/hooks";
import { badgeRenderer, buttonRenderer, getSituationColor } from "../../../../../../services/utils";
import { StyledTableIconButtonWrap } from "../../../../../../styles/components/Table.styles";

interface ResponseListTableProps {
    responses: GetSituationResponseResult[];
}

export const ResponseListTable = (props: ResponseListTableProps) => {
    const { responses } = props;

    const dispatch = useAppDispatch();

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const storedResponses = useAppSelector((state) => state.responses);
    const { loading, selectedIds } = storedResponses;

    const tableRef = useRef(null);
    const [isTableBuilt, setIsTableBuilt] = useState<boolean>(false);

    const [selectedFileImageInfoList, setSelectedFileImageInfoList] = useState<GetSituationNoticeFile[]>([]);

    /**
     * @name downloadSituationNoticeFile
     * @function
     * @description 상황 전파 or 대응 SOP 파일 다운로드 요청
     */
    const downloadSituationNoticeFile = useCallback((fileId: string) => {
        const tmsKnpNoticeService = NewTmsKnpNoticeInterface();
        tmsKnpNoticeService.downloadSituationNoticeFile({ situation_file_uuid: fileId }, true);
    }, []);

    /**
     * @name handleDownloadButtonClick
     * @function
     * @description 상황 전파 or 대응 SOP 파일 다운로드 처리 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleDownloadButtonClick = useCallback(
        (fileId: string) => {
            downloadSituationNoticeFile(fileId);
        },
        [downloadSituationNoticeFile]
    );

    /**
     * @name handleShowImagesButtonClick
     * @function
     * @description 이미지 보기 처리 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleShowImagesButtonClick = useCallback(
        (fileInfoList: GetSituationNoticeFile[]) => {
            setSelectedFileImageInfoList(fileInfoList);
            onOpen();
        },
        [onOpen]
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
                title: "재난상황",
                field: "situation_level1",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: (cell) => (cell.getValue() ? t(`SITUATION.${cell.getValue()}`) : "-"),
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
                title: "작성자",
                field: "situation_user_name",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: true,
            },
            {
                title: "최초 상황전파 시각",
                field: "situation_first_update_time",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: (cell) => (cell.getValue() ? moment(cell.getValue()).format("YYYY-MM-DD HH:mm:ss") : "-"),
                formatter: (cell) => (cell.getValue() ? moment(cell.getValue()).format("YYYY-MM-DD HH:mm:ss") : "-"),
            },
            {
                title: "상황전파 시각",
                field: "situation_update_time",
                sorter: "string",
                resizable: true,
                headerTooltip: true,
                tooltip: (cell) => (cell.getValue() ? moment(cell.getValue()).format("YYYY-MM-DD HH:mm:ss") : "-"),
                formatter: (cell) => (cell.getValue() ? moment(cell.getValue()).format("YYYY-MM-DD HH:mm:ss") : "-"),
            },
            {
                title: "대응단계",
                field: "situation_response_stage",
                sorter: "number",
                resizable: true,
                headerTooltip: true,
                tooltip: (cell) => (cell.getValue() ? `${cell.getValue()}보` : "-"),
                formatter: (cell) => (cell.getValue() ? `${cell.getValue()}보` : "-"),
            },
            {
                title: "첨부파일",
                field: "situation_file",
                headerSort: false,
                resizable: true,
                headerTooltip: true,
                formatter: (cell) => {
                    const rowData = cell.getRow().getData() as GetSituationResponseResult;

                    const divElement = document.createElement("div");
                    divElement.style.margin = "-5px 0";
                    divElement.style.display = "flex";
                    divElement.style.gap = "4px";

                    const hwpFileList = rowData.situation_file_hwp_info.situation_file_info_list;
                    if (hwpFileList && hwpFileList.length > 0) {
                        const hwpFile = hwpFileList[0];
                        const downloadHwpButtonElement = buttonRenderer(
                            <StyledTableIconButtonWrap>
                                <RiFileHwpFill />
                            </StyledTableIconButtonWrap>,
                            hwpFile.situation_file_uuid,
                            handleDownloadButtonClick
                        );
                        divElement.appendChild(downloadHwpButtonElement);
                    }

                    const imageFileList = rowData.situation_file_image_info.situation_file_info_list;
                    if (imageFileList && imageFileList.length > 0) {
                        const showImageButtonElement = buttonRenderer(
                            <StyledTableIconButtonWrap>
                                <RiImage2Line />
                            </StyledTableIconButtonWrap>,
                            imageFileList,
                            handleShowImagesButtonClick
                        );
                        divElement.appendChild(showImageButtonElement);
                    }

                    return divElement;
                },
            },
        ];
    }, [t, handleShowImagesButtonClick, handleDownloadButtonClick]);

    const data = useMemo((): GetSituationResponseResult[] => {
        if (!isTableBuilt) {
            return [];
        }
        const copyData: GetSituationResponseResult[] = JSON.parse(JSON.stringify(responses));
        return copyData.map((response, index) => {
            if (index === copyData.length - 1) {
                response.situation_update_time = "";
            }
            return response;
        });
    }, [responses, isTableBuilt]);

    /**
     * @private
     * @description [useEffect hooks] 컴포넌트 mount 시 store 값 설정
     */
    useEffect(() => {
        if (responses && responses.length > 0) {
            const selectedRow = responses[0];
            dispatch(setStoredResponsesSelectedRow(selectedRow));
            dispatch(setStoredResponsesSelectedRowIndex(0));
        }
    }, [dispatch, responses]);

    /**
     * @name handleTableBuilt
     * @function
     * @description 테이블 생성완료 이벤트 핸들러
     * @return {void}
     */
    const handleTableBuilt = useCallback(() => {
        setIsTableBuilt(true);
    }, []);

    /**
     * @name handleRowSelectionChanged
     * @function
     * @description 테이블 row 변경 이벤트 핸들러
     * @param {GetSituationResponseResult[]} data
     * @return {void}
     */
    const handleRowSelectionChanged = useCallback(
        (data: GetSituationResponseResult[]) => {
            const selectedIds = data.map((row) => row.situation_uuid);
            dispatch(setStoredResponsesSelectedIds(selectedIds));
        },
        [dispatch]
    );

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
            const selectedRow = row.getData() as GetSituationResponseResult;
            const tableData = row.getTable().getData() as GetSituationResponseResult[];
            const rowIndex = tableData.findIndex((response) => response.situation_uuid === selectedRow.situation_uuid);
            dispatch(setStoredResponsesSelectedRow(selectedRow));
            dispatch(setStoredResponsesSelectedRowIndex(rowIndex));
        },
        [dispatch]
    );

    return (
        <div>
            <ReactTabulator
                ref={tableRef}
                columns={columns}
                data={data}
                options={{
                    height: "calc(100% - 30px)",
                    layout: "fitColumns",
                    placeholder: "데이터가 없습니다.",
                }}
                events={{
                    tableBuilt: handleTableBuilt,
                    rowSelectionChanged: handleRowSelectionChanged,
                    rowClick: handleRowClick,
                }}
            />
        </div>
    );
};
