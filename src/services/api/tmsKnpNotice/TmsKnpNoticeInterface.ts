/**
 * tms-knp-notice 통신 데이터 인터페이스 정의 파일
 * @file src/services/api/tmsKnpNotice/TmsKnpNoticeInterface.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-11-21, 최초 작성
 */

import { DS_STEP, DSAS_STEP, SITU_LEVEL, TRAIL_VICINITY } from "../../constant";

/*******************************************************************************
 * common interface
 *******************************************************************************/
interface TmsKnpNoticeResponse {
    code: number;
    message: string;
    responseTime: string;
}

export interface ErrorResponse {
    code: number;
    message: string;
    responseTime: string;
    response: undefined;
}

/*******************************************************************************
 * Broadcast Record (방송이력)
 *******************************************************************************/
/**
 * 방송이력 조회 API interface
 */
export interface GetBroadcastParams {
    situation_level1?: SITU_LEVEL;
    situation_national_park?: string;
    start_time?: string;
    end_time?: string;
}

export interface GetBroadcastResult {
    broadcast_uid: string;
    broadcast_content: string;
    broadcast_result: true;
    broadcast_type: string;
    creator: string;
    situation_national_park: string;
    situation_name: string;
    situation_level1: SITU_LEVEL;
    situation_update_time: string;
}

export interface GetBroadcastResponse extends TmsKnpNoticeResponse {
    response: {
        results: GetBroadcastResult[];
        total_count: number;
    };
}

/**
 * 방송 이력 삭제 API interface
 */
export interface DeleteBroadcastParams {
    broadcast_uuid_list: string[];
}

export interface DeleteBroadcastResponse extends TmsKnpNoticeResponse {
    response: null;
}

/**
 * 방송 이력 엑셀 다운로드 요청 API interface
 */
export interface ExportBroadcastsParams {
    situation_level1?: SITU_LEVEL;
    situation_national_park?: string;
    start_time?: string;
    end_time?: string;
}

/*******************************************************************************
 * Notify Service Common (상황전파 or 대응 SOP 파일 다운로드 요청)
 *******************************************************************************/
/**
 * 상황 전파 or 대응 SOP 파일 다운로드 요청 API interface
 */
export interface DownloadSituationNoticeFileParams {
    situation_file_uuid: string;
}

/**
 * 상황 전파 목록 파일 다운로드 API interface
 */
export interface DownloadSituationNoticeHwpFileParams {
    situation_last_uuid: string;
}

/**
 * 상황 전파 목록 이미지 미리보기 API interface
 */
export interface GetSituationNoticeImagePreviewParams {
    situation_last_uuid: string;
}

export interface GetSituationNoticeImagePreviewResult {
    situation_file_uuid: string;
    situation_file_name: string;
    situation_file_preview_data: string;
}

export interface GetSituationNoticeImagePreviewResponse extends TmsKnpNoticeResponse {
    response: {
        results: GetSituationNoticeImagePreviewResult[];
        totalCount: number;
    };
}

/*******************************************************************************
 * Situation Notice (상황전파등록)
 *******************************************************************************/
export interface SituationLocation {
    x: number;
    y: number;
}
export interface SituationMessageCommon {
    casualties: {
        dead: number;
        injury: number;
    };
    property_loss: {
        area: number;
        amount_money: number;
    };
}

export interface SituationMessageAccident {
    message: string;
    trail_vicinity: TRAIL_VICINITY;
}

export interface SituationTravelRoadControl {
    open: number;
    partial_open: number;
    close: number;
    total: number;
}

export interface SituationSendSmsUser {
    sms_template_id?: number;
    sms_group_id: number[];
    user_uuid: string[];
}

/**
 * 상황 전파 등록 API interface
 */
export interface PostSituationNoticeParams {
    situation_uuid: string;
    situation_user_name: string;
    situation_place_name: string;
    situation_location: SituationLocation;
    situation_time: string;
    situation_national_park: string;
    situation_name: string;
    situation_level1: SITU_LEVEL;
    situation_level2: string;
    situation_level3?: string;
    situation_message: SituationMessageCommon | SituationMessageAccident;
    situation_travel_road_control: SituationTravelRoadControl;
    situation_use_sms: boolean;
    situation_send_sms_user?: SituationSendSmsUser;
    situation_send_sms_message?: string;
    situation_use_broadcast: boolean;
    situation_update_time?: string;
    image?: File[];
    hwp?: File;
}

