import React, { useCallback, useMemo } from "react";

import moment from "moment";
import { ColumnDefinition, ReactTabulator } from "react-tabulator";
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";

import { AssetGroupListItem } from "@/services/api/layer/LayerInterface";
import { useAppDispatch, useAppSelector } from "@/services/store/hooks";
import { setIsFormOpen, setStoredSelectedRow } from "@/services/store/setting/asset-group-slice";
import { StyledTableWrap } from "@/styles";
import { TableRowCount } from "@/views/components/common/TableRowCount";

interface ListPageBodyProps {
    data: AssetGroupListItem[];
}

const ListPageBody = (props: ListPageBodyProps) => {
    const { data } = props;

    const dispatch = useAppDispatch();

    const storedAssetGroups = useAppSelector((state) => state.assetGroup);
    const { filterParams } = storedAssetGroups;

    const tableRef = React.useRef<typeof ReactTabulator>(null);

    /**
     * @private
     * @description Tabulator 테이블 컬럼 정의
     */
    const columns = useMemo((): ColumnDefinition[] => {
        return [
            {
                title: "아이콘",
                field: "icon_image",
                headerHozAlign: "center",
                hozAlign: "center",
                vertAlign: "middle",
                headerSort: false,
                width: 80,
                tooltip: true,
                formatter: (cell) => {
                    const data = cell.getData() as AssetGroupListItem;
                    let cellbox;
                    if (data.icon.image) {
                        const image = document.createElement("img");
                        image.style.width = "22px";
                        image.style.height = "22px";
                        image.src = data.icon.image;
                        cellbox = image;
                    } else {
                        const emptybox = document.createElement("span");
                        emptybox.style.width = "22px";
                        emptybox.style.height = "22px";
                        emptybox.style.lineHeight = "22px";
                        emptybox.style.color = "#fff";
                        emptybox.style.borderRadius = "11px";
                        emptybox.style.backgroundColor = "#8d8d8d";
                        emptybox.textContent = "No";
                        cellbox = emptybox;
                    }
                    return cellbox;
                },
            },
            {
                title: "자원종류명",
                field: "layer_name",
                sorter: "string",
                vertAlign: "middle",
                resizable: false,
                tooltip: true,
            },

            {
                title: "자원종류코드",
                field: "layer_id",
                sorter: "string",
                vertAlign: "middle",
                resizable: false,
                tooltip: true,
                formatter: (cell) => {
                    const cellValue = cell.getValue() as string;
                    const spanbox = document.createElement("span");
                    spanbox.style.display = "block";
                    spanbox.style.width = "100%";
                    spanbox.style.overflow = "hidden";
                    spanbox.style.whiteSpace = "nowrap";
                    spanbox.style.textOverflow = "ellipsis";
                    spanbox.textContent = cellValue;
                    if (cellValue.length > 20) {
                        spanbox.title = cellValue;
                    }
                    return spanbox;
                },
            },
            {
                title: "등록일",
                field: "reg_date",
                sorter: "string",
                vertAlign: "middle",
                resizable: false,
                formatter: (cell) => {
                    if (cell.getValue()) {
                        return moment(cell.getValue()).format("YYYY-MM-DD HH:mm:ss");
                    }
                    return "-";
                },
            },
        ];
    }, []);

    const customFilter = useCallback((data: AssetGroupListItem, filterParams: { search_word?: string }) => {
        const { search_word } = filterParams;

        let isValid = true;
        if (isValid && search_word && search_word !== "") {
            const regex = new RegExp(search_word, "i");
            isValid = regex.test(data.layer_name) || regex.test(data.layer_id);
        }

        return isValid;
    }, []);

    const filterdData = useMemo(() => {
        return data.filter((item) => customFilter(item, filterParams));
    }, [filterParams, data, customFilter]);

    const handleRowClick = useCallback(
        (e: UIEvent, row: Tabulator.RowComponent) => {
            const selectData = row.getData();
            dispatch(setIsFormOpen(true));
            dispatch(setStoredSelectedRow(selectData.layer_id));
        },
        [dispatch]
    );

    return (
        <StyledTableWrap>
            <ReactTabulator
                ref={tableRef}
                data={filterdData}
                columns={columns}
                options={{
                    height: "calc(100% - 30px)",
                    layout: "fitColumns",
                    placeholder: "데이터가 없습니다.",
                }}
                events={{
                    rowClick: handleRowClick,
                }}
            />
            <TableRowCount totalCount={filterdData.length} />
        </StyledTableWrap>
    );
};

export default ListPageBody;
