/**
 * tms-knp 통신 데이터 인터페이스 정의 파일
 * @file src/services/api/tmsKnp/TmsKnpInterface.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-11-10, 최초 작성
 */

import {
    AUTH_CODE,
    AwsLayerProperties,
    CampSiteLayerProperties,
    CctvLayerProperties,
    CommonLayerProperties,
    OfficeLayerProperties,
    PERIODIC_CODE,
    RockFallSensorLayerProperties,
    ShelterLayerProperties,
    VrteLayerProperties,
} from "../../interfaces";
import { PERIODIC_STATE } from "../../interfaces/periodic-report.interfaces";

/*******************************************************************************
 * common interface
 *******************************************************************************/
interface TmsKnpResponse {
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
 * admin-user
 *******************************************************************************/
/**
 * get user list 사용자 목록 조회 (관리자)
 */
export interface GetUsersByAdminParams {
    gid?: string;
    auth_code?: string;
    user_filter?: string;
}

export interface GetUsersByAdminResult {
    uid: string;
    user_account: string;
    user_name: string;
    auth_code: string;
    auth_name: string;
    gid: string;
    group_name: string;
    mobile_num: string;
    email: string;
    dept_cd: string;
    umjp_cd: string;
    umpg_cd: string;
    umjo_cd: string;
    dept_nm: string;
    umjp_nm: string;
    umpg_nm: string;
    umjo_nm: string;
    reg_date: string;
    upd_date: string;
}

export interface GetUsersByAdminResponse extends TmsKnpResponse {
    response: {
        results: GetUsersByAdminResult[];
        total_count: number;
    };
}

/**
 * get user 사용자 상세 정보 조회 (관리자)
 */
export interface GetUserByAdminParams {
    uid: string;
}

export interface GetUserByAdminResult {
    gid: string;
    group_name: string;
    npk_cds: string[];
    uid: string;
    auth_code: string;
    auth_name: string;
    user_account: string;
    user_name: string;
    email: string;
    mobile_num: string;
    user_img_type: string;
    user_img: string;
    birth_date: string;
    enter_date: string;
    retire_date: string;
    dept_cd: string;
    umjp_cd: string;
    umpg_cd: string;
    umjo_cd: string;
    umjd_cd: string;
    dept_nm: string;
    umjp_nm: string;
    umpg_nm: string;
    umjo_nm: string;
    umjd_nm: string;
    twofa_type: string;
    is_lock_login: boolean;
    is_multi_login: boolean;
    is_sleeper_account: boolean;
    last_login_date: string;
    pw_changed_date: string;
    pw_expire_days: number;
    session_count: number;
    session_list: {
        session_id: string;
        client_id: string;
        login_date: string;
    };
    reg_date: string;
    upd_date: string;
}

export interface GetUserByAdminResponse extends TmsKnpResponse {
    response: GetUserByAdminResult;
}

/**
 * put user 사용자 수정 API (관리자)
 */
export interface PutUserByAdminParams {
    uid: string;
    gid?: string;
    auth_code?: string;
    user_name?: string;
    email?: string;
    mobile_num?: string;
    user_img_type?: string;
    user_img?: string;
    birth_date?: string;
    enter_date?: string;
    retire_date?: string;
    dept_cd?: string;
    umjp_cd?: string;
    umpg_cd?: string;
    umjo_cd?: string;
    umjd_cd?: string;
    twofa_type?: string;
    is_lock_login?: boolean;
    is_multi_login?: boolean;
    is_sleeper_account?: boolean;
}

export interface PutUserByAdminResult {
    gid: string;
    group_name: string;
    npk_cds: string[];
    uid: string;
    auth_code: string;
    auth_name: string;
    user_account: string;
    user_name: string;
    email: string;
    mobile_num: string;
    user_img_type: string;
    user_img: string;
    birth_date: string;
    enter_date: string;
    retire_date: string;
    dept_cd: string;
    umjp_cd: string;
    umpg_cd: string;
    umjo_cd: string;
    umjd_cd: string;
    dept_nm: string;
    umjp_nm: string;
    umpg_nm: string;
    umjo_nm: string;
    umjd_nm: string;
    twofa_type: string;
    is_lock_login: boolean;
    is_multi_login: boolean;
    is_sleeper_account: boolean;
    last_login_date: string;
    pw_changed_date: string;
    pw_expire_days: number;
    session_count: number;
    session_list: {
        session_id: string;
        client_id: string;
        login_date: string;
    };
    reg_date: string;
    upd_date: string;
}

export interface PutUserByAdminResponse extends TmsKnpResponse {
    response: PutUserByAdminResult;
}

/**
 * put user 사용자 등록 API (관리자)
 */
export interface PostUserByAdminParams {
    gid?: string;
    auth_code?: string;
    user_name?: string;
    email?: string;
    mobile_num?: string;
    user_img_type?: string;
    user_img?: string;
    birth_date?: string;
    enter_date?: string;
    retire_date?: string;
    dept_cd?: string;
    umjp_cd?: string;
    umpg_cd?: string;
    umjo_cd?: string;
    umjd_cd?: string;
    twofa_type?: string;
    is_lock_login?: boolean;
    is_multi_login?: boolean;
    is_sleeper_account?: boolean;
}

export interface PostUserByAdminResult {
    gid: string;
    group_name: string;
    npk_cds: string[];
    uid: string;
    auth_code: string;
    auth_name: string;
    user_account: string;
    user_name: string;
    email: string;
    mobile_num: string;
    user_img_type: string;
    user_img: string;
    birth_date: string;
    enter_date: string;
    retire_date: string;
    dept_cd: string;
    umjp_cd: string;
    umpg_cd: string;
    umjo_cd: string;
    umjd_cd: string;
    dept_nm: string;
    umjp_nm: string;
    umpg_nm: string;
    umjo_nm: string;
    umjd_nm: string;
    twofa_type: string;
    is_lock_login: boolean;
    is_multi_login: boolean;
    is_sleeper_account: boolean;
    last_login_date: string;
    pw_changed_date: string;
    pw_expire_days: number;
    session_count: number;
    session_list: {
        session_id: string;
        client_id: string;
        login_date: string;
    };
    reg_date: string;
    upd_date: string;
}

export interface PostUserByAdminResponse extends TmsKnpResponse {
    response: PostUserByAdminResult;
}

/**
 * delete user 사용자 삭제 API (관리자)
 */
export interface DeleteUserByAdminParams {
    uids: string[];
}
export type DeleteUserByAdminResponse = TmsKnpResponse;
/**
 * 사용자 아이디 중복 체크 API (관리자)
 */
export interface CheckUserAccountByAdminParams {
    user_account: string;
}

export interface CheckUserAccountByAdminResponse extends TmsKnpResponse {
    response: {
        is_exist: boolean;
    };
}

/**
 * 사용자 패스워드 초기화 API (관리자)
 */
export interface ResetPasswordByAdminParams {
    uid: string;
}

export interface ResetPasswordByAdminResponse extends TmsKnpResponse {
    code: number;
    message: string;
    responseTime: string;
}

/**
 * 사용자 OTP 초기화 API (관리자)
 */
export interface ResetOtpByAdminParams {
    uid: string;
}

export interface ResetOtpByAdminResponse extends TmsKnpResponse {
    code: number;
    message: string;
    responseTime: string;
}

/*******************************************************************************
 * asset
 *******************************************************************************/
/**
 * get asset layers 자산 종류(레이어정보) API interface
 */
export interface GetAssetLayersResult {
    layer_id: string;
    layer_name: string;
}

export interface GetAssetLayersResponse extends TmsKnpResponse {
    response: {
        results: GetAssetLayersResult[];
        total_count: number;
    };
}

/**
 * get asset fields 자산 필드 정보 조회 API interface
 */
export interface GetAssetFieldsParams {
    layer_id: string;
}

export interface GetAssetFieldsResult {
    column_name: string;
    column_comment: string;
    data_type: string;
    is_notnull: boolean;
}

export interface GetAssetFieldsResponse extends TmsKnpResponse {
    response: {
        results: GetAssetFieldsResult[];
        total_count: number;
    };
}

/**
 * get assets 자산 목록 조회 API interface
 */
export interface GetAssetsParams {
    layer_id: string;
    npk_cd?: string;
    asset_nm?: string;
    start_dt?: string;
    end_dt?: string;
    page_cnt?: number;
    page_num?: number;
}

export interface GetAssetsFields {
    column_name: string;
    column_comment: string;
    data_type: string;
    is_notnull: boolean;
}

export interface GetAssetsResult {
    id: number;
    geom: string;
    npk_cd: string;
    npo_cd: string;
    asset_type_cd: string;
    asset_nm: string;
    reg_date: string;
    upd_date: string;
    [key: string]: string | number | object | null;
}

export interface GetAssetsResponse extends TmsKnpResponse {
    response: {
        count: number;
        fields: GetAssetsFields[];
        results: GetAssetsResult[];
        total_count: number;
    };
}

/**
 * get asset 자산 상세 조회 API interface
 */
export interface GetAssetByIdParams {
    layer_id: string;
    id: number;
}

export interface ResourceCount {
    resource_code: string;
    count: number;
}

export interface GetAssetByIdResult {
    id: number;
    geom: string;
    npk_cd: string;
    npo_cd: string;
    asset_type_cd: string;
    asset_nm: string;
    reg_date: string;
    upd_date: string;
    [key: string]: string | number | object | null;
    resr_counts: ResourceCount[] | null;
}

export interface GetAssetByIdResponse extends TmsKnpResponse {
    response: GetAssetByIdResult;
}

/**
 * post asset 자산 등록 API interface
 */
export interface PostAssetParams {
    layer_id: string;
    [key: string]: string | number | object | null;
}

export interface PostAssetResponse extends TmsKnpResponse {
    response: number;
}

/**
 * put asset 자산 수정 API interface
 */
export interface PutAssetParams {
    id: number;
    layer_id: string;
    [key: string]: string | number | object | null;
}

export interface PutAssetResponse extends TmsKnpResponse {
    response: number;
}

/**
 * delete asset 자산 삭제 API interface
 */
export interface DeleteAssetParams {
    layer_id: string;
    ids: number[];
}

export interface DeleteAssetResponse extends TmsKnpResponse {
    response: number;
}

/**
 * export assets 자산 Excel 다운로드 API interface
 */
export interface ExportAssetsParams {
    layer_id: string;
    npk_cd?: string;
    asset_nm?: string;
    start_dt?: string;
    end_dt?: string;
}
/*******************************************************************************
 * auth
 *******************************************************************************/
/**
 * get auth 권한 메뉴 정보 API interface *초기 UI 그리기 위함
 */
export interface GetAuthMenuInfoResult {
    p_menu_code: string;
    menu_code: string;
    menu_name: string;
    ordering: number;
    use_auth_delete: boolean;
    use_auth_approval: boolean;
    sub_menu_info?: GetAuthMenuInfoResult[];
}

export interface GetAuthMenuInfoResponse extends TmsKnpResponse {
    response: {
        results: GetAuthMenuInfoResult[];
        total_count: number;
    };
}

/**
 * get auth 권한 정보 조회 API interface
 */
export interface GetAuthInfoParams {
    keyword?: string;
}

export interface GetAuthInfoResult {
    auth_code: AUTH_CODE;
    auth_name: string;
    is_default: boolean;
    upd_date: string;
}

export interface GetAuthInfoResponse extends TmsKnpResponse {
    response: {
        results: GetAuthInfoResult[];
        total_count: number;
    };
}

/**
 * get auth 권한 상세 조회 API interface
 */
export interface GetAuthByIdParams {
    auth_code: AUTH_CODE;
}

export interface GetAuthByIdResult {
    p_menu_code: string;
    menu_code: string;
    menu_name: string;
    auth_delete: boolean;
    auth_approval: boolean;
    sub_menu_info: GetAuthByIdResult[];
}

export interface GetAuthByIdResponse extends TmsKnpResponse {
    response: {
        results: GetAuthByIdResult[];
        total_count: number;
    };
}

/**
 * put auth 권한 저장 API interface
 */
export interface PutAuthSaveParams {
    auth_code: AUTH_CODE;
    menu_roles: {
        menu_code: string;
        auth_delete: boolean;
        auth_approval: boolean;
    }[];
}

export interface PutAuthSaveResponse extends TmsKnpResponse {
    response: number;
}

/**
 * put auth 권한 기본값 저장 API interface
 */
export interface PutAuthDefaultParams {
    auth_code: AUTH_CODE;
}

export interface PutAuthDefaultResponse extends TmsKnpResponse {
    response: number;
}

/**
 * get user auth 사용자 권한 정보 API interface
 */
export interface GetUserAuthParams {
    uid: string;
}

export interface MenuRole {
    p_menu_code: string;
    menu_code: string;
    auth_delete: boolean;
    auth_approval: boolean;
}

export interface GetUserAuthResult {
    gid: string;
    group_name: string;
    is_root: boolean;
    npk_cds: string[];
    uid: string;
    auth_code: AUTH_CODE;
    auth_name: string;
    user_account: string;
    user_name: string;
    email: string;
    mobile_num: string;
    dept: string;
    team: string;
    login_date: string;
    pw_changed_date: string;
    reg_date: string;
    upd_date: string;
    is_keep_session: boolean;
    is_multi_login: boolean;
    is_sleeper_account: boolean;
    user_menu_role: MenuRole[];
}

export interface GetUserAuthResponse extends TmsKnpResponse {
    response: GetUserAuthResult;
}

/*******************************************************************************
 * code
 *******************************************************************************/
/**
 * get code 코드 정보 API interface
 */
export interface GetCodeInfoParams {
    p_code?: string;
}

export interface GetCodeInfoResult {
    code: string;
    code_name: string;
}

export interface GetCodeInfoResponse extends TmsKnpResponse {
    response: {
        results: GetCodeInfoResult[];
        total_count: number;
    };
}

/*******************************************************************************
 * dashboard
 *******************************************************************************/
/**
 * get aws 자산 실시간 정보 조회 API interface
 */
export interface GetAwsInfoParams {
    local_code: string;
}

export interface GetAwsInfoResult {
    humidity_val: string;
    rain_val: string;
    temperature_val: string;
    wind_direction_val: string;
    wind_speed_val: string;
    update_date: string;
}

export interface GetAwsInfoResponse extends TmsKnpResponse {
    response: {
        results: GetAwsInfoResult[];
        count: number;
    };
}

/**
 * get radar 레이더 이미지 조회 API interface
 */
export interface GetRadarParams {
    target_time?: string;
    // interval?: string;
}

export interface GetRadarResult {
    img_date: string;
    img: string;
}

export interface GetRadarResponse extends TmsKnpResponse {
    response: {
        results: GetRadarResult[];
        total_count: number;
    };
}

/**
 * get satellite 위성 이미지 조회 API interface
 */
export interface GetSatelliteParams {
    target_time?: string;
    // interval?: string;
}

export interface GetSatelliteResult {
    img_date: string;
    img: string;
}

export interface GetSatelliteResponse extends TmsKnpResponse {
    response: {
        results: GetSatelliteResult[];
        total_count: number;
    };
}

/**
 * 초단기 실황 API interface
 */
export interface GetUltraShortRealtimeParams {
    npk_cd?: string[];
}

export interface GetUltraShortRealtimeResult {
    reh: string;
    rn1: string;
    t1h: string;
    vec: string;
    wsd: string;
    npk_cd: string;
}

export interface GetUltraShortRealtimeResponse extends TmsKnpResponse {
    response: {
        results: GetUltraShortRealtimeResult[];
        total_count: number;
    };
}

/**
 * 초단기 예보 API interface
 */
export interface GetForecastParams {
    npk_cd?: string;
    fcst_date?: string;
    fcst_time?: string;
}

export interface GetUltraShortForecastResult {
    npk_cd: string;
    fcst_date: string;
    fcst_time: string;
    pty: number;
    rn1: string;
    reh: number;
    sky: number;
    t1h: number;
    uuu: number;
    vvv: number;
    vec: string;
    wsd: number;
    lgt: number;
}

export interface GetUltraShortForecastResponse extends TmsKnpResponse {
    response: {
        results: GetUltraShortForecastResult[];
        total_count: number;
    };
}

/**
 * 단기 예보 API interface
 */
export interface GetShortForecastResult {
    npk_cd: string;
    fcst_date: string;
    fcst_time: string;
    pop: number;
    pty: number;
    pcp: string;
    sno: string;
    reh: number;
    sky: number;
    tmp: number;
    uuu: number;
    vvv: number;
    wav: number;
    vec: string;
    wsd: number;
}

export interface GetShortForecastResponse extends TmsKnpResponse {
    response: {
        results: GetShortForecastResult[];
        total_count: number;
    };
}

/**
 * 중기 육상 예보 API interface
 */
export interface GetMidLandForecastParams {
    npk_cd?: string;
    tm_date?: string;
}

export interface GetMidLandForecastResult {
    npk_cd: string;
    tm_date: string;
    wf3am: string;
    wf3pm: string;
    wf4am: string;
    wf4pm: string;
    wf5am: string;
    wf5pm: string;
    wf6am: string;
    wf6pm: string;
    wf7am: string;
    wf7pm: string;
    wf8: string;
    wf9: string;
    wf10: string;
    [key: number]: string | number | object | null;
}

export interface GetMidLandForecastResponse extends TmsKnpResponse {
    response: {
        results: GetMidLandForecastResult[];
        total_count: number;
    };
}

/**
 * 특보 전문 조회 API interface
 */
export interface GetSpecialReportResult {
    tm_fc: string;
    t1: string;
    t2: string;
    t3: string;
    t4: string;
    t5: string;
    t6: string;
    t7: string;
    other: string;
}

export interface GetSpecialReportResponse extends TmsKnpResponse {
    response: {
        results: GetSpecialReportResult;
        total_count: number;
    };
}

/**
 * 특보 코드 API interface
 */
export interface GetSpecialReportCodeParams {
    npk_cd?: string[];
}

export interface GetSpecialReportCodeResult {
    npk_cd: string;
    upd_time: string;
    warn_var: number;
    warn_stress: number;
}

export interface GetSpecialReportCodeResponse extends TmsKnpResponse {
    response: {
        results: GetSpecialReportCodeResult[];
        total_count: number;
    };
}

/**
 * 탐방로 통제 정보 API interface
 */
export interface GetControlInfoParams {
    npk_cd: string;
}

export interface GetControlInfoResult {
    npo_cd: string;
    vrte_open: number;
    vrte_open_part: number;
    vrte_close: number;
    total: number;
}

export interface GetControlInfoResponse extends TmsKnpResponse {
    response: {
        results: GetControlInfoResult[];
    };
}

/**
 * 자동우량 실시간 정보조회 API interface
 */
export interface GetCurrentRtuParams {
    sys_id?: string;
    rtu_id?: string;
}

export interface GetCurrentRtuResult {
    rain_val: string;
    rtu_id: string;
    sys_id: string;
    update_date: string;
}

export interface GetCurrentRtuResponse extends TmsKnpResponse {
    response: {
        results: GetCurrentRtuResult[];
        total_count: number;
    };
}

/**
 * 자동우량 월/주/일 단위 통계조회 API interface
 */
export interface GetSummaryRtuParams {
    sys_id?: string;
    rtu_id?: string;
}

export interface GetSummaryRtuResult {
    rtu_id: string;
    sys_id: string;
    val: string;
    date: string;
}

export interface GetSummaryRtuResponse extends TmsKnpResponse {
    response: {
        results: GetSummaryRtuResult[];
        total_count: number;
    };
}

/**
 * 낙석계측기 센서목록 조회 API interface
 */
export interface GetRockFallSensorsParams {
    asset_nm?: string;
}

export interface GetRockFallSensorsResult {
    sensor_code: string;
    sensor_num: number;
    status: number;
    type_name: string;
    data_val: string;
}

export interface GetRockFallSensorsResponse extends TmsKnpResponse {
    response: {
        results: GetRockFallSensorsResult[];
        total_count: number;
    };
}

/**
 * 낙석계측기 상세 조회 API interface
 */
export interface GetRockFallSensorDetailParams {
    asset_nm?: string;
}

export interface GetRockFallSensorDetailResult {
    asset_nm: string;
    install_date: string;
    type_name: string;
    count: number;
}

export interface GetRockFallSensorDetailResponse extends TmsKnpResponse {
    response: {
        results: GetRockFallSensorDetailResult[];
        total_count: number;
    };
}

/**
 * 낙석계측기 센서별 데이터 조회(그래프) API interface
 */
export interface GetRockFallSensorDataParams {
    mng_no?: string;
    sensor_code?: string;
    sensor_num?: string;
    start_time?: string;
    end_time?: string;
}

export interface GetRockFallSensorDataResult {
    data_intime: string;
    data_val: number;
    mng_no: string;
    sensor_code: string;
    sensor_num: number;
}

export interface GetRockFallSensorDataResponse extends TmsKnpResponse {
    response: {
        results: GetRockFallSensorDataResult[];
        total_count: number;
    };
}

/**
 * 자동우량 경보국 방송횟수 조회 API interface
 */
export interface GetBroadcastCountParams {
    sys_id?: string;
    rtu_id?: string;
}

export interface GetBroadcastCountResult {
    alarm_type: string;
    cnt: number;
    rtu_id: string;
    sys_id: string;
}

export interface GetBroadcastCountResponse extends TmsKnpResponse {
    response: {
        results: GetBroadcastCountResult[];
        total_count: number;
    };
}

/*******************************************************************************
 * file
 *******************************************************************************/
/**
 * 보고서 양식 목록 조회 API
 */
export interface GetFileListResults {
    id: number;
    file_og_name?: string;
    file_type?: string;
    file_size: number;
    ordering: number;
}

export interface GetFileListResponse extends TmsKnpResponse {
    response: {
        results: GetFileListResults[];
        total_count: number;
    };
}

/**
 * 보고서 양식 업로드 파일 API
 */
export interface UploadFileResult extends TmsKnpResponse {
    response: object;
}

export interface UploadFileParams {
    upload_file: File;
}

/**
 * 보고서 양식 다운로드 파일 API
 */
export interface DownloadFileResult extends TmsKnpResponse {
    response: object;
}

export interface DownloadFileParams {
    id: number;
}

/**
 * 보고서 양식 삭제 API
 */
export interface DeleteFileResult extends TmsKnpResponse {
    response: object;
}

export interface DeleteFileParams {
    ids: number[];
}

/*******************************************************************************
 * geocode
 *******************************************************************************/
/**
 * 키워드 위치 검색 API interface
 */
export interface GetSearchAddressByKeywordParams {
    query?: string;
    pagetoken?: string;
}

export interface GetSearchAddressByKeywordResult {
    address: string;
    road_address: string;
    place: string;
    point: {
        lat: string;
        lng: string;
    };
}

export interface GetSearchAddressByKeywordResponse extends TmsKnpResponse {
    response: {
        results: GetSearchAddressByKeywordResult[];
        pagetoken: string;
    };
}

/**
 * 좌표 위치 검색 API interface
 */
export interface GetSearchAddressByCoordsParams {
    lat: number;
    lng: number;
}

export interface GetSearchAddressByCoordsResult {
    address: string;
    road_address: string;
    building_name: string;
}

export interface GetSearchAddressByCoordsResponse extends TmsKnpResponse {
    response: {
        results: GetSearchAddressByCoordsResult[];
        total_count: number;
    };
}

/*******************************************************************************
 * group
 *******************************************************************************/
/**
 * get groups 그룹 목록 API interface
 */
export interface GetGroupsParams {
    keyword?: string;
}

export interface GetGroupsResult {
    gid: string;
    group_name: string;
    ordering: number;
    npk_auths: string[];
    reg_date: string;
    upd_date: string;
}

export interface GetGroupsResponse extends TmsKnpResponse {
    response: {
        results: GetGroupsResult[];
        total_count: number;
    };
}

/**
 * post group 그룹 등록 API interface
 */
export interface PostGroupParams {
    group_name: string;
    npk_auths?: string[];
}

export interface PostGroupResponse extends TmsKnpResponse {
    response: number;
}

/**
 * put group 그룹 수정 API interface
 */
export interface PutGroupParams {
    gid: string;
    group_name?: string;
    npk_auths?: string[];
}

export interface PutGroupResponse extends TmsKnpResponse {
    response: number;
}

/**
 * delete groups 그룹 삭제 API interface
 */
export interface DeleteGroupsParams {
    gids: string[];
}

export interface DeleteGroupsResponse extends TmsKnpResponse {
    response: number;
}

/*******************************************************************************
 * layer
 *******************************************************************************/
/**
 * get layers 레이어 목록 API interface
 */
export interface GetLayersResult {
    layer_id: string;
    layer_name: string;
    description: string;
    resource: boolean;
    ordering: number;
    reg_date: string;
    upd_date: string;
}

export interface GetLayersResponse extends TmsKnpResponse {
    response: {
        count: number;
        results: GetLayersResult[];
        total_count: number;
    };
}

/**
 * get layer styles 레이어 스타일 목록 API interface
 */
export interface GetLayerStylesResult {
    layer_id: string;
    asset_type_cd: string;
    image: string;
    image_type: string;
}

export interface GetLayerStylesResponse extends TmsKnpResponse {
    response: {
        results: GetLayerStylesResult[];
        total_count: number;
    };
}

/*******************************************************************************
 * manual 메뉴얼
 *******************************************************************************/
/**
 * get manual 메뉴얼 목록 API interface
 */
export interface GetManualResult {
    id: number;
    title: string;
    user_name: string;
    reg_date: string;
    file_ids: object[];
}

export interface GetManualResponse extends TmsKnpResponse {
    response: {
        results: GetManualResult[];
        total_count: number;
    };
}

/**
 * manual 메뉴얼 업로드 API interface
 */
export interface ImportManualParams {
    title: string;
    excel_file: File;
}

export interface ImportManualResult extends TmsKnpResponse {
    response: object;
}

/**
 * manual 메뉴얼 다운로드 API interface
 */
export interface DownloadManualParams {
    id: number;
}

/**
 * manual 메뉴얼 삭제 API interface
 */
export interface DeleteManualResult extends TmsKnpResponse {
    response: object;
}

export interface DeleteManualParams {
    ids: number[];
}

/*******************************************************************************
 * npk(국립공원)
 *******************************************************************************/
/**
 * get npks 국립공원 목록 API interface
 */
export interface GetNpksResult {
    npk_cd: string;
    npk_nm: string;
    ordering: number;
    asset_total_cnt: number;
    resource_total_cnt: number;
}

export interface GetNpksResponse extends TmsKnpResponse {
    response: {
        results: GetNpksResult[];
        total_count: number;
    };
}

/**
 * get npk 국립공원 상세 정보 API interface
 */
export interface GetNpkByIdParams {
    npk_cd: string;
}

export interface GetNpkByIdAssetCnt {
    layer_id: string;
    count: number;
}

export interface GetNpkByIdResourceCnt {
    resource_code: string;
    count: number;
}

export interface GetNpkByIdResult {
    npk_cd: string;
    npk_nm: string;
    asset_cnt: GetNpkByIdAssetCnt[];
    resource_cnt: GetNpkByIdResourceCnt[];
}

export interface GetNpkByIdResponse extends TmsKnpResponse {
    response: GetNpkByIdResult;
}

/**
 * get npk user 국립공원별 사용자 목록 API interface
 */
export interface GetNpkUsersParams {
    npk_cd: string;
}

export interface GetNpkUsersResult {
    uid: string;
    user_account: string;
    user_name: string;
    mobile_num: string;
    group_name: string;
}

export interface GetNpkUsersResponse extends TmsKnpResponse {
    response: {
        results: GetNpkUsersResult[];
        total_count: number;
    };
}

/**
 * get npk office 국립공원별 사무소 목록 API interface
 */
export interface GetNpkOfficesParams {
    npk_cd: string;
}

export interface GetNpkOfficesResult {
    npo_cd: string;
    npo_nm: string;
}

export interface GetNpkOfficesResponse extends TmsKnpResponse {
    response: {
        results: GetNpkOfficesResult[];
        total_count: number;
    };
}

/*******************************************************************************
 * periodic
 *******************************************************************************/
/**
 * get periodic 정기보고 정보 API interface
 */
export interface GetPeriodicInfoResult {
    periodic_code: PERIODIC_CODE;
    periodic_name: string;
    upload_type: string;
    upload_cycle: string;
}

export interface GetPeriodicInfoResponse extends TmsKnpResponse {
    response: {
        results: GetPeriodicInfoResult[];
        total_count: number;
    };
}

/**
 * get periodic 정기보고 상세 API interface
 */
export interface GetPeriodicDetailParams {
    id: number;
}

export interface GetPeriodicDetailResult {
    id: number;
    periodic_code: PERIODIC_CODE;
    npk_cd: string;
    npo_cd: string;
    title: string;
    user_name: string;
    periodic_state: PERIODIC_STATE;
    reg_date: string;
    file_ids: number[];
    file_preview: [{ file_id: number; file_name: string; file_data: string }];
}

export interface GetPeriodicDetailResponse extends TmsKnpResponse {
    response: GetPeriodicDetailResult;
}

/**
 * get periodic 정기보고 목록 API interface
 */
export interface GetPeriodicListParams {
    periodic_code: PERIODIC_CODE;
    npk_cd?: string;
    npo_cd?: string;
    start_dt?: string;
    end_dt?: string;
    page_cnt?: number;
    page_num?: number;
}

export interface GetPeriodicListResult {
    id: number;
    periodic_code: PERIODIC_CODE;
    npk_cd: string;
    npo_cd: string;
    title: string;
    user_name: string;
    periodic_state: PERIODIC_STATE;
    reg_date: string;
    file_ids: number[];
}

export interface GetPeriodicListResponse extends TmsKnpResponse {
    response: {
        count: number;
        results: GetPeriodicListResult[];
        total_count: number;
    };
}

/**
 * get periodic 정기보고 파일 업로드 API interface
 */
export interface PostPeriodicReportResponse extends TmsKnpResponse {
    response: object;
}

/**
 * get periodic 정기보고 파일 다운로드 API interface
 */
export interface DownloadPeriodicReportFileParams {
    id: number;
}

/**
 * get periodic 정기보고 Excel 다운로드 API interface
 */
export interface ExportPeriodicReportsParams {
    periodic_code: PERIODIC_CODE;
    npk_cd?: string;
    npo_cd?: string;
    start_dt?: string;
    end_dt?: string;
}

/**
 * get periodic 정기보고 업로드 현황 API interface
 */
export interface UploadCheckPeriodicReportParams {
    periodic_code: PERIODIC_CODE;
    upload_cycle: string;
}

export interface UploadCheckPeriodicalReportResult {
    npo_cd: string;
    npo_nm: string;
    ordering: number;
    current_cnt: number;
    target_cnt: number;
}

export interface UploadCheckPeriodicReportResponse extends TmsKnpResponse {
    response: {
        count: number;
        results: UploadCheckPeriodicalReportResult[];
        total_count: number;
    };
}

/**
 * get periodic 급경사지 폼 업로드 API interface
 */
export interface PostPeriodicSteepSlopeResponse extends TmsKnpResponse {
    response: object;
}

/**
 * get periodic 급경사지 상세 API interface
 */
export interface GetPeriodicSteepSlopeDetailParams {
    id: number;
}

export interface GetPeriodicSteepSlopeDetailResult {
    title: string;
    npk_cd: string;
    npo_cd: string;
    current_cnt: number;
    target_cnt: number;
    periodic_state: PERIODIC_STATE;
    steep_slope_id: number;
    place_no: string;
    grade: string;
    latitude: number;
    longitude: number;
    checker: string;
    check_date: string;
    report_date: string;
    check_category: string;
    check_category_memo: string;
    detail_check_content: string;
    check_result: string;
    check_result_memo: string;
    detail_content: string;
    action_result: string;
    action_result_memo: string;
    action_detail_content: string;
    next_plan: string;
    action_plan: string;
    file_ids: number[];
    file_preview: [{ file_id: number; file_name: string; file_data: string }];
}

export interface GetPeriodicSteepSlopeDetailResponse extends TmsKnpResponse {
    response: GetPeriodicSteepSlopeDetailResult;
}

/**
 * get periodic 정기보고 삭제 API interface
 */
export interface DeletePeriodicReportParams {
    ids: number[];
}

export interface DeletePeriodicReportResponse extends TmsKnpResponse {
    response: object;
}

/**
 * get periodic 정기보고 수정 API interface
 */
export interface PutPeriodicReportResponse extends TmsKnpResponse {
    response: object;
}

/**
 * get periodic 급경사지 수정 API interface
 */
export interface PutPeriodicSteepSlopeResponse extends TmsKnpResponse {
    response: object;
}

/**
 * get periodic 급경사지 자산 조회 API interface
 */
export interface GetPeriodicSteepSlopeAssetParams {
    npo_cd: string;
}

export interface GetPeriodicSteepSlopeAssetResult {
    steep_slope_id: number;
    place_no: string;
    grade: string;
    latitude: number;
    longitude: number;
    is_submit: boolean;
}
export interface GetPeriodicSteepSlopeAssetResponse extends TmsKnpResponse {
    response: {
        results: GetPeriodicSteepSlopeAssetResult[];
        total_count: number;
    };
}
/*******************************************************************************
 * resource
 *******************************************************************************/
/**
 * get resource 장비 정보 조회 API interface
 */
export interface GetResourceInfoResult {
    resource_code: string;
    resource_name: string;
}

export interface GetResourceInfoResponse extends TmsKnpResponse {
    response: {
        results: GetResourceInfoResult[];
        total_count: number;
    };
}

export interface GetResourceReportParams {
    menu_code?: string;
}

/**
 * get resource 장비 현황 조회 API interface
 */
export interface GetResourceReportResult {
    npk_cd: string;
    asset_nm: string;
    manager_name: string;
    manager_number: string;
    RS001: number;
    RS002: number;
    RS003: number;
    RS004: number;
    RS005: number;
    RS006: number;
    RS007: number;
    RS008: number;
    RS009: number;
    RS010: number;
    RS011: number;
    rs_total: number;
}

export interface GetResourceReportResponse extends TmsKnpResponse {
    response: {
        results: GetResourceReportResult[];
        total_count: number;
    };
}

/**
 * export resource 장비 현황 Excel 다운로드 API interface
 */
export interface ExportResourcesParams {
    is_sample?: boolean;
}

/**
 * import resource 장비 현황 Excel 업로드 API interface
 */
export interface ImportResourcesParams {
    excel_file: File;
}

export interface ImportResourcesResult {
    total_cnt: number;
    success_cnt: number;
    failure_cnt: number;
    failure_list: string[];
}

export interface ImportResourcesResponse extends TmsKnpResponse {
    response: ImportResourcesResult;
}

/*******************************************************************************
 * [설정 > 사용자 설정]
 *******************************************************************************/
/**
 * [설정 > 사용자 설정] 사용자 정보 조회 API
 */
export interface GetUserInfoParams {
    uid: string;
}

export interface GetUserInfoResult {
    gid: string;
    group_name: string;
    npk_cds: string[];
    uid: string;
    auth_code: AUTH_CODE;
    auth_name: string;
    user_account: string;
    user_name: string;
    email: string;
    mobile_num: string;
    user_img_type: string;
    user_img: string;
    birth_date: string;
    enter_date: string;
    retire_date: string;
    dept_cd: string;
    umjp_cd: string;
    umpg_cd: string;
    umjo_cd: string;
    umjd_cd: string;
    dept_nm: string;
    umjp_nm: string;
    umpg_nm: string;
    umjo_nm: string;
    umjd_nm: string;
    twofa_type: string;
    is_lock_login: boolean;
    is_multi_login: boolean;
    is_sleeper_account: boolean;
    last_login_date: string;
    pw_changed_date: string;
    pw_expire_days: number;
    session_count: number;
    session_list: GetUserInfoSessionList[];
    reg_date: string;
    upd_date: string;
}

export interface GetUserInfoResponse extends TmsKnpResponse {
    response: {
        results: GetUserInfoResult[];
    };
}

export interface GetUserInfoSessionList {
    session_id: string;
    client_id: string;
    login_date: string;
}

/**
 * [설정 > 사용자 설정] 사용자 정보 수정 API
 */
export interface PutUserInfoParams {
    gid: string;
    auth_code: AUTH_CODE;
    user_name: string;
    email: string;
    mobile_num: string;
    user_img_type: string;
    user_img: string;
    birth_date: string;
    enter_date: string;
    retire_date: string;
    dept_cd: string;
    umjp_cd: string;
    umpg_cd: string;
    umjo_cd: string;
    umjd_cd: string;
    twofa_type: string;
    is_lock_login: boolean;
    is_multi_login: boolean;
    is_sleeper_account: boolean;
}

export interface PutUserInfoResult {
    gid: string;
    group_name: string;
    npk_cds: string;
    uid: string;
    auth_code: AUTH_CODE;
    auth_name: string;
    user_account: string;
    user_name: string;
    email: string;
    mobile_num: string;
    user_img_type: string;
    user_img: string;
    birth_date: string;
    enter_date: string;
    retire_date: string;
    dept_cd: string;
    umjp_cd: string;
    umpg_cd: string;
    umjo_cd: string;
    umjd_cd: string;
    dept_nm: string;
    umjp_nm: string;
    umpg_nm: string;
    umjo_nm: string;
    umjd_nm: string;
    twofa_type: string;
    is_lock_login: boolean;
    is_multi_login: boolean;
    is_sleeper_account: boolean;
    last_login_date: string;
    pw_changed_date: string;
    pw_expire_days: number;
    session_count: number;
    session_list: PutUserInfoSessionList[];
    reg_date: string;
    upd_date: string;
}

export interface PutUserInfoResponse extends TmsKnpResponse {
    response: PutUserInfoResult;
}

export interface PutUserInfoSessionList {
    session_id: string;
    client_id: string;
    login_date: string;
}

/**
 * [설정 > 사용자 설정] 비밀번호 변경 API
 */

export interface PutUserPasswordParams {
    curr_password: string;
    new_password: string;
}

export interface PutUserPasswordResponse extends TmsKnpResponse {
    response: null;
}

/**
 * [설정 > 사용자 설정] 사용자 로그인 세션을 제거하는 API
 */

export interface DeleteUserSessionResult {
    session_id: string;
}

export interface DeleteUserSessionResponse extends TmsKnpResponse {
    response: DeleteUserSessionResult;
}

/*******************************************************************************
 * common code (공통 코드)
 *******************************************************************************/
/**
 * get 공통 코드 목록 조회 API interface
 */
export interface GetCommonCodeParams {
    code?: string;
    code_name?: string;
}

export interface GetCommonCodeResult {
    p_code: string;
    code: string;
    code_name: string;
    memo: string;
    is_used: boolean;
    is_modifiable: boolean;
    _children?: GetCommonCodeResult[];
}

export interface GetCommonCodeResponse extends TmsKnpResponse {
    response: {
        results: GetCommonCodeResult[];
        total_count: number;
    };
}

/**
 * post 공통 코드 등록 API interface
 */
export interface PostCommonCodeParams {
    p_code: string;
    code: string;
    code_name: string;
    memo?: string;
    is_used?: boolean;
    is_modifiable?: boolean;
}

export interface PostCommonCodeResponse extends TmsKnpResponse {
    response: number;
}

/**
 * put 공통 코드 수정 API interface
 */
export interface PutCommonCodeParams {
    key_code: string;
    code?: string;
    code_name?: string;
    memo?: string;
    is_used?: boolean;
    is_modifiable?: boolean;
}

export interface PutCommonCodeResponse extends TmsKnpResponse {
    response: number;
}

/**
 * post 공통 코드 삭제 API interface
 */
export interface DeleteCommonCodeParams {
    code: string;
}

export interface DeleteCommonCodeResponse extends TmsKnpResponse {
    response: number;
}

/*******************************************************************************
 * access history (접속 이력)
 *******************************************************************************/
/**
 * get 사용자 접속 이력 조회 API interface
 */
export interface GetUserLogsParams {
    login_start_time: string;
    login_end_time: string;
    user_account?: string;
}

export interface GetUserLogsResult {
    user_account: string;
    user_name: string;
    client_ip: string;
    login_date: string;
    logout_date: string;
}

export interface GetUserLogsResponse extends TmsKnpResponse {
    response: {
        results: GetUserLogsResult[];
        total_count: number;
    };
}

/*******************************************************************************
 * sms-group
 *******************************************************************************/
/**
 * SMS 그룹 목록 API interface
 */
export interface GetSmsGroupsParams {
    keyword?: string;
}

export interface GetSmsGroupsResult {
    id: number;
    sms_group_name: string;
    ordering: number;
    reg_date: string;
    upd_date: string;
}

export interface GetSmsGroupsResponse extends TmsKnpResponse {
    response: {
        results: GetSmsGroupsResult[];
        total_count: number;
    };
}

/**
 * SMS 그룹 상세 API interface
 */
export interface GetSmsGroupByIdParams {
    id: number;
}

export interface GetSmsGroupByIdResult {
    id: number;
    sms_group_name: string;
    user_list: {
        uid: string;
        user_account: string;
        user_name: string;
    }[];
}

export interface GetSmsGroupByIdResponse extends TmsKnpResponse {
    response: GetSmsGroupByIdResult;
}

/**
 * SMS 그룹 등록 API interface
 */
export interface PostSmsGroupParams {
    sms_group_name: string;
    uids: string[];
}

export interface PostSmsGroupResponse extends TmsKnpResponse {
    response: number;
}

/**
 * SMS 그룹 수정 API interface
 */
export interface PutSmsGroupParams {
    id: number;
    sms_group_name?: string;
    user_list?: string[];
}

export interface PutSmsGroupResponse extends TmsKnpResponse {
    response: number;
}

/**
 * SMS 그룹 삭제 API interface
 */
export interface DeleteSmsGroupsParams {
    ids: number[];
}

export interface DeleteSmsGroupsResponse extends TmsKnpResponse {
    response: number;
}

/**
 * SMS 그룹용 사용자 목록 API interface
 */
export interface GetSmsGroupUsersParams {
    keyword?: string;
}

export interface GetSmsGroupUsersResult {
    uid: string;
    user_account: string;
    user_name: string;
}

export interface GetSmsGroupUsersResponse extends TmsKnpResponse {
    response: {
        results: GetSmsGroupUsersResult[];
        total_count: number;
    };
}

/*******************************************************************************
 * template
 *******************************************************************************/
/**
 * 템플릿 목록(SMS/도움말) API interface
 */
export interface GetTemplatesParams {
    template_type: string; // SMS:문자, HELP:도움말
}

export interface GetTemplatesResult {
    id: number;
    title: string;
    content: string;
    reg_date: string;
    upd_date: string;
}

export interface GetTemplatesResponse extends TmsKnpResponse {
    response: {
        results: GetTemplatesResult[];
        total_count: number;
    };
}

/**
 * 템플릿 등록(SMS/도움말) API interface
 */
export interface PostTemplatesParams {
    title: string;
    content: string;
    template_type?: string; // SMS 기본 값, SMS, HELP
}
export interface PostTemplatesResponse extends TmsKnpResponse {
    response: number;
}

/**
 * 템플릿 수정(SMS) API interface
 */
export interface PutTemplateParams {
    id: number;
    title?: string;
    content?: string;
}

export interface PutTemplateResponse extends TmsKnpResponse {
    response: number;
}

/**
 * 템플릿 삭제(SMS) API interface
 */
export interface DeleteTemplateParams {
    ids: number[];
}

export interface DeleteTemplateResponse extends TmsKnpResponse {
    response: number;
}

/*******************************************************************************
 * user-prop
 *******************************************************************************/
/**
 * 개인 설정정보 조회 API interface
 */
export interface GetUserPropResult {
    prop_key: string;
    prop_value: string;
    is_used: boolean;
    upd_date: string;
}

export interface GetUserPropResponse extends TmsKnpResponse {
    response: {
        results: GetUserPropResult[];
        total_count: number;
    };
}

/**
 * 개인 설정정보 저장 API interface
 */
export interface PostUserPropParams {
    props: {
        prop_key: string;
        prop_value: string;
        is_used: boolean;
    }[];
}

export interface PostUserPropResponse extends TmsKnpResponse {
    response: number;
}

/*******************************************************************************
 * gis
 *******************************************************************************/
/**
 * 탐방로 주변검색 API interface
 */
export interface GetTrailLayerBufferParams {
    id: number;
    radius: number;
    layers: string[];
}

export interface GetTrailLayerBufferResult {
    type: number;
    id?: string;
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties:
        | CommonLayerProperties
        | CctvLayerProperties
        | OfficeLayerProperties
        | AwsLayerProperties
        | VrteLayerProperties
        | ShelterLayerProperties
        | CampSiteLayerProperties
        | RockFallSensorLayerProperties;
}

export interface GetTrailLayerBufferResponse {
    type: string;
    layer: string;
    features: GetTrailLayerBufferResult[];
}

/**
 * 탐방로 인접여부 API interface
 */
export interface GetTrailLayerIntersectsParams {
    geom: string;
    radius?: number;
}

export interface GetTrailLayerIntersectsResult {
    id: number;
    distance: number;
}

export interface GetTrailLayerIntersectsResponse extends TmsKnpResponse {
    response: {
        results: GetTrailLayerIntersectsResult[];
        total_count: number;
    };
}
