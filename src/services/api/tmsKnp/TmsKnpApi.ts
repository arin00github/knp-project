import { TmsKnpHttp } from "./TmsKnpHttp";
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
    PutAuthSaveParams,
    PutAuthSaveResponse,
    PutAuthDefaultParams,
    PutAuthDefaultResponse,
    GetUserAuthParams,
    GetUserAuthResponse,
    GetCodeInfoParams,
    GetCodeInfoResponse,
    GetNpkUsersParams,
    GetNpkUsersResponse,
    GetRadarResponse,
    GetRadarParams,
    ExportAssetsParams,
    ExportResourcesParams,
    GetAwsInfoParams,
    GetAwsInfoResponse,
    GetSatelliteParams,
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
    GetUltraShortRealtimeResponse,
    GetUltraShortRealtimeParams,
    GetNpkOfficesParams,
    GetNpkOfficesResponse,
    GetUserLogsParams,
    GetUserLogsResponse,
    GetUserInfoResponse,
    GetUserInfoParams,
    PutUserInfoParams,
    PutUserInfoResponse,
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
    GetSmsGroupsParams,
    GetSmsGroupsResponse,
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
    DeleteManualResult,
    DeleteManualParams,
    GetPeriodicInfoResponse,
    GetPeriodicListParams,
    GetPeriodicListResponse,
    PostPeriodicReportResponse,
    DownloadPeriodicReportFileParams,
    ExportPeriodicReportsParams,
    UploadCheckPeriodicReportParams,
    PostTemplatesParams,
    PostTemplatesResponse,
    UploadCheckPeriodicReportResponse,
    GetAuthMenuInfoResponse,
    DeletePeriodicReportParams,
    DeletePeriodicReportResponse,
    GetPeriodicSteepSlopeDetailResponse,
    GetPeriodicSteepSlopeDetailParams,
    PostPeriodicSteepSlopeResponse,
    PutTemplateParams,
    PutTemplateResponse,
    DeleteTemplateResponse,
    DeleteTemplateParams,
    GetTrailLayerIntersectsParams,
    GetTrailLayerIntersectsResponse,
    GetControlInfoResponse,
    GetControlInfoParams,
    GetCurrentRtuParams,
    GetCurrentRtuResponse,
    GetSummaryRtuParams,
    GetSummaryRtuResponse,
    GetPeriodicDetailParams,
    GetPeriodicDetailResponse,
    GetRockFallSensorsParams,
    GetRockFallSensorsResponse,
    GetRockFallSensorDetailParams,
    GetRockFallSensorDetailResponse,
    GetRockFallSensorDataParams,
    GetRockFallSensorDataResponse,
    PutPeriodicReportResponse,
    PutPeriodicSteepSlopeResponse,
    GetBroadcastCountParams,
    GetBroadcastCountResponse,
    GetPeriodicSteepSlopeAssetParams,
    GetPeriodicSteepSlopeAssetResponse,
} from "./TmsKnpInterface";

