import { downloadFile, downloadFileWithBase64FileName } from "../../utils";
import { executeRequest, HTTP_REQUEST_TIMEOUT } from "../HttpService";

import { TmsKnpApi } from "./TmsKnpApi";
import {
    GetAssetLayersResponse,
    GetAssetFieldsParams,
    GetAssetFieldsResponse,
    GetAssetsParams,
    GetAssetsResponse,
    GetAssetByIdParams,
    GetAssetByIdResponse,
    PostAssetParams,
    PostAssetResponse,
    PutAssetParams,
    PutAssetResponse,
    DeleteAssetParams,
    DeleteAssetResponse,
    GetAuthInfoParams,
    GetAuthInfoResponse,
    GetAuthByIdParams,
    GetAuthByIdResponse,
    PutAuthSaveParams,
    PutAuthSaveResponse,
    PutAuthDefaultParams,
    PutAuthDefaultResponse,
    GetUserAuthParams,
    GetUserAuthResponse,
    GetCodeInfoParams,
    GetCodeInfoResponse,
    GetGroupsParams,
    GetGroupsResponse,
    ErrorResponse,
    PostGroupParams,
    PostGroupResponse,
    PutGroupParams,
    PutGroupResponse,
    DeleteGroupsParams,
    DeleteGroupsResponse,
    GetUsersByAdminParams,
    GetUsersByAdminResponse,
    GetUserByAdminParams,
    GetUserByAdminResponse,
    PutUserByAdminParams,
    PutUserByAdminResponse,
    PostUserByAdminParams,
    PostUserByAdminResponse,
    CheckUserAccountByAdminParams,
    CheckUserAccountByAdminResponse,
    ResetPasswordByAdminParams,
    ResetPasswordByAdminResponse,
    ResetOtpByAdminParams,
    ResetOtpByAdminResponse,
    GetLayersResponse,
    GetNpksResponse,
    GetNpkByIdParams,
    GetNpkByIdResponse,
    GetResourceInfoResponse,
    GetResourceReportResponse,
    GetRadarResponse,
    GetRadarParams,
    GetNpkUsersParams,
    GetNpkUsersResponse,
    ExportAssetsParams,
    ExportResourcesParams,
    GetAwsInfoResponse,
    GetAwsInfoParams,
    GetSatelliteResponse,
    ImportResourcesResponse,
    GetLayerStylesResponse,
    GetSearchAddressByCoordsParams,
    GetSearchAddressByCoordsResponse,
    GetSearchAddressByKeywordParams,
    GetSearchAddressByKeywordResponse,
    GetCommonCodeParams,
    GetCommonCodeResponse,
    PostCommonCodeParams,
    PostCommonCodeResponse,
    PutCommonCodeParams,
    PutCommonCodeResponse,
    DeleteCommonCodeParams,
    DeleteCommonCodeResponse,
    GetFileListResponse,
    UploadFileResult,
    DeleteFileResult,
    DownloadFileParams,
    DeleteFileParams,
    GetSatelliteParams,
    GetUltraShortRealtimeParams,
    GetUltraShortRealtimeResponse,
    GetNpkOfficesParams,
    GetNpkOfficesResponse,
    GetUserLogsResponse,
    GetUserLogsParams,
    GetUserInfoResponse,
    GetUserInfoParams,
    PutUserInfoResponse,
    PutUserInfoParams,
    PutUserPasswordParams,
    PutUserPasswordResponse,
    DeleteUserSessionResponse,
    GetResourceReportParams,
    GetForecastParams,
    GetUltraShortForecastResponse,
    GetShortForecastResponse,
    GetMidLandForecastParams,
    GetMidLandForecastResponse,
    GetSpecialReportCodeParams,
    GetSpecialReportCodeResponse,
    GetTemplatesParams,
    GetTemplatesResponse,
    GetSmsGroupsResponse,
    GetSmsGroupsParams,
    GetSmsGroupByIdParams,
    GetSmsGroupByIdResponse,
    PostSmsGroupParams,
    PostSmsGroupResponse,
    PutSmsGroupParams,
    PutSmsGroupResponse,
    DeleteSmsGroupsParams,
    DeleteSmsGroupsResponse,
    GetSmsGroupUsersParams,
    GetSmsGroupUsersResponse,
    DeleteUserByAdminParams,
    DeleteUserByAdminResponse,
    GetSpecialReportResponse,
    GetUserPropResponse,
    PostUserPropParams,
    PostUserPropResponse,
    GetTrailLayerBufferParams,
    GetTrailLayerBufferResponse,
    GetManualResponse,
    ImportManualResult,
    DownloadManualParams,
    DeleteManualParams,
    DeleteManualResult,
    GetPeriodicInfoResponse,
    GetPeriodicListResponse,
    GetPeriodicListParams,
    PostPeriodicReportResponse,
    DownloadPeriodicReportFileParams,
    ExportPeriodicReportsParams,
    UploadCheckPeriodicReportParams,
    UploadCheckPeriodicReportResponse,
    GetAuthMenuInfoResponse,
    PostTemplatesParams,
    PostTemplatesResponse,
    PostPeriodicSteepSlopeResponse,
    GetPeriodicSteepSlopeDetailParams,
    GetPeriodicSteepSlopeDetailResponse,
    DeletePeriodicReportParams,
    DeletePeriodicReportResponse,
    PutTemplateParams,
    DeleteTemplateParams,
    DeleteTemplateResponse,
    PutTemplateResponse,
    GetTrailLayerIntersectsParams,
    GetTrailLayerIntersectsResponse,
    GetControlInfoParams,
    GetControlInfoResponse,
    GetCurrentRtuParams,
    GetCurrentRtuResponse,
    GetSummaryRtuParams,
    GetSummaryRtuResponse,
    GetPeriodicDetailResponse,
    GetPeriodicDetailParams,
    GetRockFallSensorsParams,
    GetRockFallSensorsResponse,
    GetRockFallSensorDetailParams,
    GetRockFallSensorDetailResponse,
    GetRockFallSensorDataParams,
    GetRockFallSensorDataResponse,
    PutPeriodicSteepSlopeResponse,
    PutPeriodicReportResponse,
    GetBroadcastCountParams,
    GetBroadcastCountResponse,
    GetPeriodicSteepSlopeAssetParams,
    GetPeriodicSteepSlopeAssetResponse,
} from "./TmsKnpInterface";

export class TmsKnpHttp implements TmsKnpApi {
    private baseUrl = "/tms-knp/api/v1";

