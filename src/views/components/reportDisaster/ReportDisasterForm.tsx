import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FormControl, Input, Stack, Text, useDisclosure } from "@innodep/tms-react-ui";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";
import moment from "moment";
import { BsQuestionCircle } from "react-icons/bs";
import styled from "styled-components";
import * as Yup from "yup";

import { GetSituationResponseResult } from "../../../services/api/tmsKnpNotice/TmsKnpNoticeInterface";
import {
    DSAS_EDIT,
    DSAS_PROCEED,
    MENU_SITU_NOTION_HIST,
    SITU_LEVEL,
    SITU_SAFETY_ACCIDENT,
    TRAIL_VICINITY,
} from "../../../services/constant";
import { useAppSelector } from "../../../services/store/hooks";
import { StyledSmButton } from "../../../styles/components/Button.styles";
import { StyledFormErrorMessage, StyledFormFieldWrap, StyledFormLabel } from "../../../styles/components/Form.styles";
import { StyledLayoutBodyWithFooter, StyledLayoutFooter } from "../../../styles/components/Layout.styles";
import { HelpPopover } from "../common";

import { DisasterLocationAndPlaceFields } from "./DisasterLocationAndPlaceFields";
import { DisasterParkFields } from "./DisasterParkFields";
import { DisasterTimeFields } from "./DisasterTimeFields";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledHelpPopoverWrap = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`;
export const StyledSubFormLabel = styled(StyledFormLabel)`
    width: 50px;
`;
export const StyledSubFormFieldWrap = styled(StyledFormFieldWrap)`
    width: calc(100% - 58px);
`;
export const StyledDescriptionMessage = styled.p`
    margin-top: -10px;
    color: var(--color-red);
    font-size: 12px;