export interface PostSituationNoticeResult {
    situation_uuid: string;
}

export interface PostSituationNoticeResponse extends TmsKnpNoticeResponse {
    response: PostSituationNoticeResult;
}

/*******************************************************************************
 * Situation Notice Record (상황전파이력)
 *******************************************************************************/
/**
 * 상황 전파 이력 요청 API interface
 */
export interface GetSituationNoticeParams {
    situation_step?: DS_STEP;
    situation_level1?: SITU_LEVEL;
    start_time?: string;
    end_time?: string;
}

export interface GetSituationNoticeFile {
    situation_file_uuid: string;
    situation_file_name: string;
    situation_file_preview_data: string;
}

export interface GetSituationNoticeResult {
    situation_uuid: string;
    situation_step: DS_STEP;
    situation_level1: SITU_LEVEL;
    situation_name: string;
    situation_place_name: string;
    situation_user_name: string;
    situation_update_time: string;
    situation_national_park: string;
    situation_response_stage: number;
    situation_approval_step: DSAS_STEP;
    situation_file_hwp_info: {
        situation_file_info_list: GetSituationNoticeFile[];
    };
    situation_file_image_info: {
        situation_file_info_list: GetSituationNoticeFile[];
    };
    exists_file: boolean;
    exists_image: boolean;
    situation_last_uuid: string;
}

export interface GetSituationNoticeResponse extends TmsKnpNoticeResponse {
    response: {
        results: GetSituationNoticeResult[];
        totalCount: number;
    };
}

/**
 * 상황 전파 이력 삭제 API interface
 */
export interface DeleteSituationNoticeParams {
    situation_uuid_list: string[];
}

export interface DeleteSituationNoticeResponse extends TmsKnpNoticeResponse {
    response: null;
}

/**
 * 상황 전파 상황 종료 요청 승인 API interface
 */
export interface ApproveSituationNoticeEndParams {
    situation_uuid: string;
}

export interface ApproveSituationNoticeEndResponse extends TmsKnpNoticeResponse {
    response: null;
}

/**
 * 상황 전파 상황 종료 요청 거절 API interface
 */
export interface RefuseSituationNoticeEndParams {
    situation_uuid: string;
}

export interface RefuseSituationNoticeEndResponse extends TmsKnpNoticeResponse {
    response: null;
}

/**
 * 상황 전파 상황 편집 승인 API interface
 */
export interface ApproveSituationNoticeModifyParams {
    situation_uuid: string;
}

export interface ApproveSituationNoticeModifyResponse extends TmsKnpNoticeResponse {
    response: null;
}

/**
 * 상황 전파 이력 엑셀 다운로드 요청 API interface
 */
export interface ExportSituationNoticeParams {
    situation_step?: DS_STEP;
    situation_level1?: SITU_LEVEL;
    start_time?: string;
    end_time?: string;
}

/**
 * 상황별 수량 및 진행, 종료된 상황 정보 API interface
 */
export interface GetSituationNoticeSummaryParams {
    is_allSummary: boolean;
}

export interface GetSituationNoticeItem {
    situation_uuid: string;
    situation_national_park: string;
    situation_level1: SITU_LEVEL;
    situation_name: string;
    situation_response_stage: number;
    situation_update_time: string;
}

export interface GetSituationNoticeSummaryResult {
    situation_st01_count: number;
    situation_st02_count: number;
    situation_st03_count: number;
    situation_end_list: GetSituationNoticeItem[];
    situation_process_list: GetSituationNoticeItem[];
}

export interface GetSituationNoticeSummaryResponse extends TmsKnpNoticeResponse {
    response: GetSituationNoticeSummaryResult;
}

/**
 * 년, 월, 주 단위 통계 정보 API interface
 */
export interface GetSituationStatisticParams {
    situation_national_park?: string;
    situation_level1?: string;
}

export interface GetSituationStatisticResult {
    statistic_year: [
        {
            year: string;
            data: {
                [key: string]: number;
            };
        }
    ];
    statistic_month: [
        {
            month: string;
            data: {
                [key: string]: number;
            };
        }
    ];
    statistic_week: [
        {
            day: string;
            data: {
                [key: string]: number;
            };
        }
    ];
}

