import React, { useEffect, useRef } from "react";

import { FormControl, Input, Stack } from "@innodep/tms-react-ui";
import { Field, FieldProps } from "formik";
import styled from "styled-components";

import AttributeField from "./AttributeField";
import { EditAssetGroupFormValues } from "./EditFormPage";

import { StyledFormErrorMessage, StyledFormFieldWrap, StyledFormLabel } from "@/styles";

interface FormCollectionProps {
    values: EditAssetGroupFormValues;
    originData: EditAssetGroupFormValues;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    selectedRow: string | undefined;
}

const FormCollection = (props: FormCollectionProps) => {
    const { values, originData, setFieldValue, selectedRow } = props;

    const prevValuesRef = useRef<EditAssetGroupFormValues | undefined>();

    useEffect(() => {
        /**
         * 위에 if 조건과는 상관없이 무조건 새 values 값은 useRef값에 업데이트 시킴.
         */
        prevValuesRef.current = values;
    }, [values]);
    return (
        <div>
            <Stack flexDirection={"column"} gap={"12px"}>
                <Stack>
                    <StyledFirstRowLeftBox></StyledFirstRowLeftBox>
                    <StyledFirstRowRightBox>
                        <Field name="layer_name">
                            {({ field, meta }: FieldProps) => (
                                <FormControl size={"sm"} required invalid={meta.touched && !!meta.error}>
                                    <StyledFormLabelBold>자원종류명</StyledFormLabelBold>
                                    <StyledFormFieldWrap>
                                        <StyledShortInput
                                            id={field.name}
                                            {...field}
                                            placeholder="1~50자 한글,영문,숫자,공백, _ 입력"
                                        />
                                        <StyledFormErrorMessage className="error">{meta.error}</StyledFormErrorMessage>
                                    </StyledFormFieldWrap>
                                </FormControl>
                            )}
                        </Field>
                        <Field name={"layer_id"}>
                            {({ field, meta }: FieldProps) => (
                                <FormControl size={"sm"} required invalid={meta.touched && !!meta.error}>
                                    <StyledFormLabelBold htmlFor={field.name}>자원종류코드</StyledFormLabelBold>
                                    <StyledFormFieldWrap>
                                        <StyledShortInput
                                            id={field.name}
                                            readOnly={selectedRow !== undefined}
                                            {...field}
                                            placeholder="1~50자 영문소문자,숫자,_ 입력 (첫글자는 영문만 허용)"
                                        />
                                        <StyledFormErrorMessage className="error">{meta.error}</StyledFormErrorMessage>
                                    </StyledFormFieldWrap>
                                </FormControl>
                            )}
                        </Field>
                    </StyledFirstRowRightBox>
                </Stack>
                {/** 고정 항목 */}
                <AttributeField isConstant={true} values={values} />
                {/** 고정 항목 */}
                {/** 속성항목 */}
                <AttributeField
                    isConstant={false}
                    values={values}
                    setFieldValue={setFieldValue}
                    originData={originData}
                    modeState={selectedRow ? "edit" : "create"}
                />
                {/** 속성항목 */}
            </Stack>
        </div>
    );
};

const StyledFirstRowRightBox = styled.div`
    width: 65%;
    flex-basis: 65%;
    .error {
        margin-bottom: 0px !important;
    }
`;
const StyledFirstRowLeftBox = styled.div`
    width: 35%;
    flex-basis: 35%;
`;

const StyledShortInput = styled(Input)`
    max-width: 320px;
`;

const StyledFormLabelBold = styled(StyledFormLabel)`
    font-weight: 700;
    font-size: 14px;
`;

export default FormCollection;
