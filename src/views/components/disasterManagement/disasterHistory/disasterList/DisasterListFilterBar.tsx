import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

import { FormControl, Stack } from "@innodep/tms-react-ui";
import moment from "moment";

import {
    DisastersFilterParams,
    setStoredDisastersFilterParams,
} from "../../../../../services/store/disasterManagement/disasters-slice";
import { useAppDispatch, useAppSelector } from "../../../../../services/store/hooks";
import { StyledSmButton } from "../../../../../styles/components/Button.styles";
import {
    StyledFilterBarFormInput,
    StyledFilterBarFormLabel,
    StyledFilterBarFormSelect,
} from "../../../../../styles/components/FilterBarForm.styles";

interface DateRange {
    min: string | undefined;
    max: string | undefined;
}

export const DisasterListFilterBar = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const storedInitData = useAppSelector((state) => state.initData);
    const { disasterCodes, situationCodes } = storedInitData;

    const storedDisasters = useAppSelector((state) => state.disasters);
    const { filterParams } = storedDisasters;

    const [condition, setCondition] = useState<DisastersFilterParams>(filterParams);

    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const [endDateRange, setEndDateRange] = useState<DateRange>({
        min: filterParams.start_time,
        max: currentDate,
    });

    /**
     * @name handleStartDateChange
     * @function
     * @description 기간검색 중 시작날짜 입력 필드 변경 이벤트 핸들러
     * @param {ChangeEvent<HTMLInputElement>} e
     * @return {void}
     */
    const handleStartDateChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newStartDate = e.target.value;
            let newEndDate = condition.end_time;
            if (moment(newStartDate, "YYYY-MM-DD", true).isValid()) {
                setEndDateRange({
                    ...endDateRange,
                    min: newStartDate,
                });
                if (moment(condition.end_time).isBefore(newStartDate)) {
                    newEndDate = newStartDate;
                }
            } else {
                setEndDateRange({
                    ...endDateRange,
                    min: undefined,
                });
            }
            setCondition({
                ...condition,
                start_time: newStartDate,
                end_time: newEndDate,
            });
        },
        [condition, endDateRange]
    );

    /**
     * @name handleChange
     * @function
     * @description 입력 필드 변경 이벤트 핸들러
     * @param {ChangeEvent<HTMLInputElement | HTMLSelectElement>} e
     * @return {void}
     */
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            e.stopPropagation();
            setCondition({
                ...condition,
                [e.target.name]: e.target.value,
            });
        },
        [condition]
    );

    /**
     * @name handleSubmit
     * @function
     * @description 전송 이벤트 핸들러
     * @param {FormEvent<HTMLFormElement>} e
     * @return {void}
     */
    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(setStoredDisastersFilterParams(condition));
        },
        [condition, dispatch]
    );

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <FormControl size="sm">
                    <Stack alignItems={"center"}>
                        <StyledFilterBarFormLabel htmlFor="situation_step">재난구분</StyledFilterBarFormLabel>
                        <StyledFilterBarFormSelect
                            id="situation_step"
                            name="situation_step"
                            value={condition.situation_step}
                            onChange={handleChange}
                        >
                            <option value="">전체</option>
                            {disasterCodes &&
                                disasterCodes.map((code) => (
                                    <option key={`key_${code.code}`} value={code.code}>
                                        {code.code_name}
                                    </option>
                                ))}
                        </StyledFilterBarFormSelect>
                    </Stack>
                </FormControl>
                <FormControl size="sm">
                    <Stack alignItems={"center"}>
                        <StyledFilterBarFormLabel htmlFor="situation_level1">재난상황</StyledFilterBarFormLabel>
                        <StyledFilterBarFormSelect
                            id="situation_level1"
                            name="situation_level1"
                            value={condition.situation_level1}
                            onChange={handleChange}
                        >
                            <option value="">전체</option>
                            {situationCodes &&
                                situationCodes.map((code) => (
                                    <option key={`key_${code.code}`} value={code.code}>
                                        {code.code_name}
                                    </option>
                                ))}
                        </StyledFilterBarFormSelect>
                    </Stack>
                </FormControl>
                <FormControl size="sm">
                    <Stack alignItems={"center"}>
                        <StyledFilterBarFormLabel htmlFor="start_time">기간검색</StyledFilterBarFormLabel>
                        <StyledFilterBarFormInput
                            type={"date"}
                            name={"start_time"}
                            id={"start_time"}
                            max={currentDate}
                            value={condition.start_time}
                            onChange={handleStartDateChange}
                        />
                        <StyledFilterBarFormInput
                            type={"date"}
                            name={"end_time"}
                            id={"end_time"}
                            max={currentDate}
                            value={condition.end_time}
                            onChange={handleChange}
                        />
                    </Stack>
                </FormControl>
                <StyledSmButton type="submit" variant="outline" size="sm">
                    검색
                </StyledSmButton>
            </Stack>
        </form>
    );
};