    /*******************************************************************************
     * asset
     *******************************************************************************/
    /**
     * @name getAssetLayers
     * @async
     * @function
     * @description 자산 종류(레이어 정보) 조회
     * @return {GetAssetLayersResponse | ErrorResponse | undefined}
     */
    public async getAssetLayers(): Promise<GetAssetLayersResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/asset/get/layers`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetAssetLayersResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getAssetFields
     * @function
     * @description 자산 필드 정보 조회
     * @return {GetAssetFieldsResponse | ErrorResponse | undefined}
     */
    public async getAssetFields(
        params: GetAssetFieldsParams
    ): Promise<GetAssetFieldsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/asset/get/fields`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetAssetFieldsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getAssets
     * @function
     * @description 자산 목록 조회
     * @param {GetAssetsParams} params 요청 파라미터
     * @param {string} params.layer_id 자산종류 (레이어ID)
     * @param {string} [params.npk_cd] 국립공원코드
     * @param {string} [params.asset_nm] 자산명 LIKE 검색
     * @param {string} [params.start_dt] 등록일자 From
     * @param {string} [params.end_dt] 등록일자 To
     * @param {number} [params.page_cnt] 페이지 갯수
     * @param {number} [params.page_num] 페이지 번호
     * @return {GetAssetsResponse | ErrorResponse | undefined}
     */
    public async getAssets(params: GetAssetsParams): Promise<GetAssetsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/asset/get/asset-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetAssetsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getAssetById
     * @function
     * @description 자산 상세 조회
     * @param {GetAssetByIdParams} params 요청 파라미터
     * @param {string} params.layer_id 자산종류 (레이어ID)
     * @param {number} params.id 자산 고유아이디
     * @return {GetAssetByIdResponse | ErrorResponse | undefined}
     */
    public async getAssetById(params: GetAssetByIdParams): Promise<GetAssetByIdResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/asset/get/asset-byid`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetAssetByIdResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postAsset
     * @function
     * @description 자산 등록
     * @param {PostAssetParams} params 요청 파라미터
     * @param {string} params.layer_id 자산종류 (레이어ID)
     * @param {string | number | object} [params.dynamic_fields] 해당 레이어의 맞는 데이터 (자산 필드 조회 API를 통해서 확인)
     * @return {PostAssetResponse | ErrorResponse | undefined}
     */
    public async postAsset(params: PostAssetParams): Promise<PostAssetResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/asset/post/asset`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostAssetResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putAsset
     * @function
     * @description 자산 수정
     * @param {PutAssetParams} params 요청 파라미터
     * @param {number} params.id 자산 고유아이디
     * @param {string} params.layer_id 자산종류 (레이어ID)
     * @param {string | number | object} [params.dynamic_fields] 해당 레이어의 맞는 데이터 (자산 필드 조회 API를 통해서 확인)
     * @return {PutAssetResponse | ErrorResponse | undefined}
     */
    public async putAsset(params: PutAssetParams): Promise<PutAssetResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/asset/put/asset`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutAssetResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name deleteAsset
     * @function
     * @description 자산 삭제
     * @param {DeleteAssetParams} params 요청 파라미터
     * @param {string} params.layer_id 자산종류 (레이어ID)
     * @param {number[]} params.ids 자산 고유아이디 배열
     * @return {DeleteAssetResponse | ErrorResponse | undefined}
     */
    public async deleteAsset(params: DeleteAssetParams): Promise<DeleteAssetResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/asset/delete/asset`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteAssetResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name exportAssets
     * @function
     * @description 자산 Excel 다운로드
     * @param {GetAssetsParams} params 요청 파라미터
     * @param {string} params.layer_id 자산종류 (레이어ID)
     * @param {string} [params.npk_cd] 국립공원코드
     * @param {string} [params.asset_nm] 자산명 LIKE 검색
     * @param {string} [params.start_dt] 등록일자 From
     * @param {string} [params.end_dt] 등록일자 To
     * @return void
     */
    public async exportAssets(params: ExportAssetsParams) {
        const response = await executeRequest(`${this.baseUrl}/asset/excel/asset-export`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
            responseType: "blob",
        });
        if (response && response.status == 200) {
            downloadFile(response);
        }
    }

    /*******************************************************************************
     * auth
     *******************************************************************************/
    /**
     * @name getAuthMenuInfo
     * @async
     * @function
     * @description 메뉴 정보 API
     * @return {GetAuthMenuInfoResponse | ErrorResponse | undefined}
     */
    public async getAuthMenuInfo(): Promise<GetAuthMenuInfoResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/auth/get/menu-info`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetAuthMenuInfoResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }
    /**
     * @name getAuthInfo
     * @async
     * @function
     * @description 권한 정보 조회 API
     * @param {GetAuthInfoParams} params 요청 파라미터
     * @param {string} [params.keyword] 검색 데이터
     * @return {GetAuthInfoResponse | ErrorResponse | undefined}
     */
    public async getAuthInfo(params: GetAuthInfoParams): Promise<GetAuthInfoResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/auth/get/auth-info`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetAuthInfoResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getAuthById
     * @async
     * @function
     * @description 권한 상세 조회 API
     * @param {GetAuthByIdParams} params 요청 파라미터
     * @param {string} params.auth_code 권한 코드
     * @return {GetAuthByIdResponse | ErrorResponse | undefined}
     */
    public async getAuthById(params: GetAuthByIdParams): Promise<GetAuthByIdResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/auth/get/auth-byid`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetAuthByIdResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putAuthSave
     * @async
     * @function
     * @description 권한 저장 API
     * @param {PutAuthSaveParams} params 요청 파라미터
     * @param {string} params.auth_code 권한 코드
     * @param {object[]} params.menu_roles 메뉴 권한 정보
     * @param {string} params.menu_roles.menu_code 메뉴 코드
     * @param {boolean} params.menu_roles.auth_delete 삭제 권한
     * @param {boolean} params.menu_roles.auth_approval 승인 권한
     * @return {PutAuthSaveResponse | ErrorResponse | undefined}
     */
    public async putAuthSave(params: PutAuthSaveParams): Promise<PutAuthSaveResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/auth/post/auth-save`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutAuthSaveResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putAuthSave
     * @async
     * @function
     * @description 권한 기본값 저장 API
     * @param {PutAuthDefaultParams} params 요청 파라미터
     * @param {string} params.auth_code 권한 코드
     * @return {PutAuthDefaultResponse | ErrorResponse | undefined}
     */
    public async putAuthDefault(
        params: PutAuthDefaultParams
    ): Promise<PutAuthDefaultResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/auth/put/default`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutAuthDefaultResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getUserAuth
     * @async
     * @function
     * @description 사용자 권한 정보 조회 API
     * @param {GetUserAuthParams} params 요청 파라미터
     * @param {string} params.auth_code 권한 코드
     * @return {GetUserAuthResponse | ErrorResponse | undefined}
     */
    public async getUserAuth(params: GetUserAuthParams): Promise<GetUserAuthResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/auth/get/user-auth`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetUserAuthResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * code
     *******************************************************************************/
    /**
     * @name getCodeInfo
     * @async
     * @function
     * @description 코드 정보 조회 API
     * @param {GetCodeInfoParams} params 요청 파라미터
     * @param {string} [params.p_code] 부모 코드
     * @return {GetCodeInfoResponse | ErrorResponse | undefined}
     */
    public async getCodeInfo(params: GetCodeInfoParams): Promise<GetCodeInfoResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/code/get/code-info`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetCodeInfoResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * dashboard
     *******************************************************************************/
    /**
     * @name getAwsInfo
     * @async
     * @function
     * @param {GetAwsInfoParams} params 요청 파라미터
     * @param {string} params.local_code aws 자산 코드
     * @description aws 자산 실시간 정보 조회
     * @return {GetAwsInfoResponse | ErrorResponse | undefined}
     */
    public async getAwsInfo(params: GetAwsInfoParams): Promise<GetAwsInfoResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/aws/current`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetAwsInfoResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getRadarInfo
     * @async
     * @function
     * @description 레이더 이미지 조회
     * @return {GetRadarResponse | ErrorResponse | undefined}
     */
    public async getRadarInfo(params: GetRadarParams): Promise<GetRadarResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/radar/cmpimg`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetRadarResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getSatelliteInfo
     * @async
     * @function
     * @description 위성 이미지 조회
     * @return {GetSatelliteResponse | ErrorResponse | undefined}
     */
    public async getSatelliteInfo(
        params: GetSatelliteParams
    ): Promise<GetSatelliteResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/satellite/img`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSatelliteResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getUltraShortRealtime
     * @async
     * @function
     * @description 초단기 실황 조회
     * @return {GetUltraShortRealtimeResponse | ErrorResponse | undefined}
     */
    public async getUltraShortRealtime(
        params: GetUltraShortRealtimeParams
    ): Promise<GetUltraShortRealtimeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/weather/ultra-short-realtime`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetUltraShortRealtimeResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getUltraShortForecast
     * @async
     * @function
     * @description 초단기 예보 조회
     * @return {GetUltraShortForecastResponse | ErrorResponse | undefined}
     */
    public async getUltraShortForecast(
        params: GetForecastParams
    ): Promise<GetUltraShortForecastResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/weather/ultra-short-forecast`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetUltraShortForecastResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getShortForecast
     * @async
     * @function
     * @description 단기 예보 조회
     * @return {GetShortForecastResponse | ErrorResponse | undefined}
     */
    public async getShortForecast(
        params: GetForecastParams
    ): Promise<GetShortForecastResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/weather/short-forecast`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetShortForecastResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getMidLandForecast
     * @async
     * @function
     * @description 중기 육상 예보 조회
     * @return {GetUltraShortRealtimeResponse | ErrorResponse | undefined}
     */
    public async getMidLandForecast(
        params: GetMidLandForecastParams
    ): Promise<GetMidLandForecastResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/weather/mid-land-forecast`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetMidLandForecastResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getSpecialReport
     * @async
     * @function
     * @description 특보 전문 조회
     * @return {GetSpecialReportResponse | ErrorResponse | undefined}
     */
    public async getSpecialReport(): Promise<GetSpecialReportResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/weather/special-report`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSpecialReportResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getSpecialReportCode
     * @async
     * @function
     * @description 특보 코드 조회
     * @return {GetSpecialReportCodeResponse | ErrorResponse | undefined}
     */
    public async getSpecialReportCode(
        params: GetSpecialReportCodeParams
    ): Promise<GetSpecialReportCodeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/weather/special-report-code`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSpecialReportCodeResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getControlInfo
     * @async
     * @function
     * @description 탐방로 통제 정보
     * @return {GetControlInfoResponse | ErrorResponse | undefined}
     */
    public async getControlInfo(
        params: GetControlInfoParams
    ): Promise<GetControlInfoResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/get/vrte-control-info`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetControlInfoResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getControlInfo
     * @async
     * @function
     * @description 자동우량 실시간 정보조회
     * @param {GetCurrentRtuParams} params 요청 파라미터
     * @param {string=} params.sys_id 시스템 ID
     * @param {string=} params.rtu_id 장비 ID
     * @return {GetCurrentRtuResponse | ErrorResponse | undefined}
     */
    public async getCurrentRtu(
        params: GetCurrentRtuParams
    ): Promise<GetCurrentRtuResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/rtu/current`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetCurrentRtuResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getSummaryMonthRtu
     * @async
     * @function
     * @description 자동우량 월 단위 통계조회
     * @param {GetSummaryRtuParams} params 요청 파라미터
     * @param {string=} params.sys_id 시스템 ID
     * @param {string=} params.rtu_id 장비 ID
     * @return {GetSummaryRtuResponse | ErrorResponse | undefined}
     */
    public async getSummaryMonthRtu(
        params: GetSummaryRtuParams
    ): Promise<GetSummaryRtuResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/rtu/summary-month`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSummaryRtuResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getSummaryWeekRtu
     * @async
     * @function
     * @description 자동우량 주 단위 통계조회
     * @param {GetSummaryRtuParams} params 요청 파라미터
     * @param {string=} params.sys_id 시스템 ID
     * @param {string=} params.rtu_id 장비 ID
     * @return {GetSummaryRtuResponse | ErrorResponse | undefined}
     */
    public async getSummaryWeekRtu(
        params: GetSummaryRtuParams
    ): Promise<GetSummaryRtuResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/rtu/summary-week`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSummaryRtuResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getSummaryDayRtu
     * @async
     * @function
     * @description 자동우량 일 단위 통계조회
     * @param {GetSummaryRtuParams} params 요청 파라미터
     * @param {string=} params.sys_id 시스템 ID
     * @param {string=} params.rtu_id 장비 ID
     * @return {GetSummaryRtuResponse | ErrorResponse | undefined}
     */
    public async getSummaryDayRtu(
        params: GetSummaryRtuParams
    ): Promise<GetSummaryRtuResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/rtu/summary-day`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSummaryRtuResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getRockFallSensors
     * @async
     * @function
     * @description 낙석계측기 센서목록 조회
     * @param {GetRockFallSensorsParams} params 요청 파라미터
     * @param {string=} params.asset_nm 낙석계측기 자산명
     * @return {GetRockFallSensorsResponse | ErrorResponse | undefined}
     */
    public async getRockFallSensors(
        params: GetRockFallSensorsParams
    ): Promise<GetRockFallSensorsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/rck/sensor-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetRockFallSensorsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getRockFallSensorDetail
     * @async
     * @function
     * @description 낙석계측기 상세 조회
     * @param {GetRockFallSensorDetailParams} params 요청 파라미터
     * @param {string=} params.asset_nm 낙석계측기 자산명
     * @return {GetRockFallSensorDetailResponse | ErrorResponse | undefined}
     */
    public async getRockFallSensorDetail(
        params: GetRockFallSensorDetailParams
    ): Promise<GetRockFallSensorDetailResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/rck/detail`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetRockFallSensorDetailResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getRockFallSensorData
     * @async
     * @function
     * @description 낙석계측기 센서별 데이터 조회(그래프)
     * @param {GetRockFallSensorDataParams} params 요청 파라미터
     * @param {string=} params.mng_no 관리번호
     * @param {string=} params.sensor_code 센서코드
     * @param {string=} params.sensor_num 센서번호
     * @param {string=} params.start_time 조회시간(Start)
     * @param {string=} params.end_time 조회시간(End)
     * @return {GetRockFallSensorDataResponse | ErrorResponse | undefined}
     */
    public async getRockFallSensorData(
        params: GetRockFallSensorDataParams
    ): Promise<GetRockFallSensorDataResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/rck/sensor-data`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetRockFallSensorDataResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getBroadcastCount
     * @async
     * @function
     * @description 자동우량 경보국 방송횟수 조회
     * @param {GetBroadcastCountParams} params 요청 파라미터
     * @param {string=} params.sys_id 시스템 ID
     * @param {string=} params.rtu_id 장비 ID
     * @return {GetBroadcastCountResponse | ErrorResponse | undefined}
     */
    public async getBroadcastCount(
        params: GetBroadcastCountParams
    ): Promise<GetBroadcastCountResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/dashboard/rtu/broadcast-count`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetBroadcastCountResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * file-list
     *******************************************************************************/
    /**
     * @name getFileList
     * @async
     * @function
     * @description [설정 > 시스템 설정] 보고서 양식 조회
     * @return {GetFileListResponse | ErrorResponse | undefined}
     */
    public async getFileList(): Promise<GetFileListResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/file/get/list`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetFileListResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name uploadFile
     * @async
     * @function
     * @description [설정 > 시스템 설정] 보고서 양식 업로드
     * @param {UploadFileParams} params 요청 파라미터
     * @return {UploadFileResult | ErrorResponse | undefined}
     */
    public async uploadFile(params: FormData): Promise<UploadFileResult | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/file/upload`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as UploadFileResult;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name downloadFileList
     * @async
     * @function
     * @description [설정 > 시스템 설정] 보고서 양식 다운로드
     * @param {DownloadFileParams} params 요청 파라미터
     */
    public async downloadFileList(params: DownloadFileParams) {
        const response = await executeRequest(`${this.baseUrl}/file/download`, {
            method: "GET",
            params: params,
            timeout: HTTP_REQUEST_TIMEOUT,
            responseType: "blob",
        });
        if (response && response.status == 200) {
            downloadFileWithBase64FileName(response);
        }
    }

    /**
     * @name deleteFileList
     * @async
     * @function
     * @description [설정 > 시스템 설정] 보고서 양식 삭제
     * @param {DeleteFileParams} params 요청 파라미터
     * @return {DeleteFileResult | ErrorResponse | undefined}
     */
    public async deleteFileList(params: DeleteFileParams): Promise<DeleteFileResult | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/file/delete`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteFileResult;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * geocode
     *******************************************************************************/
    /**
     * @name getSearchAddressByKeyword
     * @async
     * @function
     * @description 키워드 주소 검색
     * @param {GetSearchAddressByKeywordParams} params 요청 파라미터
     * @param {string} [params.query] 검색 키워드
     * @return {GetSearchAddressByKeywordResponse | ErrorResponse | undefined}
     */
    public async getSearchAddressByKeyword(
        params: GetSearchAddressByKeywordParams
    ): Promise<GetSearchAddressByKeywordResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/geocode/search-keyword`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSearchAddressByKeywordResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getSearchAddressByCoords
     * @async
     * @function
     * @description 위경도 주소 검색
     * @param {GetSearchAddressByCoordsParams} params 요청 파라미터
     * @param {number} [params.lat] 검색 키워드
     * @param {number} [params.lng] 검색 키워드
     * @return {GetSearchAddressByCoordsResponse | ErrorResponse | undefined}
     */
    public async getSearchAddressByCoords(
        params: GetSearchAddressByCoordsParams
    ): Promise<GetSearchAddressByCoordsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/geocode/coord2address`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSearchAddressByCoordsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * group
     *******************************************************************************/
    /**
     * @name getGroups
     * @async
     * @function
     * @description 그룹 목록 조회
     * @param {GetGroupsParams} params 요청 파라미터
     * @param {string} [params.keyword] 검색 데이터
     * @return {GetGroupsResponse | ErrorResponse | undefined}
     */
    public async getGroups(params: GetGroupsParams): Promise<GetGroupsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/group/get/group-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetGroupsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postGroup
     * @async
     * @function
     * @description 그룹 등록
     * @param {PostGroupParams} params 요청 파라미터
     * @param {string} params.group_name 그룹명
     * @param {string[]} [params.npk_auths] 자산권한 코드 배열 (npk_auth 테이블 참조)
     * @return {PostGroupResponse | ErrorResponse | undefined}
     */
    public async postGroup(params: PostGroupParams): Promise<PostGroupResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/group/post/group`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostGroupResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putGroup
     * @async
     * @function
     * @description 그룹 수정
     * @param {PutGroupParams} params 요청 파라미터
     * @param {string} params.gid 그룹 고유 아이디
     * @param {string} [params.group_name] 그룹명
     * @param {string[]} [params.npk_auths] 자산권한 코드 배열 (npk_auth 테이블 참조)
     * @return {PutGroupResponse | ErrorResponse | undefined}
     */
    public async putGroup(params: PutGroupParams): Promise<PutGroupResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/group/put/group`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutGroupResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name deleteGroups
     * @async
     * @function
     * @description 그룹 삭제
     * @param {DeleteGroupsParams} params 요청 파라미터
     * @param {string[]} params.gids 그룹 고유 아이디 배열
     * @return {DeleteGroupsResponse | ErrorResponse | undefined}
     */
    public async deleteGroups(params: DeleteGroupsParams): Promise<DeleteGroupsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/group/delete/group`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteGroupsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * users (admin)
     *******************************************************************************/
    /**
     * @name getUsersByAdmin
     * @async
     * @function
     * @description 사용자 목록 조회(관리자)
     * @param {GetUsersByAdminParams} params 요청 파라미터
     * @param {string} [params.gid] 필터링할 그룹 고유아이디
     * @param {string} [params.auth_code] 필터링할 권한 코드
     * @param {string} [params.user_filter] 필터링할 사용자 이름 또는 사원번호 (LIKE검색 아님)
     * @return {GetUsersByAdminResponse | ErrorResponse | undefined}
     */
    public async getUsersByAdmin(
        params: GetUsersByAdminParams
    ): Promise<GetUsersByAdminResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/admin/user/get/user-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetUsersByAdminResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getUserByAdmin
     * @async
     * @function
     * @description 사용자 상세 조회(관리자)
     * @param {GetUsersByAdminParams} params 요청 파라미터
     * @param {string} params.uid 사용자 고유아이디
     * @return {GetUserByAdminResponse | ErrorResponse | undefined}
     */
    public async getUserByAdmin(
        params: GetUserByAdminParams
    ): Promise<GetUserByAdminResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/admin/user/get/user`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetUserByAdminResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putUserByAdmin
     * @async
     * @function
     * @description 사용자 정보 수정(관리자)
     * @param {PutUserByAdminParams} params 요청 파라미터
     * @param {string} params.uid 사용자 고유아이디
     * @param {string} [params.gid] 그룹 고유아이디
     * @param {string} [params.auth_code] 권한 코드
     * @param {string} [params.user_name] 사용자 이름
     * @param {string} [params.email] 이메일
     * @param {string} [params.mobile_num] 핸드폰번호 (숫자만)
     * @param {string} [params.user_img_type] 사용자 사진 이미지 포맷
     * @param {string} [params.user_img] 사용자 사진 이미지 데이터 (base64)
     * @param {string} [params.birth_date] 생일 (YYYYMMDD)
     * @param {string} [params.enter_date] 입사일 (YYYYMMDD)
     * @param {string} [params.retire_date] 퇴사일 (YYYYMMDD)
     * @param {string} [params.dept_cd] 부서코드
     * @param {string} [params.umjp_cd] 직위코드
     * @param {string} [params.umpg_cd] 직급코드
     * @param {string} [params.umjo_cd] 직종코드
     * @param {string} [params.umjd_cd] 근무형태코드
     * @param {string} [params.twofa_type] 2차인증 타입 (NONE:사용안함, TOPT:구글OTP, SMS:SMS인증)
     * @param {string} [params.is_lock_login] 로그인 차단 여부
     * @param {string} [params.is_multi_login] 복수 로그인 가능여부
     * @param {string} [params.is_sleeper_account] 휴면계정 여부
     * @return {PutUserByAdminResponse | ErrorResponse | undefined}
     */
    public async putUserByAdmin(
        params: PutUserByAdminParams
    ): Promise<PutUserByAdminResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/admin/user/put/user`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutUserByAdminResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postUserByAdmin
     * @async
     * @function
     * @description 사용자 추가(관리자)
     * @param {PostUserByAdminParams} params 요청 파라미터
     * @param {string} params.gid 그룹 고유아이디
     * @param {string} params.auth_code 권한 코드
     * @param {string} params.user_name 사용자 이름
     * @param {string} params.email 이메일
     * @param {string} params.mobile_num 핸드폰번호 (숫자만)
     * @param {string} params.user_img_type 사용자 사진 이미지 포맷
     * @param {string} params.user_img 사용자 사진 이미지 데이터 (base64)
     * @param {string} params.birth_date 생일 (YYYYMMDD)
     * @param {string} params.enter_date 입사일 (YYYYMMDD)
     * @param {string} params.retire_date 퇴사일 (YYYYMMDD)
     * @param {string} params.dept_cd 부서코드
     * @param {string} params.umjp_cd 직위코드
     * @param {string} params.umpg_cd 직급코드
     * @param {string} params.umjo_cd 직종코드
     * @param {string} params.umjd_cd 근무형태코드
     * @param {string} params.twofa_type 2차인증 타입 (NONE:사용안함, TOPT:구글OTP, SMS:SMS인증)
     * @param {string} params.is_lock_login 로그인 차단 여부
     * @param {string} params.is_multi_login 복수 로그인 가능여부
     * @param {string} params.is_sleeper_account 휴면계정 여부
     * @return {PutUserByAdminResponse | ErrorResponse | undefined}
     */
    public async postUserByAdmin(
        params: PostUserByAdminParams
    ): Promise<PostUserByAdminResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/admin/user/post/user`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostUserByAdminResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name deleteUserByAdmin
     * @async
     * @function
     * @description 사용자 삭제(관리자)
     * @param {DeleteUserByAdminParams} params 요청 파라미터
     * @return {DeleteUserByAdminResponse | ErrorResponse | undefined}
     */
    public async deleteUserByAdmin(
        params: DeleteUserByAdminParams
    ): Promise<DeleteUserByAdminResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/admin/user/delete/user`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteUserByAdminResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postUserByAdmin
     * @async
     * @function
     * @description 사용자 아이디 중복 체크 API (관리자)
     * @param {CheckUserAccountByAdminParams} params 요청 파라미터
     * @param {string} params.user_account 사용자 고유아이디
     * @return {CheckUserAccountByAdminResponse | ErrorResponse | undefined}
     */
    public async checkUserAccountByAdmin(
        params: CheckUserAccountByAdminParams
    ): Promise<CheckUserAccountByAdminResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/admin/user/get/check-user-account`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as CheckUserAccountByAdminResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name resetPasswordByAdmin
     * @async
     * @function
     * @description 사용자 비밀번호 초기화 API (관리자)
     * @param {ResetPasswordByAdminParams} params 요청 파라미터
     * @param {string} params.uid 사용자 고유아이디
     * @return {ResetPasswordByAdminResponse | ErrorResponse | undefined}
     */
    public async resetPasswordByAdmin(
        params: ResetPasswordByAdminParams
    ): Promise<ResetPasswordByAdminResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/admin/user/put/reset-password`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as ResetPasswordByAdminResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name resetOtpByAdmin
     * @async
     * @function
     * @description 사용자 OTP 초기화 API (관리자)
     * @param {ResetOtpByAdminParams} params 요청 파라미터
     * @param {string} params.uid 사용자 고유아이디
     * @return {ResetOtpByAdminResponse | ErrorResponse | undefined}
     */
    public async resetOtpByAdmin(
        params: ResetOtpByAdminParams
    ): Promise<ResetOtpByAdminResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/admin/user/put/reset-otp-secret`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as ResetOtpByAdminResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * layer
     *******************************************************************************/
    /**
     * @name getLayers
     * @async
     * @function
     * @description 레이어 목록 조회
     * @return {GetLayersResponse | ErrorResponse | undefined}
     */
    public async getLayers(): Promise<GetLayersResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/layer/get/layer-list`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetLayersResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getLayerStyles
     * @async
     * @function
     * @description 레이어 스타일 목록 조회
     * @return {GetLayerStylesResponse | ErrorResponse | undefined}
     */
    public async getLayerStyles(): Promise<GetLayerStylesResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/layer/get/style-list`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetLayerStylesResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }
    /*******************************************************************************
     * manual 메뉴얼
     *******************************************************************************/
    /**
     * @name getManual
     * @async
     * @function
     * @description 메뉴얼 목록
     * @return {GetManualResponse | ErrorResponse | undefined}
     */
    public async getManual(): Promise<GetManualResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/manual/get/manual-list`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetManualResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name importManual
     * @async
     * @function
     * @description 메뉴얼 업로드
     * @param {FormData} params 요청 파라미터
     * @return {ImportManualResult | ErrorResponse | undefined}
     */
    public async importManual(params: FormData): Promise<ImportManualResult | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/manual/file/upload`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as ImportManualResult;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name downloadManual
     * @async
     * @function
     * @description 메뉴얼 다운로드
     * @param {DownloadManualParams} params 요청 파라미터
     */
    public async downloadManual(params: DownloadManualParams) {
        const response = await executeRequest(`${this.baseUrl}/manual/file/download`, {
            method: "GET",
            params: params,
            timeout: HTTP_REQUEST_TIMEOUT,
            responseType: "blob",
        });
        if (response && response.status == 200) {
            downloadFileWithBase64FileName(response);
        }
    }

    /**
     * @name deleteManual
     * @async
     * @function
     * @description 메뉴얼 삭제
     * @param {DeleteManualParams} params 요청 파라미터
     * @return {DeleteManualResult | ErrorResponse | undefined}
     */
    public async deleteManual(params: DeleteManualParams): Promise<DeleteManualResult | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/manual/delete/manual`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteManualResult;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * npk(국립공원)
     *******************************************************************************/
    /**
     * @name getNpks
     * @async
     * @function
     * @description 국립공원 목록 조회
     * @return {GetNpksResponse | ErrorResponse | undefined}
     */
    public async getNpks(): Promise<GetNpksResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/npk/get/npk-list`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetNpksResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getNpkById
     * @async
     * @function
     * @description 국립공원 상세 정보 조회
     * @param {GetNpkByIdParams} params 요청 파라미터
     * @param {string} params.npk_cd 국립공원코드
     * @return {GetNpkByIdResponse | ErrorResponse | undefined}
     */
    public async getNpkById(params: GetNpkByIdParams): Promise<GetNpkByIdResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/npk/get/npk-byid`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetNpkByIdResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getNpkUsers
     * @async
     * @function
     * @description 국립공원별 사용자 목록 조회
     * @param {GetNpkUsersParams} params 요청 파라미터
     * @param {string} params.npk_cd 국립공원코드
     * @return {GetNpkUsersResponse | ErrorResponse | undefined}
     */
    public async getNpkUsers(params: GetNpkUsersParams): Promise<GetNpkUsersResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/npk/get/npk-user-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetNpkUsersResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getNpkOffices
     * @async
     * @function
     * @description 국립공원별 사무소 목록 조회
     * @param {GetNpkOfficesParams} params 요청 파라미터
     * @param {string} params.npk_cd 국립공원코드
     * @return {GetNpkOfficesResponse | ErrorResponse | undefined}
     */
    public async getNpkOffices(
        params: GetNpkOfficesParams
    ): Promise<GetNpkOfficesResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/npk/get/npo-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetNpkOfficesResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * periodic
     *******************************************************************************/
    /**
     * @name getPeriodicInfo
     * @async
     * @function
     * @description 정기보고 정보 조회
     * @return {GetPeriodicInfoResponse | ErrorResponse | undefined}
     */
    public async getPeriodicInfo(): Promise<GetPeriodicInfoResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/get/periodic-info`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetPeriodicInfoResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getPeriodicDetail
     * @async
     * @function
     * @description 정기보고 상세 조회
     * @return {GetPeriodicDetailResponse | ErrorResponse | undefined}
     */
    public async getPeriodicDetail(
        params: GetPeriodicDetailParams
    ): Promise<GetPeriodicDetailResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/get/periodic-byid`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetPeriodicDetailResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getPeriodicList
     * @async
     * @function
     * @description 정기보고 목록 조회
     * @param {GetPeriodicListParams} params 요청 파라미터
     * @param {string} params.periodic_cod 정기보고 코드
     * @param {string} params.npk_cd 국립공원 코드
     * @param {string} params.npo_cd 사무소 코드
     * @param {string} params.start_dt 등록일자 From
     * @param {string} params.end_dt 등록일자 To
     * @param {number} params.page_cnt 페이지 갯수
     * @param {number} params.page_num 페이지 번호
     * @return {GetPeriodicListResponse | ErrorResponse | undefined}
     */
    public async getPeriodicList(
        params: GetPeriodicListParams
    ): Promise<GetPeriodicListResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/get/periodic-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetPeriodicListResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postPeriodicReport
     * @async
     * @function
     * @description 정기보고 파일 업로드
     * @param {FormData} params 요청 파라미터
     * @param {string} params.periodic_code 정기보고 코드
     * @param {string} params.npk_cd 국립공원 코드
     * @param {string} params.npo_cd 사무소 코드
     * @param {string} params.title 정기보고 제목
     * @param {string} params.periodic_state 정기보고 상태
     * @param {File} params.upload_file 업로드 파일
     * @return {PostPeriodicReportResponse | ErrorResponse | undefined}
     */
    public async postPeriodicReport(params: FormData): Promise<PostPeriodicReportResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/file/upload`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostPeriodicReportResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name downloadPeriodicReportFile
     * @async
     * @function
     * @description  정기보고 파일 다운로드
     * @param {DownloadPeriodicReportFileParams} params 요청 파라미터
     * @param {number} params.id 파일 고유아이디
     */
    public async downloadPeriodicReportFile(
        params: DownloadPeriodicReportFileParams
    ): Promise<File | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/file/download`, {
            method: "GET",
            params: params,
            timeout: HTTP_REQUEST_TIMEOUT,
            responseType: "blob",
        });
        if (response && response.status == 200) {
            if (params) {
                downloadFileWithBase64FileName(response);
                return undefined;
            } else {
                return response.data as File;
            }
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name exportPeriodicReports
     * @async
     * @function
     * @description 정기보고 Excel 다운로드
     * @param {ExportPeriodicReportsParams} params 요청 파라미터
     * @param {string} params.periodic_code 정기보고 코드
     * @param {string} params.npk_cd 국립공원 코드
     * @param {string} params.npo_cd 사무소 코드
     * @param {string} params.start_dt 등록일자 From
     * @param {string} params.end_dt 등록일자 To
     */
    public async exportPeriodicReports(params: ExportPeriodicReportsParams) {
        const response = await executeRequest(`${this.baseUrl}/periodic/excel/periodic-export`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
            responseType: "blob",
        });
        if (response && response.status == 200) {
            downloadFile(response);
        }
    }

    /**
     * @name uploadCheckPeriodicReport
     * @async
     * @function
     * @description 정기보고 업로드 현황
     * @param {UploadCheckPeriodicReportParams} params 요청 파라미터
     * @param {string} params.periodic_code 정기보고 코드
     * @param {string} params.upload_cycle 적용 기간
     * @return {UploadCheckPeriodicReportResponse | ErrorResponse | undefined}
     */
    public async uploadCheckPeriodicReport(
        params: UploadCheckPeriodicReportParams
    ): Promise<UploadCheckPeriodicReportResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/get/upload-check`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as UploadCheckPeriodicReportResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postPeriodicSteepSlope
     * @async
     * @function
     * @description 급경사지 폼 업로드
     * @param {FormData} params 요청 파라미터
     * @param {string} params.periodic_code 정기보고 코드
     * @param {string} params.npk_cd 국립공원 코드
     * @param {string} params.npo_cd 사무소 코드
     * @param {string} params.title 정기보고 제목
     * @param {string} params.periodic_state 정기보고 상태
     * @param {string} params.place_no 현장번호
     * @param {string} params.grade 등급
     * @param {number} params.latitude 위도
     * @param {number} params.longitude 경도
     * @param {number} params.height 높이
     * @param {number} params.extension 연장
     * @param {number} params.slope 경사
     * @param {number} params.slope_direction 방향
     * @param {string} params.checker 점검자
     * @param {string} params.check_date 점검일자
     * @param {string} params.report_date 보고일자
     * @param {string} params.check_category 점검항목
     * @param {string} params.check_category_memo 점검항목 기타 내용
     * @param {string} params.detail_check_content 세부점검내용
     * @param {string} params.check_result 점검결과
     * @param {string} params.check_result_memo 점검결과 기타 내용
     * @param {string} params.detail_content 세부내용
     * @param {string} params.action_result 조치결과
     * @param {string} params.action_result_memo 조치결과 기타 내용
     * @param {string} params.next_plan 향후계획
     * @param {string} params.action_plan 조치계획
     * @param {File[]} params.upload_file 업로드 파일
     * @return {PostPeriodicSteepSlopeResponse | ErrorResponse | undefined}
     */
    public async postPeriodicSteepSlope(
        params: FormData
    ): Promise<PostPeriodicSteepSlopeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/post/steep-slope`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as UploadCheckPeriodicReportResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getPeriodicSteepSlopeDetail
     * @async
     * @function
     * @description 급경사지 상세
     * @param {GetPeriodicSteepSlopeDetailParams} params 요청 파라미터
     * @param {number} params.id 정기보고 고유아이디
     * @return {GetPeriodicSteepSlopeDetailResponse | ErrorResponse | undefined}
     */
    public async getPeriodicSteepSlopeDetail(
        params: GetPeriodicSteepSlopeDetailParams
    ): Promise<GetPeriodicSteepSlopeDetailResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/get/steep-slope-byid`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetPeriodicSteepSlopeDetailResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name deletePeriodicReport
     * @function
     * @description 정기보고 삭제
     * @param {DeletePeriodicReportParams} params 요청 파라미터
     * @param {number[]} params.id 정기보고 고유아이디 배열
     * @return {DeletePeriodicReportResponse | ErrorResponse | undefined}
     */
    public async deletePeriodicReport(
        params: DeletePeriodicReportParams
    ): Promise<DeletePeriodicReportResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/delete/periodic`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeletePeriodicReportResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putPeriodicReport
     * @async
     * @function
     * @description 정기보고 수정
     * @param {FormData} params 요청 파라미터
     * @param {string} params.id 정기보고 고유아이디
     * @param {string} params.npk_cd 국립공원 코드
     * @param {string} params.npo_cd 사무소 코드
     * @param {string} params.title 정기보고 제목
     * @param {string} params.periodic_state 정기보고 상태
     * @param {File} params.upload_file 업로드 파일
     * @return {PutPeriodicReportResponse | ErrorResponse | undefined}
     */
    public async putPeriodicReport(params: FormData): Promise<PutPeriodicReportResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/put/periodic`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutPeriodicReportResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putPeriodicSteepSlope
     * @async
     * @function
     * @description 급경사지 수정
     * @param {string} params.id 정기보고 고유아이디
     * @param {number[]} params.file_ids 유지할 파일 아이디 배열
     * @param {string} params.npk_cd 국립공원 코드
     * @param {string} params.npo_cd 사무소 코드
     * @param {string} params.title 정기보고 제목
     * @param {string} params.periodic_state 정기보고 상태
     * @param {File[]} params.upload_file 업로드 파일
     * @param {string} params.place_no 현장번호
     * @param {string} params.grade 등급
     * @param {number} params.latitude 위도
     * @param {number} params.longitude 경도
     * @param {number} params.height 높이
     * @param {number} params.extension 연장
     * @param {number} params.slope 경사
     * @param {number} params.slope_direction 방향
     * @param {string} params.checker 점검자
     * @param {string} params.check_date 점검일자
     * @param {string} params.report_date 보고일자
     * @param {string} params.check_category 점검항목
     * @param {string} params.check_category_memo 점검항목 기타 내용
     * @param {string} params.detail_check_content 세부점검내용
     * @param {string} params.check_result 점검결과
     * @param {string} params.check_result_memo 점검결과 기타 내용
     * @param {string} params.detail_content 세부내용
     * @param {string} params.action_result 조치결과
     * @param {string} params.action_result_memo 조치결과 기타 내용
     * @param {string} params.next_plan 향후계획
     * @param {string} params.action_plan 조치계획
     * @return {PutPeriodicSteepSlopeResponse | ErrorResponse | undefined}
     */
    public async putPeriodicSteepSlope(
        params: FormData
    ): Promise<PutPeriodicSteepSlopeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/put/steep-slope`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutPeriodicSteepSlopeResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getPeriodicSteepSlopeAsset
     * @async
     * @function
     * @description 급경사지 자산 조회
     * @param {GetPeriodicSteepSlopeAssetParams} params 요청 파라미터
     * @param {string} params.place_no 현장번호
     * @param {string} params.grade 등급
     * @param {number} params.latitude 위도
     * @param {number} params.longitude 경도
     * @return {GetPeriodicSteepSlopeAssetResponse | ErrorResponse | undefined}
     */
    public async getPeriodicSteepSlopeAsset(
        params: GetPeriodicSteepSlopeAssetParams
    ): Promise<GetPeriodicSteepSlopeAssetResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/periodic/get/steep-slope-asset`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetPeriodicSteepSlopeAssetResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * resource
     *******************************************************************************/
    /**
     * @name getResourceInfo
     * @async
     * @function
     * @description 장비 정보 조회
     * @return {GetResourceInfoResponse | ErrorResponse | undefined}
     */
    public async getResourceInfo(): Promise<GetResourceInfoResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/resource/get/resource-info`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetResourceInfoResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getResourceReport
     * @async
     * @function
     * @description 장비 현황 조회
     * @return {GetResourceReportResponse | ErrorResponse | undefined}
     */
    public async getResourceReport(
        params: GetResourceReportParams
    ): Promise<GetResourceReportResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/resource/get/resource-report`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetResourceReportResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name exportResources
     * @async
     * @function
     * @description 장비 현황 Excel 다운로드
     * @param {ExportResourcesParams} params 요청 파라미터
     * @param {string} [params.is_sample] 샘플로 다운로드
     * @return void
     */
    public async exportResources(params: ExportResourcesParams) {
        const response = await executeRequest(`${this.baseUrl}/resource/excel/resource-export`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
            responseType: "blob",
        });
        if (response && response.status == 200) {
            downloadFile(response);
        }
    }

    /**
     * @name importResources
     * @async
     * @function
     * @description 장비 현황 Excel 업로드
     * @param {FormData} params 요청 파라미터
     * @param {File} [params.hwp_file] 장비관리 엑셀파일
     * @return {ImportResourcesResponse | ErrorResponse | undefined}
     */
    public async importResources(params: FormData): Promise<ImportResourcesResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/resource/excel/resource-import`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as ImportResourcesResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * [설정 > 사용자 설정]
     *******************************************************************************/
    /**
     * @name getUserInfo
     * @async
     * @function
     * @description 사용자 정보 조회 API
     * @param {GetUserInfoParams} params 요청 파라미터
     * @param {string} params.auth_code 권한 코드
     * @return {GetUserInfoResponse | ErrorResponse | undefined}
     */
    public async getUserInfo(params: GetUserInfoParams): Promise<GetUserInfoResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/user/get/user`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetUserInfoResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putUserInfo
     * @async
     * @function
     * @description 사용자 정보 수정 API
     * @param {PutUserInfoParams} params 요청 파라미터
     * @param {string} params.auth_code 권한 코드
     * @return {PutUserInfoResponse | ErrorResponse | undefined}
     */
    public async putUserInfo(params: PutUserInfoParams): Promise<PutUserInfoResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/user/put/user`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutUserInfoResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putUserPassword
     * @async
     * @function
     * @description 사용자 비밀번호 변경 API
     * @return {PutUserPasswordResponse | ErrorResponse | undefined}
     */
    public async putUserPassword(
        params: PutUserPasswordParams
    ): Promise<PutUserPasswordResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/user/put/user-password`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutUserPasswordResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name deleteUserSession
     * @async
     * @function
     * @description 사용자 정보 조회 API
     * @return {DeleteUserSessionResponse | ErrorResponse | undefined}
     */
    public async deleteUserSession(): Promise<DeleteUserSessionResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/user/delete/user-session`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteUserSessionResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * common code (공통 코드)
     *******************************************************************************/
    /**
     * @name getCommonCodes
     * @async
     * @function
     * @description 공통 코드 목록 조회
     * @return {GetCommonCodeResponse | ErrorResponse | undefined}
     */
    public async getCommonCodes(
        params: GetCommonCodeParams
    ): Promise<GetCommonCodeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/code/get/code-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetCommonCodeResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postCommonCode
     * @async
     * @function
     * @param {PostCommonCodeParams} params 요청 파라미터
     * @param {string} params.p_code 부모 코드
     * @param {string} params.code 코드
     * @param {string} params.code_name 코드 명
     * @param {string} [params.memo] 메모
     * @param {string} [params.is_used=true] 사용 여부
     * @param {string} [params.is_modifiable=true] 수정 가능 여부
     * @description 공통 코드 등록
     * @return {PostCommonCodeResponse | ErrorResponse | undefined}
     */
    public async postCommonCode(
        params: PostCommonCodeParams
    ): Promise<PostCommonCodeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/code/post/code`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostCommonCodeResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putCommonCode
     * @async
     * @function
     * @param {PostCommonCodeParams} params 요청 파라미터
     * @param {string} params.key_code 원본 코드
     * @param {string} params.code 변경 대상 신규 코드
     * @param {string} params.code_name 코드 명
     * @param {string} [params.memo] 메모
     * @param {string} [params.is_used=true] 사용 여부
     * @param {string} [params.is_modifiable=true] 수정 가능 여부
     * @description 공통 코드 등록
     * @return {PutCommonCodeResponse | ErrorResponse | undefined}
     */
    public async putCommonCode(
        params: PutCommonCodeParams
    ): Promise<PutCommonCodeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/code/put/code`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutCommonCodeResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name deleteCommonCode
     * @async
     * @function
     * @param {DeleteCommonCodeParams} params 요청 파라미터
     * @param {string} params.code 삭제 대상 코드
     * @description 공통 코드 삭제
     * @return {DeleteCommonCodeResponse | ErrorResponse | undefined}
     */
    public async deleteCommonCode(
        params: DeleteCommonCodeParams
    ): Promise<DeleteCommonCodeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/code/delete/code`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteCommonCodeResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * access history (접속 이력)
     *******************************************************************************/
    /**
     * @name getUserLogs
     * @async
     * @function
     * @param {GetUserLogsParams} params 요청 파라미터
     * @param {string} params.login_start_date 로그 검색 시작 시간
     * @param {string} params.login_end_date 로그 검색 종료 시간 (최대 검색 기간은 1개월)
     * @param {string} [params.user_account] 코드 명
     * @description 사용자 접속 이력 조회
     * @return {GetUserLogsResponse | ErrorResponse | undefined}
     */
    public async getUserLogs(params: GetUserLogsParams): Promise<GetUserLogsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/admin/log/get/loginlog`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetUserLogsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * sms-group
     *******************************************************************************/
    /**
     * @name getSmsGroups
     * @async
     * @function
     * @description SMS 그룹 목록
     * @param {GetSmsGroupsParams} params 요청 파라미터
     * @param {string} [params.keyword] 검색 데이터
     * @return {GetSmsGroupsResponse | ErrorResponse | undefined}
     */
    public async getSmsGroups(params: GetSmsGroupsParams): Promise<GetSmsGroupsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/sms-group/get/sms-group-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSmsGroupsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getSmsGroupById
     * @async
     * @function
     * @description SMS 그룹 상세
     * @param {GetSmsGroupByIdParams} params 요청 파라미터
     * @param {string} params.id SMS 그룹 고유아이디
     * @return {GetSmsGroupByIdResponse | ErrorResponse | undefined}
     */
    public async getSmsGroupById(
        params: GetSmsGroupByIdParams
    ): Promise<GetSmsGroupByIdResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/sms-group/get/sms-group-byid`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSmsGroupByIdResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postSmsGroup
     * @async
     * @function
     * @description SMS 그룹 등록
     * @param {PostSmsGroupParams} params 요청 파라미터
     * @param {string} params.sms_group_name SMS 그룹명
     * @param {string[]} params.user_list 사용자 고유아이디 배열
     * @return {PostSmsGroupResponse | ErrorResponse | undefined}
     */
    public async postSmsGroup(params: PostSmsGroupParams): Promise<PostSmsGroupResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/sms-group/post/sms-group`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostSmsGroupResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putSmsGroup
     * @async
     * @function
     * @description SMS 그룹 수정
     * @param {PutSmsGroupParams} params 요청 파라미터
     * @param {string} params.gid SMS 그룹 고유아이디
     * @param {string} [params.sms_group_name] SMS 그룹명
     * @param {string[]} [params.user_list] 사용자 고유아이디 배열
     * @return {PutSmsGroupResponse | ErrorResponse | undefined}
     */
    public async putSmsGroup(params: PutSmsGroupParams): Promise<PutSmsGroupResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/sms-group/put/sms-group`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutSmsGroupResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name deleteSmsGroups
     * @async
     * @function
     * @description SMS 그룹 삭제
     * @param {DeleteSmsGroupsParams} params 요청 파라미터
     * @param {string[]} params.id SMS 그룹 고유아이디
     * @return {DeleteSmsGroupsResponse | ErrorResponse | undefined}
     */
    public async deleteSmsGroups(
        params: DeleteSmsGroupsParams
    ): Promise<DeleteSmsGroupsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/sms-group/delete/sms-group`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteSmsGroupsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getSmsGroupUsers
     * @async
     * @function
     * @description SMS 그룹용 사용자 목록
     * @param {GetSmsGroupUsersParams} params 요청 파라미터
     * @param {string} [params.keyword] 검색 데이터
     * @return {GetSmsGroupUsersResponse | ErrorResponse | undefined}
     */
    public async getSmsGroupUsers(
        params: GetSmsGroupUsersParams
    ): Promise<GetSmsGroupUsersResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/sms-group/get/user-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSmsGroupUsersResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * template
     *******************************************************************************/
    /**
     * @name getTemplates
     * @async
     * @function
     * @param {GetTemplatesParams} params 요청 파라미터
     * @param {string} params.template_type 템플릿 코드 SMS:문자, HELP:도움말
     * @param {string} [params.code] 코드 (상황전파 화면에서 코드를 선택하여 템플릿을 조회 할 때 사용가능)
     * @description 템플릿 목록(SMS/도움말) API, type에 따라서 결과 포맷이 다름
     * @return {GetTemplatesResponse | ErrorResponse | undefined}
     */
    public async getTemplates(params: GetTemplatesParams): Promise<GetTemplatesResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/template/get/template-list`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetTemplatesResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postTemplate
     * @async
     * @function
     * @param {PostTemplatesParams} params 요청 파라미터
     * @param {string} params.title 제목 (SMS 템플릿 제목)
     * @param {string} params.content 템플릿 내용
     * @param {string} [params.template_type] 템플릿 종류 (SMS가 기본값)
     * @description 템플릿 등록(SMS/도움말)
     * @return {PostTemplatesResponse | ErrorResponse | undefined}
     */
    public async postTemplate(params: PostTemplatesParams): Promise<PostTemplatesResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/template/post/template`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostTemplatesResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name putTemplate
     * @async
     * @function
     * @param {PutTemplateParams} params 요청 파라미터
     * @param {string} params.id 템플릿 고유 아이디
     * @param {string} [params.code] 코드 재난상황(p_code):SITU
     * @param {string} [params.content] 템플릿 내용
     * @param {string} [params.title] 제목 (LMS 등 제목에 사용을 위함)
     * @description SMS 템플릿 수정
     * @return {PutTemplateResponse | ErrorResponse | undefined}
     */
    public async putTemplate(params: PutTemplateParams): Promise<PutTemplateResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/template/put/template`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PutTemplateResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name deleteTemplate
     * @async
     * @function
     * @param {DeleteTemplateParams} params 요청 파라미터
     * @param {string[]} params.ids 삭제 대상 템플릿 id 목록
     * @description SMS 템플릿 수정
     * @return {DeleteTemplateResponse | ErrorResponse | undefined}
     */
    public async deleteTemplate(
        params: DeleteTemplateParams
    ): Promise<DeleteTemplateResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/template/delete/template`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteTemplateResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }
    /*******************************************************************************
     * user-prop
     *******************************************************************************/
    /**
     * @name getUserProp
     * @async
     * @function
     * @description 개인별 설정 정보를 조회한다.
     * @return {GetUserPropResponse | ErrorResponse | undefined}
     */
    public async getUserProp(): Promise<GetUserPropResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/user-prop/get/user-prop`, {
            method: "POST",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetUserPropResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name postUserProp
     * @async
     * @function
     * @param {PostUserPropParams} params 요청 파라미터
     * @param {object[]} params.props 설정정보 배열
     * @param {string} params.props.prop_key 설정 키
     * @param {boolean} params.props.prop_value 설정 값
     * @param {boolean} params.props.is_used 설정 사용 여부
     * @description 개인별 설정 정보를 저장한다.
     * @return {PostUserPropResponse | ErrorResponse | undefined}
     */
    public async postUserProp(params: PostUserPropParams): Promise<PostUserPropResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/user-prop/post/user-prop`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostUserPropResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /*******************************************************************************
     * gis
     *******************************************************************************/
    /**
     * @name getTrailLayerBuffer
     * @async
     * @function
     * @param {GetTrailLayerBufferParams} params 요청 파라미터
     * @param {number} params.id 탐방로 고유 아이디
     * @param {number} params.radius 주변 검색 반경 (meter)
     * @param {string[]} params.layers 레이어 ID 목록
     * @description 탐방로 주변검색
     * @return {GetTrailLayerBufferResponse[] | ErrorResponse | undefined}
     */
    public async getTrailLayerBuffer(
        params: GetTrailLayerBufferParams
    ): Promise<GetTrailLayerBufferResponse[] | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/gis/get/vrte-buffer`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetTrailLayerBufferResponse[];
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }

    /**
     * @name getTrailLayerIntersects
     * @async
     * @function
     * @param {GetTrailLayerIntersectsParams} params 요청 파라미터
     * @param {string} params.geom 위치 데이터
     * @param {number} [params.radius] 주변 검색 반경 (meter)
     * @description 탐방로 인접여부
     * @return {GetTrailLayerIntersectsResponse | ErrorResponse | undefined}
     */
    public async getTrailLayerIntersects(
        params: GetTrailLayerIntersectsParams
    ): Promise<GetTrailLayerIntersectsResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/gis/get/vrte-intersects`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetTrailLayerIntersectsResponse;
        }
        if (response && typeof response.data === "object") {
            return response.data as unknown as ErrorResponse;
        }
        if (response && response.status == 401) {
            window.location.reload();
        }
        return undefined;
    }
}
