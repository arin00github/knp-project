import React, { useMemo } from "react";

import moment from "moment";
import { ColumnDefinition } from "react-tabulator";

import { AssetGroupListItem, GetLayerStylesResult, GetLayersResult } from "@/services/api/layer/LayerInterface";

interface ListPageBodyProps {
    data: AssetGroupListItem[];
    layers: GetLayersResult[];
    layerStyles: GetLayerStylesResult[];
}

const ListPageBody = (props: ListPageBodyProps) => {
    const { data, layers, layerStyles } = props;

    const [loading, setLoading] = React.useState<boolean>(false);

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

    return (
        <div>
            <div>ListBody</div>
        </div>
    );
};

export default ListPageBody;
