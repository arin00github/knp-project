import { TmsKnpNoticeHttp } from "./TmsKnpNoticeHttp";
import {
    ApproveSituationNoticeEndParams,
    ApproveSituationNoticeEndResponse,
    ApproveSituationNoticeModifyParams,
    ApproveSituationNoticeModifyResponse,
    DeleteBroadcastParams,
    DeleteBroadcastResponse,
    DeleteSituationNoticeParams,
    DeleteSituationNoticeResponse,
    DeleteSituationResponseParams,
    DeleteSituationResponseResponse,
    DownloadSituationNoticeFileParams,
    ErrorResponse,
    ExportBroadcastsParams,
    ExportSituationNoticeParams,
    ExportSituationResponseParams,
    GetBroadcastParams,
    GetBroadcastResponse,
    GetSituationNoticeParams,
    GetSituationNoticeResponse,
    GetSituationNoticeSummaryParams,
    GetSituationNoticeSummaryResponse,
    GetSituationResponseParams,
    GetSituationResponseResponse,
    GetSituationStatisticParams,
    GetSituationStatisticResponse,
    GetTravelRoadStatisticResponse,
    PostSituationNoticeResponse,
    PostSituationResponseResponse,
    RefuseSituationNoticeEndParams,
    RefuseSituationNoticeEndResponse,
    RequestApprovalSituationNoticeEndParams,
    RequestApprovalSituationNoticeEndResponse,
    DownloadSituationNoticeHwpFileParams,
    GetSituationNoticeImagePreviewParams,
    GetSituationNoticeImagePreviewResponse,
} from "./TmsKnpNoticeInterface";

export interface TmsKnpNoticeApi {
    // Broadcast Record (방송이력)
    getBroadcast(params: GetBroadcastParams): Promise<GetBroadcastResponse | ErrorResponse | undefined>;
    deleteBroadcast(params: DeleteBroadcastParams): Promise<DeleteBroadcastResponse | ErrorResponse | undefined>;
    exportBroadcasts(params: ExportBroadcastsParams): void;
    // Notify Service Common (상황전파 or 대응 SOP 파일 다운로드 요청)
    downloadSituationNoticeFile(
        params: DownloadSituationNoticeFileParams,
        execDownload?: boolean
    ): Promise<File | ErrorResponse | undefined>;
    // Situation Notice (상황전파등록)
    postSituationNotice(FormData: FormData): Promise<PostSituationNoticeResponse | ErrorResponse | undefined>;
    downloadSituationNoticeHwpFile(params: DownloadSituationNoticeHwpFileParams): void;
    getSituationNoticeImagePreview(
        params: GetSituationNoticeImagePreviewParams
    ): Promise<GetSituationNoticeImagePreviewResponse | ErrorResponse | undefined>;
    // Situation Notice Record (상황전파이력)
    getSituationNotice(
        params: GetSituationNoticeParams
    ): Promise<GetSituationNoticeResponse | ErrorResponse | undefined>;
    deleteSituationNotice(
        params: DeleteSituationNoticeParams
    ): Promise<DeleteSituationNoticeResponse | ErrorResponse | undefined>;
    approveSituationNoticeEnd(
        params: ApproveSituationNoticeEndParams
    ): Promise<ApproveSituationNoticeEndResponse | ErrorResponse | undefined>;
    refuseSituationNoticeEnd(
        params: RefuseSituationNoticeEndParams
    ): Promise<RefuseSituationNoticeEndResponse | ErrorResponse | undefined>;
    approveSituationNoticeModify(
        params: ApproveSituationNoticeModifyParams
    ): Promise<ApproveSituationNoticeModifyResponse | ErrorResponse | undefined>;
    exportSituationNotice(params: ExportSituationNoticeParams): void;
    getSituationNoticeSummary(
        params: GetSituationNoticeSummaryParams
    ): Promise<GetSituationNoticeSummaryResponse | ErrorResponse | undefined>;
    getSituationStatistic(
        params: GetSituationStatisticParams
    ): Promise<GetSituationStatisticResponse | ErrorResponse | undefined>;
    getTravelRoadStatistic(
        params: GetSituationStatisticParams
    ): Promise<GetTravelRoadStatisticResponse | ErrorResponse | undefined>;
    // Situation Notice Record -> Response SOP (대응 SOP)
    getSituationResponse(
        params: GetSituationResponseParams
    ): Promise<GetSituationResponseResponse | ErrorResponse | undefined>;
    postSituationResponse(params: FormData): Promise<PostSituationResponseResponse | ErrorResponse | undefined>;
    deleteSituationResponse(
        params: DeleteSituationResponseParams
    ): Promise<DeleteSituationResponseResponse | ErrorResponse | undefined>;
    requestApprovalSituationNoticeEnd(
        params: RequestApprovalSituationNoticeEndParams
    ): Promise<RequestApprovalSituationNoticeEndResponse | ErrorResponse | undefined>;
    exportSituationResponse(params: ExportSituationResponseParams): void;
}

export const NewTmsKnpNoticeInterface = (): TmsKnpNoticeApi => {
    return new TmsKnpNoticeHttp();
};
