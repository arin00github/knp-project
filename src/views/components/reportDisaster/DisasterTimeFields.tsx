/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";

import { FormControl, Input, Radio, RadioGroup, Stack } from "@innodep/tms-react-ui";
import { Field, FieldProps } from "formik";
import moment from "moment/moment";

import { GetSituationResponseResult } from "../../../services/api/tmsKnpNotice/TmsKnpNoticeInterface";
import { StyledFormErrorMessage, StyledFormFieldWrap, StyledFormLabel } from "../../../styles";

import { ReportDisasterTime } from "./ReportDisasterForm";

/**
 * component interface 정의 영역
 */
interface DisasterTimeFieldsProps {
    responseDetail?: GetSituationResponseResult;
    editable: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const DATE_CURRENT = "current"; // 발생시간 현재시간
export const DATE_CUSTOM = "custom"; // 발생시간 직접입력
export type DATE_TYPE = typeof DATE_CURRENT | typeof DATE_CUSTOM;

export const DisasterTimeFields = (props: DisasterTimeFieldsProps) => {
    const { responseDetail, editable, setFieldValue } = props;

    const [dateType, setDateType] = useState<DATE_TYPE>(DATE_CURRENT);

    // Field 이름 상수 선언
    const TIME_FIELD = "situation_time";

    /**
     * @name handleDateTypeChange
     * @function
     * @description 발생시간 현재시간/직접입력 변경 처리
     * @return {void}
     */
    const handleDateTypeChange = useCallback(
        (value: typeof DATE_CURRENT | typeof DATE_CUSTOM): void => {
            const newDate = value === DATE_CURRENT ? moment(new Date()).format("YYYY-MM-DD") : "";
            const newTime = value === DATE_CURRENT ? moment(new Date()).format("HH:mm") : "";
            const newDateTime: ReportDisasterTime = {
                date: newDate,
                time: newTime,
            };
            setFieldValue(TIME_FIELD, newDateTime);
            setDateType(value);
        },
        [setFieldValue]
    );

    /**
     * @private
     * @description [useEffect hooks] 선택된 대응 SOP 가 있는 경우, 상세 정보에 입력
     */
    useEffect(() => {
        if (responseDetail) {
            setDateType(DATE_CUSTOM);
        }
    }, [responseDetail]);

    return (
        <>
            <div>
                <StyledFormLabel>발생시간</StyledFormLabel>
                <StyledFormFieldWrap>
                    <RadioGroup size={"sm"} value={dateType} onChange={handleDateTypeChange} disabled={!editable}>
                        <Stack>
                            <Radio value={DATE_CURRENT}>현재시간</Radio>
                            <Radio value={DATE_CUSTOM}>직접입력</Radio>
                        </Stack>
                    </RadioGroup>
                </StyledFormFieldWrap>
            </div>
            <div>
                <StyledFormLabel />
                <StyledFormFieldWrap>
                    <Stack>
                        <Field name={"situation_time.date"}>
                            {({ field, meta }: FieldProps) => (
                                <FormControl
                                    size={"sm"}
                                    required
                                    disabled={!editable}
                                    readOnly={dateType === DATE_CURRENT}
                                    invalid={meta.touched && !!meta.error}
                                    style={{ width: "100%" }}
                                >
                                    <Input type="date" id={field.name} {...field} />
                                    <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name={"situation_time.time"}>
                            {({ field, meta }: FieldProps) => (
                                <FormControl
                                    size={"sm"}
                                    required
                                    disabled={!editable}
                                    readOnly={dateType === DATE_CURRENT}
                                    invalid={meta.touched && !!meta.error}
                                    style={{ width: "100%" }}
                                >
                                    <Input type="time" id={field.name} {...field} />
                                    <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                    </Stack>
                </StyledFormFieldWrap>
            </div>
        </>
    );
};