export interface TmsKnpApi {
    // asset
    getAssetLayers(): Promise<GetAssetLayersResponse | ErrorResponse | undefined>;
    getAssetFields(params: GetAssetFieldsParams): Promise<GetAssetFieldsResponse | ErrorResponse | undefined>;
    getAssets(params: GetAssetsParams): Promise<GetAssetsResponse | ErrorResponse | undefined>;
    getAssetById(params: GetAssetByIdParams): Promise<GetAssetByIdResponse | ErrorResponse | undefined>;
    postAsset(params: PostAssetParams): Promise<PostAssetResponse | ErrorResponse | undefined>;
    putAsset(params: PutAssetParams): Promise<PutAssetResponse | ErrorResponse | undefined>;
    deleteAsset(params: DeleteAssetParams): Promise<DeleteAssetResponse | ErrorResponse | undefined>;
    exportAssets(params: ExportAssetsParams): void;
    // auth
    getAuthMenuInfo(): Promise<GetAuthMenuInfoResponse | ErrorResponse | undefined>;
    getAuthInfo(params: GetAuthInfoParams): Promise<GetAuthInfoResponse | ErrorResponse | undefined>;
    getAuthById(params: GetAuthByIdParams): Promise<GetAuthByIdResponse | ErrorResponse | undefined>;
    putAuthSave(params: PutAuthSaveParams): Promise<PutAuthSaveResponse | ErrorResponse | undefined>;
    putAuthDefault(params: PutAuthDefaultParams): Promise<PutAuthDefaultResponse | ErrorResponse | undefined>;
    getUserAuth(params: GetUserAuthParams): Promise<GetUserAuthResponse | ErrorResponse | undefined>;
    // code
    getCodeInfo(params: GetCodeInfoParams): Promise<GetCodeInfoResponse | ErrorResponse | undefined>;
    // dashboard
    getAwsInfo(params: GetAwsInfoParams): Promise<GetAwsInfoResponse | ErrorResponse | undefined>;
    getRadarInfo(params: GetRadarParams): Promise<GetRadarResponse | ErrorResponse | undefined>;
    getSatelliteInfo(params: GetSatelliteParams): Promise<GetSatelliteResponse | ErrorResponse | undefined>;
    getUltraShortRealtime(
        params: GetUltraShortRealtimeParams
    ): Promise<GetUltraShortRealtimeResponse | ErrorResponse | undefined>;
    getUltraShortForecast(
        params: GetForecastParams
    ): Promise<GetUltraShortForecastResponse | ErrorResponse | undefined>;
    getShortForecast(params: GetForecastParams): Promise<GetShortForecastResponse | ErrorResponse | undefined>;
    getMidLandForecast(
        params: GetMidLandForecastParams
    ): Promise<GetMidLandForecastResponse | ErrorResponse | undefined>;
    getSpecialReport(): Promise<GetSpecialReportResponse | ErrorResponse | undefined>;
    getSpecialReportCode(
        params: GetSpecialReportCodeParams
    ): Promise<GetSpecialReportCodeResponse | ErrorResponse | undefined>;
    getControlInfo(params: GetControlInfoParams): Promise<GetControlInfoResponse | ErrorResponse | undefined>;
    getCurrentRtu(params: GetCurrentRtuParams): Promise<GetCurrentRtuResponse | ErrorResponse | undefined>;
    getSummaryMonthRtu(params: GetSummaryRtuParams): Promise<GetSummaryRtuResponse | ErrorResponse | undefined>;
    getSummaryWeekRtu(params: GetSummaryRtuParams): Promise<GetSummaryRtuResponse | ErrorResponse | undefined>;
    getSummaryDayRtu(params: GetSummaryRtuParams): Promise<GetSummaryRtuResponse | ErrorResponse | undefined>;
    getRockFallSensors(
        params: GetRockFallSensorsParams
    ): Promise<GetRockFallSensorsResponse | ErrorResponse | undefined>;
    getRockFallSensorDetail(
        params: GetRockFallSensorDetailParams
    ): Promise<GetRockFallSensorDetailResponse | ErrorResponse | undefined>;
    getRockFallSensorData(
        params: GetRockFallSensorDataParams
    ): Promise<GetRockFallSensorDataResponse | ErrorResponse | undefined>;
    getBroadcastCount(params: GetBroadcastCountParams): Promise<GetBroadcastCountResponse | ErrorResponse | undefined>;
    // file-list
    getFileList(): Promise<GetFileListResponse | ErrorResponse | undefined>;
    uploadFile(params: FormData): Promise<UploadFileResult | ErrorResponse | undefined>;
    downloadFileList(params: DownloadFileParams): void;
    deleteFileList(params: DeleteFileParams): Promise<DeleteFileResult | ErrorResponse | undefined>;
    // geocode
    getSearchAddressByKeyword(
        params: GetSearchAddressByKeywordParams
    ): Promise<GetSearchAddressByKeywordResponse | ErrorResponse | undefined>;
    getSearchAddressByCoords(
        params: GetSearchAddressByCoordsParams
    ): Promise<GetSearchAddressByCoordsResponse | ErrorResponse | undefined>;
    // group
    getGroups(params: GetGroupsParams): Promise<GetGroupsResponse | ErrorResponse | undefined>;
    postGroup(params: PostGroupParams): Promise<PostGroupResponse | ErrorResponse | undefined>;
    putGroup(params: PutGroupParams): Promise<PutGroupResponse | ErrorResponse | undefined>;
    deleteGroups(params: DeleteGroupsParams): Promise<DeleteGroupsResponse | ErrorResponse | undefined>;
    // user(admin)
    getUsersByAdmin(params: GetUsersByAdminParams): Promise<GetUsersByAdminResponse | ErrorResponse | undefined>;
    getUserByAdmin(params: GetUserByAdminParams): Promise<GetUserByAdminResponse | ErrorResponse | undefined>;
    putUserByAdmin(params: PutUserByAdminParams): Promise<PutUserByAdminResponse | ErrorResponse | undefined>;
    postUserByAdmin(params: PostUserByAdminParams): Promise<PostUserByAdminResponse | ErrorResponse | undefined>;
    deleteUserByAdmin(params: DeleteUserByAdminParams): Promise<DeleteUserByAdminResponse | ErrorResponse | undefined>;
    checkUserAccountByAdmin(
        params: CheckUserAccountByAdminParams
    ): Promise<CheckUserAccountByAdminResponse | ErrorResponse | undefined>;
    resetPasswordByAdmin(
        params: ResetPasswordByAdminParams
    ): Promise<ResetPasswordByAdminResponse | ErrorResponse | undefined>;
    resetOtpByAdmin(params: ResetOtpByAdminParams): Promise<ResetOtpByAdminResponse | ErrorResponse | undefined>;
    // ###################### old
    getUserInfo(params: GetUserInfoParams): Promise<GetUserInfoResponse | ErrorResponse | undefined>;
    putUserInfo(params: PutUserInfoParams): Promise<PutUserInfoResponse | ErrorResponse | undefined>;
    putUserPassword(params: PutUserPasswordParams): Promise<PutUserPasswordResponse | ErrorResponse | undefined>;
    deleteUserSession(): Promise<DeleteUserSessionResponse | ErrorResponse | undefined>;
    // layer
    getLayers(): Promise<GetLayersResponse | ErrorResponse | undefined>;
    getLayerStyles(): Promise<GetLayerStylesResponse | ErrorResponse | undefined>;
    // manual
    getManual(): Promise<GetManualResponse | ErrorResponse | undefined>;
    importManual(params: FormData): Promise<ImportManualResult | ErrorResponse | undefined>;
    downloadManual(params: DownloadManualParams): void;
    deleteManual(params: DeleteManualParams): Promise<DeleteManualResult | ErrorResponse | undefined>;
    // npk
    getNpks(): Promise<GetNpksResponse | ErrorResponse | undefined>;
    getNpkById(params: GetNpkByIdParams): Promise<GetNpkByIdResponse | ErrorResponse | undefined>;
    getNpkUsers(params: GetNpkUsersParams): Promise<GetNpkUsersResponse | ErrorResponse | undefined>;
    getNpkOffices(params: GetNpkOfficesParams): Promise<GetNpkOfficesResponse | ErrorResponse | undefined>;
    // periodic
    getPeriodicInfo(): Promise<GetPeriodicInfoResponse | ErrorResponse | undefined>;
    getPeriodicDetail(params: GetPeriodicDetailParams): Promise<GetPeriodicDetailResponse | ErrorResponse | undefined>;
    getPeriodicList(params: GetPeriodicListParams): Promise<GetPeriodicListResponse | ErrorResponse | undefined>;
    postPeriodicReport(params: FormData): Promise<PostPeriodicReportResponse | ErrorResponse | undefined>;
    downloadPeriodicReportFile(params: DownloadPeriodicReportFileParams): Promise<File | ErrorResponse | undefined>;
    exportPeriodicReports(params: ExportPeriodicReportsParams): void;
    uploadCheckPeriodicReport(
        params: UploadCheckPeriodicReportParams
    ): Promise<UploadCheckPeriodicReportResponse | ErrorResponse | undefined>;
    postPeriodicSteepSlope(params: FormData): Promise<PostPeriodicSteepSlopeResponse | ErrorResponse | undefined>;
    getPeriodicSteepSlopeDetail(
        params: GetPeriodicSteepSlopeDetailParams
    ): Promise<GetPeriodicSteepSlopeDetailResponse | ErrorResponse | undefined>;
    deletePeriodicReport(
        params: DeletePeriodicReportParams
    ): Promise<DeletePeriodicReportResponse | ErrorResponse | undefined>;
    putPeriodicReport(params: FormData): Promise<PutPeriodicReportResponse | ErrorResponse | undefined>;
    putPeriodicSteepSlope(params: FormData): Promise<PutPeriodicSteepSlopeResponse | ErrorResponse | undefined>;
    getPeriodicSteepSlopeAsset(
        params: GetPeriodicSteepSlopeAssetParams
    ): Promise<GetPeriodicSteepSlopeAssetResponse | ErrorResponse | undefined>;
    // resource
    getResourceInfo(): Promise<GetResourceInfoResponse | ErrorResponse | undefined>;
    getResourceReport(params: GetResourceReportParams): Promise<GetResourceReportResponse | ErrorResponse | undefined>;
    exportResources(params: ExportResourcesParams): void;
    importResources(params: FormData): Promise<ImportResourcesResponse | ErrorResponse | undefined>;
    // common code
    getCommonCodes(params: GetCommonCodeParams): Promise<GetCommonCodeResponse | ErrorResponse | undefined>;
    postCommonCode(params: PostCommonCodeParams): Promise<PostCommonCodeResponse | ErrorResponse | undefined>;
    putCommonCode(params: PutCommonCodeParams): Promise<PutCommonCodeResponse | ErrorResponse | undefined>;
    deleteCommonCode(params: DeleteCommonCodeParams): Promise<DeleteCommonCodeResponse | ErrorResponse | undefined>;
    // access history
    getUserLogs(params: GetUserLogsParams): Promise<GetUserLogsResponse | ErrorResponse | undefined>;
    // sms-group
    getSmsGroups(params: GetSmsGroupsParams): Promise<GetSmsGroupsResponse | ErrorResponse | undefined>;
    getSmsGroupById(params: GetSmsGroupByIdParams): Promise<GetSmsGroupByIdResponse | ErrorResponse | undefined>;
    postSmsGroup(params: PostSmsGroupParams): Promise<PostSmsGroupResponse | ErrorResponse | undefined>;
    putSmsGroup(params: PutSmsGroupParams): Promise<PutSmsGroupResponse | ErrorResponse | undefined>;
    deleteSmsGroups(params: DeleteSmsGroupsParams): Promise<DeleteSmsGroupsResponse | ErrorResponse | undefined>;
    getSmsGroupUsers(params: GetSmsGroupUsersParams): Promise<GetSmsGroupUsersResponse | ErrorResponse | undefined>;
    // template
    getTemplates(params: GetTemplatesParams): Promise<GetTemplatesResponse | ErrorResponse | undefined>;
    postTemplate(params: PostTemplatesParams): Promise<PostTemplatesResponse | ErrorResponse | undefined>;
    putTemplate(params: PutTemplateParams): Promise<PutTemplateResponse | ErrorResponse | undefined>;
    deleteTemplate(params: DeleteTemplateParams): Promise<DeleteTemplateResponse | ErrorResponse | undefined>;
    // user-prop
    getUserProp(): Promise<GetUserPropResponse | ErrorResponse | undefined>;
    postUserProp(params: PostUserPropParams): Promise<PostUserPropResponse | ErrorResponse | undefined>;
    // gis
    getTrailLayerBuffer(
        params: GetTrailLayerBufferParams
    ): Promise<GetTrailLayerBufferResponse[] | ErrorResponse | undefined>;
    getTrailLayerIntersects(
        params: GetTrailLayerIntersectsParams
    ): Promise<GetTrailLayerIntersectsResponse | ErrorResponse | undefined>;
}

export const NewTmsKnpInterface = (): TmsKnpApi => {
    return new TmsKnpHttp();
};