export interface GetSituationStatisticResponse extends TmsKnpNoticeResponse {
    response: GetSituationStatisticResult;
}

/**
 * 탐방로 통제 통계 API interface
 */
export interface GetTravelRoadStatisticResult {
    open: string;
    partial_open: string;
    close: string;
    total: string;
}

export interface GetTravelRoadStatisticResponse extends TmsKnpNoticeResponse {
    response: GetTravelRoadStatisticResult;
}

/*******************************************************************************
 * Situation Notice Record -> Response SOP (대응 SOP)
 *******************************************************************************/
/**
 * 대응 SOP 이력 요청 API interface
 */
export interface GetSituationResponseParams {
    situation_uuid: string;
}

export interface GetSituationResponseFile {
    situation_file_uuid: string;
    situation_file_name: string;
    situation_file_preview_data: string;
}

export interface GetSituationResponseResult {
    situation_uuid: string;
    situation_parent_uuid: string;
    situation_user_name: string;
    situation_place_name: string;
    situation_location: SituationLocation;
    situation_response_stage: number;
    situation_approval_step: DSAS_STEP;
    situation_national_park: string;
    situation_name: string;
    situation_level1: SITU_LEVEL;
    situation_level2: string;
    situation_level3: string;
    situation_message: SituationMessageCommon | SituationMessageAccident;
    situation_travel_road_control: SituationTravelRoadControl;
    situation_use_sms: boolean;
    situation_send_sms_user: SituationSendSmsUser;
    situation_send_sms_message: string;
    situation_use_broadcast: boolean;
    situation_step: DS_STEP;
    situation_time: string;
    situation_first_update_time: string;
    situation_update_time: string;
    situation_file_hwp_info: {
        situation_file_info_list: GetSituationResponseFile[];
    };
    situation_file_image_info: {
        situation_file_info_list: GetSituationResponseFile[];
    };
}

export interface GetSituationResponseResponse extends TmsKnpNoticeResponse {
    response: {
        results: GetSituationResponseResult[];
        totalCount: number;
    };
}

/**
 * 대응 SOP 등록 API interface
 */
export interface PostSituationResponseDeleteImageFile {
    delete_image_id_list: string[];
}

export interface PostSituationResponseDeleteHwpFile {
    delete_hwp_id_list: string[];
}

export interface PostSituationResponseParams {
    situation_uuid: string;
    situation_parent_uuid: string;
    situation_user_name: string;
    situation_place_name: string;
    situation_location: SituationLocation;
    situation_time?: string;
    situation_national_park: string;
    situation_name: string;
    situation_level1: SITU_LEVEL;
    situation_level2: string;
    situation_level3?: string;
    situation_message: SituationMessageCommon | SituationMessageAccident;
    situation_travel_road_control: SituationTravelRoadControl;
    situation_use_sms: boolean;
    situation_send_sms_user?: SituationSendSmsUser;
    situation_send_sms_message?: string;
    situation_use_broadcast: boolean;
    situation_update_time?: string;
    image?: File[];
    hwp?: File;
    delete_imagefile_id?: PostSituationResponseDeleteImageFile;
    delete_hwpfile_id?: PostSituationResponseDeleteHwpFile;
}

export interface PostSituationResponseResult {
    situation_uuid: string;
}

export interface PostSituationResponseResponse extends TmsKnpNoticeResponse {
    response: PostSituationResponseResult;
}

/**
 * 대응 SOP 삭제 API interface
 */
export interface DeleteSituationResponseParams {
    situation_uuid_list: string[];
}

export interface DeleteSituationResponseResponse extends TmsKnpNoticeResponse {
    response: null;
}

/**
 * 상황 종료 요청 API interface
 */
export interface RequestApprovalSituationNoticeEndParams {
    situation_uuid: string;
}

export interface RequestApprovalSituationNoticeEndResponse extends TmsKnpNoticeResponse {
    response: null;
}

/**
 * 대응 SOP 목록 엑셀 다운로드 요청 API interface
 */
export interface ExportSituationResponseParams {
    parent_situation_uuid: string;
}
