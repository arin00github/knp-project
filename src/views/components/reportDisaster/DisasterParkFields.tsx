import React from "react";

import { FormControl, Select } from "@innodep/tms-react-ui";
import { Field, FieldProps } from "formik";

import { InitDataState } from "../../../services/store/common/init-data-slice";
import { useAppSelector } from "../../../services/store/hooks";
import { StyledFormErrorMessage, StyledFormFieldWrap, StyledFormLabel } from "../../../styles";

import { EDIT_ADD_DISASTER, EDIT_REPORT_MODE } from "./ReportDisasterForm";

/**
 * component interface 정의 영역
 */
interface DisasterParkFieldsProps {
    editable: boolean;
    mode: EDIT_REPORT_MODE;
}

export const DisasterParkFields = (props: DisasterParkFieldsProps) => {
    const { editable, mode } = props;

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { authParkCodes } = storedInitData;

    return (
        <Field name={"situation_national_park"}>
            {({ field, meta }: FieldProps) => (
                <FormControl
                    size={"sm"}
                    required
                    disabled={mode !== EDIT_ADD_DISASTER || !editable}
                    invalid={meta.touched && !!meta.error}
                >
                    <StyledFormLabel htmlFor={field.name}>국립공원</StyledFormLabel>
                    <StyledFormFieldWrap>
                        <Select id={field.name} {...field}>
                            <option value="">-선택-</option>
                            {authParkCodes.map((parkCode) => (
                                <option key={parkCode.code} value={parkCode.code}>
                                    {parkCode.code_name}
                                </option>
                            ))}
                        </Select>
                        <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
                    </StyledFormFieldWrap>
                </FormControl>
            )}
        </Field>
    );
};
