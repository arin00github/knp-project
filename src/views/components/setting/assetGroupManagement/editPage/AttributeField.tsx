import React, { useRef, useState } from "react";

import { Button, FormControl, Input, Select, Stack } from "@innodep/tms-react-ui";
import { Field, FieldArray, FieldProps } from "formik";
import { FaList, FaPlusCircle, FaTrash } from "react-icons/fa";
import styled from "styled-components";

import { EditAssetGroupFormValues } from "./EditFormPage";
import SelectOptionsForTypecd from "./SelectOptionsForTypecd";

import { AttributesGetType } from "@/services/api/layer/LayerInterface";
import { StyledFormErrorMessage, StyledTableWrap } from "@/styles";

interface AttributeFieldsProps {
    values: EditAssetGroupFormValues;
    isConstant: boolean;
    modeState?: "create" | "edit";
    originData?: EditAssetGroupFormValues;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const codeTypeArray = [
    { value: "STRING", name: "문자형" },
    { value: "NUMERIC", name: "숫자형" },
    { value: "TIMESTAMP", name: "날짜형" },
    { value: "CODE", name: "코드형" },
    { value: "ATTACH", name: "첨부파일형" },
    { value: "BOOLEAN", name: "논리형" },
    { value: "GEOMETRY", name: "위치형" },
];

const AttributeFields = ({ values, isConstant, modeState, setFieldValue }: AttributeFieldsProps) => {
    const removeBtnRef = useRef<HTMLButtonElement>(null);
    const fieldCommonName = isConstant ? "const_attributes" : "attributes";
    const isEdit = modeState === "edit";

    const [draggedItem, setDraggedItem] = useState<AttributesGetType | null>(null);

    const [selectedIndex, setSelectedIndex] = useState<number>();

    const [message, setMessage] = useState<string>("");

    /**
     * @name handleDragStart
     * @param e Drag 이벤트 오브젝트
     * @param index 배열의 인덱스값
     * @description 드래그 시작 시 실행하는 이벤트 핸들러.
     */
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedItem(values.attributes[index]);
        if (e.currentTarget.parentElement) {
            e.currentTarget.parentElement.className = "selected";
        }
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", "");
        e.dataTransfer.setDragImage(e.currentTarget.parentElement as HTMLElement, 20, 20);
    };

    /**
     * @name handleDragOver
     * @param e Drag 이벤트 오브젝트
     * @param index 배열의 인덱스값
     * @returns 함수 종료를 위해 return 사용
     * @description 드래그 진행(ex.다른 요소들 위로 이동) 시 실행되는 이벤트 핸들러
     */
    const handleDragOver = (e: React.DragEvent, index: number) => {
        const draggedOverItem = values.attributes[index];
        if (draggedItem === draggedOverItem) return;
        if (e.currentTarget.parentElement) {
            const tbodyChildren = e.currentTarget.parentElement.parentElement?.children;
            if (tbodyChildren) {
                Array.from(tbodyChildren).forEach((child) => {
                    child.className = "";
                });
            }
            e.currentTarget.parentElement.className = "selected";
        }
        const attributesCopy = values.attributes.filter((item) => item !== draggedItem);
        attributesCopy.splice(index, 0, draggedItem as AttributesGetType);
        if (setFieldValue) setFieldValue("attributes", attributesCopy);
    };

    /**
     * @name handleDragEnd
     * @param e Drag 이벤트 오브젝트
     * @description 드래그 끝날 시 실행되는 이벤트 핸들러
     */
    const handleDragEnd = (e: React.DragEvent) => {
        const attrReodering = values.attributes.map((attr, index) => {
            return { ...attr, ordering: index + 1 };
        });
        if (setFieldValue) setFieldValue("attributes", attrReodering);
        if (e.currentTarget.parentElement) {
            const tbodyChildren = e.currentTarget.parentElement.parentElement?.children;
            if (tbodyChildren) {
                Array.from(tbodyChildren).forEach((child) => {
                    child.className = "";
                });
            }
        }
    };

    const pushAttribute = isEdit
        ? { name: "", comment: "", type: "", type_cd: "", exec: "ADD", ordering: values.attributes.length + 1 }
        : { name: "", comment: "", type: "", type_cd: "", ordering: values.attributes.length + 1 };