`;

interface ReportDisasterFormProps {
    responseDetail?: GetSituationResponseResult;
    responseIndex?: number;
}

export interface ReportDisasterTime {
    date: string;
    time: string;
}

export interface ReportDisasterMessage {
    casualties: {
        dead: number;
        injury: number;
    };
    property_loss: {
        area: number;
        amount_money: number;
    };
    message: string;
    trail_vicinity: TRAIL_VICINITY;
}

export interface ReportDisasterTravelRoadControl {
    open: number;
    partial_open: number;
    close: number;
    total: number;
}

export interface ReportDisasterSms {
    use: boolean;
    template_id?: number;
    group: number[];
    user: string[];
    message: string;
}

export interface ReportDisasterFormValues {
    situation_user_name: string;
    situation_location: string;
    situation_place_name: string;
    situation_response_stage: string;
    situation_time: ReportDisasterTime;
    situation_national_park: string;
    situation_name: string;
    disaster_level: {
        level1: SITU_LEVEL;
        level2: string;
        level3: string;
    };
    situation_message: ReportDisasterMessage;
    situation_travel_road_control: ReportDisasterTravelRoadControl;
    sms: ReportDisasterSms;
    file_hwp: null | File;
    file_image: File[];
    delete_hwp_id_list: string[];
    delete_image_id_list: string[];
    situation_use_broadcast: boolean;
}

export const EDIT_ADD_DISASTER = "add-disaster"; // 상황전파
export const EDIT_ADD_RESPONSE = "add-response"; // 대응 SOP 등록
export const EDIT_MODIFY_RESPONSE = "modify-response"; // 대응 SOP 수정
export type EDIT_REPORT_MODE = typeof EDIT_ADD_DISASTER | typeof EDIT_ADD_RESPONSE | typeof EDIT_MODIFY_RESPONSE;

export const MESSAGE_COMMON = "common"; // 재난상황 level1 이 자연재난, 산불 인 경우
export const MESSAGE_ACCIDENT = "accident"; // 재난상황 level1 이 안전사고 인 경우
export type MESSAGE_TYPE = typeof MESSAGE_COMMON | typeof MESSAGE_ACCIDENT;

const SOP_HELP_TEMPLATE_TITLE = "SOP 도움말";

export const ReportDisasterForm = (props: ReportDisasterFormProps) => {
    const { responseDetail, responseIndex } = props;

    const storedInitData = useAppSelector((state) => state.initData);
    const { userAuth } = storedInitData;

    const authDelete = useMemo((): boolean => {
        const currentMenuRole = userAuth?.user_menu_role.find((role) => role.menu_code === MENU_SITU_NOTION_HIST);
        return currentMenuRole ? currentMenuRole.auth_delete : false;
    }, [userAuth?.user_menu_role]);

    const [mode, setMode] = useState<EDIT_REPORT_MODE>(EDIT_ADD_DISASTER);
    const [selectedId, setSelectedId] = useState<string>();
    const [selectedParentId, setSelectedParentId] = useState<string>();

    const [disasterLevelOneCode, setDisasterLevelOneCode] = useState<SITU_LEVEL>();
    const [messageType, setMessageType] = useState<MESSAGE_TYPE>(MESSAGE_COMMON);

    const [editable, setEditable] = useState<boolean>(true);

    const reportDisasterFormRef = useRef<FormikProps<ReportDisasterFormValues>>(null);

    const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const initialMessage = useMemo(
        (): ReportDisasterMessage => ({
            casualties: {
                dead: 0,
                injury: 0,
            },
            property_loss: {
                area: 0,
                amount_money: 0,
            },
            message: "",
            trail_vicinity: "",
        }),
        []
    );

    const initialTravelRoadControl = useMemo(
        (): ReportDisasterTravelRoadControl => ({
            open: 0,
            partial_open: 0,
            close: 0,
            total: 0,
        }),
        []
    );

    // 파일 업로드 제한
    const HWP_FILE_FORMATS = useMemo(() => [".hwp"], []);
    const HWP_FILE_SIZE = 10 * 1024 * 1024; // 파일 업로드 최대 용령: 10MB

    const [initialValues, setInitialValues] = useState<ReportDisasterFormValues>({
        situation_user_name: userAuth?.user_name || "",
        situation_location: "",
        situation_place_name: "",
        situation_response_stage: "1보",
        situation_time: {
            date: moment(new Date()).format("YYYY-MM-DD"),
            time: moment(new Date()).format("HH:mm"),
        },
        situation_national_park: "",
        situation_name: "",
        disaster_level: {
            level1: "",
            level2: "",
            level3: "",
        },
        situation_message: initialMessage,
        situation_travel_road_control: initialTravelRoadControl,
        sms: {
            use: false,
            group: [],
            user: [],
            message: "",
        },
        file_hwp: null,
        file_image: [],
        delete_hwp_id_list: [],
        delete_image_id_list: [],
        situation_use_broadcast: false,
    });

    const validationSchema = useMemo(
        (): Yup.ObjectSchema<any> =>
            Yup.object({
                situation_user_name: Yup.string(),
                situation_location: Yup.string().required("필수 입력값입니다."),
                situation_place_name: Yup.string().required("필수 입력값입니다."),
                situation_response_stage: Yup.string(),
                situation_time: Yup.object({
                    date: Yup.string().required("필수 입력값입니다."),
                    time: Yup.string().required("필수 입력값입니다."),
                }),
                situation_national_park: Yup.string().required("필수 입력값입니다."),
                situation_name: Yup.string().required("필수 입력값입니다."),
                disaster_level: Yup.object({
                    level1: Yup.string().required("필수 입력값입니다."),
                    level2: Yup.string().when("level1", {
                        is: (val: string) => !!(val && val.length > 0),
                        then: Yup.string().required("필수 입력값입니다."),
                    }),
                    level3: Yup.string().when(["level1", "level2"], {
                        is: (val1: string, val2: string) =>
                            val1 && val1.length > 0 && val1 === SITU_SAFETY_ACCIDENT && val2 && val2.length > 0,
                        then: Yup.string().required("필수 입력값입니다."),
                    }),
                }),
                situation_message: Yup.object(),
                situation_travel_road_control: Yup.object(),
                sms: Yup.object({
                    user: Yup.array().when("use", {
                        is: (val: boolean) => val,
                        then: Yup.array().of(Yup.string()).min(1, "필수 입력값입니다."),
                    }),
                    message: Yup.string().when("use", {
                        is: (val: boolean) => val,
                        then: Yup.string().required("필수 입력값입니다."),
                    }),
                }),
                file_hwp: Yup.mixed()
                    .nullable()
                    .notRequired()
                    .test(
                        "FILE_FORMAT",
                        "hwp 파일만 업로드가 가능합니다.",
                        (value) => !value || (value && HWP_FILE_FORMATS.find((format) => value.name.includes(format)))
                    )
                    .test(
                        "FILE_SIZE",
                        "최대 10MB만 등록 가능합니다.",
                        (value) => !value || (value && value.size <= HWP_FILE_SIZE)
                    ),
                file_image: Yup.mixed(),
                delete_hwp_id_list: Yup.array(),
                delete_image_id_list: Yup.array(),
                situation_use_broadcast: Yup.boolean(),
            }),
        [HWP_FILE_FORMATS, HWP_FILE_SIZE]
    );

    /**
     * @name getNewInitialValues
     * @function
     * @description 상세데이터를 사용하여 생성한 새 초기값 반환
     * @return {ReportDisasterFormValues}
     */
    const getNewInitialValues = useCallback(
        (detail: GetSituationResponseResult): ReportDisasterFormValues => {
            let currentFileHwp: null | File = null;
            const hwpFileList = detail.situation_file_hwp_info.situation_file_info_list;
            if (hwpFileList && hwpFileList.length > 0) {
                const fileInfo = hwpFileList[0];
                currentFileHwp = new File([], fileInfo.situation_file_name);
            }

            let currentFileImage: File[] = [];
            const imageFileList = detail.situation_file_image_info.situation_file_info_list;
            if (imageFileList && imageFileList.length > 0) {
                currentFileImage = imageFileList.map((fileInfo) => new File([], fileInfo.situation_file_name));
            }

            const currentMessage = {
                ...initialMessage,
                ...detail.situation_message,
            };

            return {
                ...detail,
                situation_location: `${detail.situation_location.x},${detail.situation_location.y}`,
                situation_response_stage: `${detail.situation_response_stage}보`,
                situation_time: {
                    date: moment(detail.situation_time).format("YYYY-MM-DD"),
                    time: moment(detail.situation_time).format("HH:mm"),
                },
                disaster_level: {
                    level1: detail.situation_level1,
                    level2: detail.situation_level2,
                    level3: detail.situation_level3,
                },
                situation_message: currentMessage,
                sms: {
                    use: detail.situation_use_sms,
                    template_id: detail.situation_send_sms_user.sms_template_id,
                    group: [],
                    user: [],
                    message: detail.situation_send_sms_message,
                },
                file_hwp: currentFileHwp,
                file_image: currentFileImage,
                delete_hwp_id_list: [],
                delete_image_id_list: [],
            };
        },
        [initialMessage]
    );

    /**
     * @private
     * @description [useEffect hooks] 상황전파 / 대응 SOP 등록 / 대응 SOP 수정 구분 처리
     */
    useEffect(() => {
        let currentReportMode: EDIT_REPORT_MODE;
        if (!responseDetail) {
            currentReportMode = EDIT_ADD_DISASTER;
        } else {
            setSelectedId(responseDetail.situation_uuid);
            if (responseDetail && responseDetail.situation_approval_step !== DSAS_EDIT) {
                currentReportMode = EDIT_ADD_RESPONSE;
            } else {
                currentReportMode = EDIT_MODIFY_RESPONSE;
            }
            const currentParentId = responseDetail.situation_parent_uuid || responseDetail.situation_uuid;
            setSelectedParentId(currentParentId);
        }
        setMode(currentReportMode);
    }, [responseDetail]);

    /**
     * @private
     * @description [useEffect hooks] 선택된 대응 SOP 가 있는 경우, 초기값 재설정
     */
    useEffect(() => {
        if (responseDetail) {
            const newInitialValues = getNewInitialValues(responseDetail);
            setInitialValues(newInitialValues);
        }
    }, [getNewInitialValues, responseDetail]);

    /**
     * @private
     * @description [useEffect hooks] 선택된 대응 SOP 가 아래 조건을 모두 충족하는 경우에만, Form 수정 가능
     * - 마지막 대응 SOP
     * - 재난구분이 '발생' 또는 '진행' 이거나, 재난구분이 '상황종료' 이면 승인상태가 '편집승인'
     */
    useEffect(() => {
        if (responseDetail) {
            // 마지막 대응 SOP 인지 판별
            const isLastResponse = responseIndex === 0;
            // 승인상태가 '진행중'이 아닌지 판별
            const isProceed = responseDetail.situation_approval_step === DSAS_PROCEED;
            // 승인상태가 '편집승인' 인지 판별
            const isEditApproved = responseDetail.situation_approval_step === DSAS_EDIT;
            setEditable(isLastResponse && (isProceed || (!isProceed && isEditApproved)));
        }
    }, [responseDetail, responseIndex]);

    useEffect(() => {
        // 재난상황 level1 이 '안전사고'인지에 따라 message 타입 지정
        const nesMessageType = disasterLevelOneCode !== SITU_SAFETY_ACCIDENT ? MESSAGE_COMMON : MESSAGE_ACCIDENT;
        setMessageType(nesMessageType);
    }, [disasterLevelOneCode]);

    /**
     * @name handleDeleteButtonClick
     * @function
     * @description 삭제 처리 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleDeleteButtonClick = useCallback(() => {
        onDeleteOpen();
    }, [onDeleteOpen]);

    /**
     * @name handleSubmitButtonClick
     * @function
     * @description 전송 버튼 클릭 이벤트 핸들러, 모든 입력필드 touched 처리 실행
     * @return {void}
     */
    const handleSubmitButtonClick = useCallback(() => {
        reportDisasterFormRef.current?.handleSubmit();
    }, []);

    /**
     * @name handleSubmit
     * @function
     * @description 전송 이벤트 핸들러
     * @return {void}
     */
    const handleSubmit = useCallback(() => {
        onReportOpen();
    }, [onReportOpen]);

    return (
        <>
            <StyledLayoutBodyWithFooter>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    innerRef={reportDisasterFormRef}
                >
                    {({ values, setFieldValue }: FormikProps<ReportDisasterFormValues>) => (
                        <Form>
                            <Stack flexDirection={"column"} gap={"12px"}>
                                <Field name={"situation_user_name"}>
                                    {({ field }: FieldProps) => (
                                        <FormControl size={"sm"} style={{ position: "relative" }}>
                                            <StyledFormLabel htmlFor={field.name}>작성자</StyledFormLabel>
                                            <StyledFormFieldWrap>
                                                <Text id={field.name} {...field} />
                                            </StyledFormFieldWrap>
                                            <StyledHelpPopoverWrap>
                                                <HelpPopover
                                                    templateTitle={SOP_HELP_TEMPLATE_TITLE}
                                                    placement="bottom-end"
                                                >
                                                    <StyledSmButton size={"sm"} variant="outline" colorScheme="gray">
                                                        도움말
                                                        <BsQuestionCircle />
                                                    </StyledSmButton>
                                                </HelpPopover>
                                            </StyledHelpPopoverWrap>
                                        </FormControl>
                                    )}
                                </Field>
                                {/* 위, 경도 & 위치 */}
                                <DisasterLocationAndPlaceFields
                                    editable={editable}
                                    setFieldValue={setFieldValue}
                                    initialLocation={initialValues.situation_location}
                                />
                                {/* 대응단계 */}
                                <Field name={"situation_response_stage"}>
                                    {({ field, meta }: FieldProps) => (
                                        <FormControl
                                            size={"sm"}
                                            disabled={!editable}
                                            invalid={meta.touched && !!meta.error}
                                        >
                                            <StyledFormLabel htmlFor={field.name}>대응단계</StyledFormLabel>
                                            <StyledFormFieldWrap>
                                                <Text id={field.name} {...field} />
                                            </StyledFormFieldWrap>
                                        </FormControl>
                                    )}
                                </Field>
                                {/* 발생시간 */}
                                <DisasterTimeFields
                                    responseDetail={responseDetail}
                                    editable={editable}
                                    setFieldValue={setFieldValue}
                                />
                                {/* 국립공원명 */}
                                <DisasterParkFields editable={editable} mode={mode} />
                                {/* 재난명 */}
                                <Field name={"situation_name"}>
                                    {({ field, meta }: FieldProps) => (
                                        <FormControl
                                            size={"sm"}
                                            required
                                            disabled={!editable}
                                            invalid={meta.touched && !!meta.error}
                                        >
                                            <StyledFormLabel htmlFor={field.name}>재난명</StyledFormLabel>
                                            <StyledFormFieldWrap>
                                                <Input id={field.name} {...field} />
                                                <StyledFormErrorMessage>{meta.error}</StyledFormErrorMessage>
                                            </StyledFormFieldWrap>
                                        </FormControl>
                                    )}
                                </Field>
                                {/* 재난상황 */}
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </StyledLayoutBodyWithFooter>
            <StyledLayoutFooter>
                {authDelete && (mode === EDIT_ADD_RESPONSE || mode === EDIT_MODIFY_RESPONSE) && (
                    <StyledSmButton size="sm" onClick={handleDeleteButtonClick}>
                        삭제
                    </StyledSmButton>
                )}
                <StyledSmButton size="sm" type="submit" onClick={handleSubmitButtonClick} disabled={!editable}>
                    {mode === EDIT_ADD_DISASTER && "상황전파"}
                    {mode === EDIT_ADD_RESPONSE && "등록"}
                    {mode === EDIT_MODIFY_RESPONSE && "수정"}
                </StyledSmButton>
            </StyledLayoutFooter>
        </>
    );
};