    return (
        <div>
            <FieldArray name="attriutes">
                {({ push, remove }) => (
                    <StyledTableBox>
                        <Stack>
                            <StyledSubTitle>{!isConstant ? "속성 항목" : "기본항목 (고정)"}</StyledSubTitle>
                            {!isConstant && (
                                <PlusIconButton onClick={() => push(pushAttribute)}>
                                    <FaPlusCircle />
                                </PlusIconButton>
                            )}
                        </Stack>
                        <StyledTable>
                            <thead>
                                <tr>
                                    <th style={{ width: "3%" }}></th>
                                    <th style={{ width: "7%" }}>순서</th>
                                    <th style={{ width: "23%" }}>항목이름</th>
                                    <th style={{ width: "23%" }}>항목코드</th>
                                    <th style={{ width: "17%" }}>유형</th>
                                    <th style={{ width: "17%" }}>코드유형</th>
                                    <th style={{ width: "10%" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {values[fieldCommonName].map((fieldControl, index) => (
                                    <tr key={`constant_attr_${index}`}>
                                        {isConstant ? (
                                            <td
                                                style={{ width: "3%" }}
                                                className="drag centerbox order"
                                                onDragStart={(e) => handleDragStart(e, index)}
                                                onDragOver={(e) => handleDragOver(e, index)}
                                                onDragEnd={(e) => handleDragEnd(e)}
                                            >
                                                <FaList />
                                            </td>
                                        ) : (
                                            <td style={{ width: "3%" }} className="centerbox"></td>
                                        )}

                                        <td style={{ width: "7%" }} className="centerbox">
                                            <span>{index + 1}</span>
                                        </td>
                                        <td style={{ width: "23%" }}>
                                            <Field name={`${fieldCommonName}.${index}.comment`}>
                                                {({ field, meta }: FieldProps) => (
                                                    <FormControl
                                                        size={"sm"}
                                                        required
                                                        invalid={meta.touched && !!meta.error}
                                                        style={{ padding: "4px 0" }}
                                                    >
                                                        <Input
                                                            id={field.name}
                                                            readOnly={isConstant}
                                                            {...field}
                                                            onChange={field.onChange}
                                                            placeholder="1~50자 한글, 영문, 숫자, 공백, _ 입력 가능"
                                                        />
                                                        <StyledFormErrorMessage className="error">
                                                            {meta.error}
                                                        </StyledFormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </td>
                                        <td style={{ width: "23%" }}>
                                            <Field name={`${fieldCommonName}.${index}.name`}>
                                                {({ field, meta }: FieldProps) => (
                                                    <FormControl
                                                        size={"sm"}
                                                        required
                                                        invalid={meta.touched && !!meta.error}
                                                        style={{ padding: "4px 0" }}
                                                    >
                                                        <Input
                                                            id={field.name}
                                                            readOnly={
                                                                isConstant || (isEdit && fieldControl.exec !== "ADD")
                                                            }
                                                            {...field}
                                                            onChange={field.onChange}
                                                            placeholder="1~50자 영문, 숫자, 공백, _ 입력 가능"
                                                        />
                                                        <StyledFormErrorMessage className="error">
                                                            {meta.error}
                                                        </StyledFormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </td>
                                        <td style={{ width: "17%" }}>
                                            <Field name={`${fieldCommonName}.${index}.type`}>
                                                {({ field, meta }: FieldProps) => (
                                                    <FormControl
                                                        size={"sm"}
                                                        required
                                                        invalid={meta.touched && !!meta.error}
                                                        style={{ padding: "4px 0" }}
                                                    >
                                                        <Select readOnly={isConstant} id={field.name} {...field}>
                                                            <option value="">유형선택</option>
                                                            {codeTypeArray.map((type) => (
                                                                <option value={type.value} key={`type_${type.value}`}>
                                                                    {type.name}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                        <StyledFormErrorMessage className="error">
                                                            {meta.error}
                                                        </StyledFormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </td>
                                        <SelectOptionsForTypecd
                                            fieldCommonName={fieldCommonName}
                                            arrayIndex={index}
                                            values={values}
                                            readonly={isConstant}
                                        />
                                        {!isConstant && (
                                            <td style={{ width: "10%" }}>
                                                <IconButton
                                                    onClick={() => {
                                                        if (isEdit) {
                                                            //
                                                        }
                                                    }}
                                                >
                                                    <FaTrash />
                                                </IconButton>
                                                <button
                                                    ref={removeBtnRef}
                                                    type="button"
                                                    hidden
                                                    id="delete-attribute"
                                                    onClick={() => {
                                                        if (selectedIndex) remove(selectedIndex);
                                                    }}
                                                ></button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                {values.const_attributes.length < 1 && (
                                    <tr>
                                        <EmptyTdBox>기본 속성 값이 없습니다.</EmptyTdBox>
                                    </tr>
                                )}
                            </tbody>
                        </StyledTable>
                    </StyledTableBox>
                )}
            </FieldArray>
        </div>
    );
};

const PlusIconButton = styled(Button)`
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-color: transparent;
    color: #a1a1a1;

    &:hover,
    :focus {
        background-color: #fff;
        color: #434343;
    }
`;

const IconButton = styled(Button)`
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-color: transparent;
    color: #696969;
    border: 1px solid transparent;

    &:hover,
    :focus {
        background-color: #fff;
        color: #696969;
        border-color: #696969;
    }
`;

const EmptyTdBox = styled.td`
    text-align: center;
    height: 200px;
    line-height: 200px;
    width: 100%;
`;

const StyledSubTitle = styled.div`
    margin-top: 12px;
    padding-bottom: 12px;
    font-weight: 700;
    font-size: 14px;
`;

const StyledTableBox = styled(StyledTableWrap)`
    width: 100%;
    padding: 0;
    margin-top: 12px;
`;
const StyledTable = styled.table`
    width: 100%;

    tbody {
        //display: table-row;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 220px;
        overflow-y: scroll;
    }

    tr {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #dfdfdf;
    }
    tr th {
        font-size: 13px;
    }
    tr td {
        display: block;
    }
    tr td.centerbox {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    tr td.drag {
        color: #fff;
    }
    tr td.undrag {
        color: #fff;
    }
    tr td.drag:hover {
        color: #a9a9a9;
    }

    tr.selected {
        background-color: #b9d9e8;
    }

    th,
    td {
        text-align: center;
        padding: 6px 4px;
    }

    > td input {
        width: 180px;
    }

    .error {
        margin-bottom: 0px !important;
    }
`;

export default AttributeFields;
