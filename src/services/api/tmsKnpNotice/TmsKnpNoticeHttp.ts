import { downloadFile, downloadFileWithBase64FileName } from "../../utils";
import { executeRequest, HTTP_REQUEST_TIMEOUT } from "../HttpService";

import { TmsKnpNoticeApi } from "./TmsKnpNoticeApi";
import {
    RefuseSituationNoticeEndParams,
    RefuseSituationNoticeEndResponse,
    RequestApprovalSituationNoticeEndParams,
    RequestApprovalSituationNoticeEndResponse,
    ApproveSituationNoticeModifyParams,
    ApproveSituationNoticeModifyResponse,
    DeleteSituationNoticeParams,
    DeleteSituationNoticeResponse,
    DeleteSituationResponseParams,
    DeleteSituationResponseResponse,
    DownloadSituationNoticeFileParams,
    ErrorResponse,
    ExportSituationNoticeParams,
    ExportSituationResponseParams,
    GetSituationNoticeParams,
    GetSituationNoticeResponse,
    GetSituationNoticeSummaryParams,
    GetSituationNoticeSummaryResponse,
    GetSituationResponseParams,
    GetSituationResponseResponse,
    PostSituationNoticeResponse,
    PostSituationResponseResponse,
    GetBroadcastParams,
    GetBroadcastResponse,
    DeleteBroadcastParams,
    DeleteBroadcastResponse,
    ExportBroadcastsParams,
    GetSituationStatisticResponse,
    GetSituationStatisticParams,
    GetTravelRoadStatisticResponse,
    DownloadSituationNoticeHwpFileParams,
    GetSituationNoticeImagePreviewParams,
    GetSituationNoticeImagePreviewResponse,
} from "./TmsKnpNoticeInterface";

export class TmsKnpNoticeHttp implements TmsKnpNoticeApi {
    private baseUrl = "/tms-knp-notice/api/v1";

    /*******************************************************************************
     * Broadcast Record (방송이력)
     *******************************************************************************/
    /**
     * @name getBroadcast
     * @async
     * @function
     * @description 방송 이력 조회
     * @param {GetBroadcastParams} params 요청 파라미터
     * @param {string} [params.situation_level1] 재난코드
     * @param {string} [params.situation_national_park] 국립공원명
     * @param {string} [params.start_time] 검색 시작 시간(Unixtime)
     * @param {string} [params.end_time] 검색 끝 시간(Unixtime)
     * @return {GetBroadcastResponse | ErrorResponse | undefined}
     */
    public async getBroadcast(params: GetBroadcastParams): Promise<GetBroadcastResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/broadcast/record`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetBroadcastResponse;
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
     * @name deleteBroadcast
     * @async
     * @function
     * @description 방송 이력 삭제
     * @param {DeleteBroadcastParams} params 요청 파라미터
     * @param {string[]} params.broadcast_uuid_list 삭제할 대응 SOP 고유 아이디
     * @return {GetBroadcastResponse | ErrorResponse | undefined}
     */
    public async deleteBroadcast(
        params: DeleteBroadcastParams
    ): Promise<DeleteBroadcastResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/broadcast/delete`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteBroadcastResponse;
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
     * @name exportBroadcasts
     * @async
     * @function
     * @description 방송 이력 엑셀 다운로드 요청
     * @param {ExportBroadcastsParams} params 요청 파라미터
     * @param {string} [params.situation_level1] 재난코드
     * @param {string} [params.situation_national_park] 국립공원명
     * @param {string} [params.start_time] 검색 시작 시간(Unixtime)
     * @param {string} [params.end_time] 검색 끝 시간(Unixtime)
     * @return void
     */
    public async exportBroadcasts(params: ExportBroadcastsParams) {
        const response = await executeRequest(`${this.baseUrl}/broadcast/recordexcel`, {
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
     * Notify Service Common (상황전파 or 대응 SOP 파일 다운로드 요청)
     *******************************************************************************/
    /**
     * @name downloadSituationNoticeFile
     * @async
     * @function
     * @description 상황 전파 or 대응 SOP 파일 다운로드 요청
     * @param {DownloadSituationNoticeFileParams} params 요청 파라미터
     * @param {string} params.situation_file_uuid 상황전파 목록에 있는 다운로드 파일 고유 아이디
     * @param {boolean} execDownload 다운로드 실행 여부
     * @return {File | ErrorResponse | undefined}
     */
    public async downloadSituationNoticeFile(
        params: DownloadSituationNoticeFileParams,
        execDownload?: boolean
    ): Promise<File | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/noticecommon/noticefiledownload`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
            responseType: "blob",
        });
        if (response && response.status == 200) {
            if (execDownload) {
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
     * @name downloadSituationNoticeHwpFile
     * @async
     * @function
     * @description 상황 전파 목록 파일 다운로드
     * @param {DownloadSituationNoticeHwpFileParams} params 요청 파라미터
     * @param {string} params.situation_last_uuid 상황전파 목록에 있는 마지막 상황 고유아이디
     */
    public async downloadSituationNoticeHwpFile(params: DownloadSituationNoticeHwpFileParams) {
        const response = await executeRequest(`${this.baseUrl}/noticecommon/file-download`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
            responseType: "blob",
        });
        if (response && response.status == 200) {
            downloadFileWithBase64FileName(response);
        }
    }

    /**
     * @name getSituationNoticeImagePreview
     * @async
     * @function
     * @description 상황 전파 목록 이미지 미리보기
     * @param {GetSituationNoticeImagePreviewParams} params 요청 파라미터
     * @param {string} params.situation_last_uuid 상황전파 목록에 있는 마지막 상황 고유아이디
     * @return {PostSituationNoticeResponse | ErrorResponse | undefined}
     */
    public async getSituationNoticeImagePreview(
        params: GetSituationNoticeImagePreviewParams
    ): Promise<GetSituationNoticeImagePreviewResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/noticecommon/image-preview`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSituationNoticeImagePreviewResponse;
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
     * Situation Notice (상황전파등록)
     *******************************************************************************/
    /**
     * @name postSituationNotice
     * @async
     * @function
     * @description 상황 전파 등록
     * @param {FormData} params 요청 파라미터
     * @param {string} params.situation_uuid 상황전파 고유 아이디. 값이 없으면 등록, 있으면 편집
     * @param {string} params.situation_user_name 유저명
     * @param {string} params.situation_place_name 장소명
     * @param {object} params.situation_location 위,경도
     * @param {string} params.situation_time 발생 시간(UNIX TIME)
     * @param {string} params.situation_national_park 국립공원명
     * @param {string} params.situation_name 이벤트명
     * @param {string} params.situation_level1 재난레벨1
     * @param {string} params.situation_level2 재난레벨2
     * @param {string} [params.situation_level3] 재난레벨3
     * @param {object} params.situation_message 재난 메시지
     * @param {object} params.situation_message.casualties 재난 메시지 level1 산불or재난 인 경우, 인명피해
     * @param {string} params.situation_message.casualties.dead 사망
     * @param {string} params.situation_message.casualties.injury 부상
     * @param {object} params.situation_message.property_loss 재난 메시지 level1 산불or재난 인 경우, 재산피해
     * @param {string} params.situation_message.property_loss.amount_money 금액
     * @param {string} params.situation_message.property_loss.area 면적
     * @param {string} params.situation_message.message 재난 메시지 level1 안전사고인 경우 피해상황
     * @param {object} params.situation_travel_road_control 탐방로 통제 정보
     * @param {boolean} params.situation_use_sms SMS 사용여부
     * @param {object} [params.situation_send_sms_user] SMS 유저 uuid 목록
     * @param {string} [params.situation_send_sms_message] SMS 전송 메시지
     * @param {boolean} params.situation_use_broadcast 방송 여부
     * @param {string} [params.situation_update_time] 내용 수정 시간(UNIX TIME)
     * @param {File} params.image 이미지 파일 바이너리(중복 가능)
     * @param {File} params.hwp hwp 파일 바이너리(중복 가능)
     * @return {PostSituationNoticeResponse | ErrorResponse | undefined}
     */
    public async postSituationNotice(
        params: FormData
    ): Promise<PostSituationNoticeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/register`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostSituationNoticeResponse;
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
     * Situation Notice Record (상황전파이력)
     *******************************************************************************/
    /**
     * @name getSituationNotice
     * @async
     * @function
     * @description 상황 전파 이력 요청
     * @param {GetSituationNoticeParams} params 요청 파라미터
     * @param {string} [params.situation_step] 재난 구분
     * @param {string} [params.situation_level1] 재난 상황
     * @param {string} [params.start_time] 검색 시작 시간(Unixtime)
     * @param {string} [params.end_time] 검색 끝 시간(Unixtime)
     * @return {GetSituationNoticeResponse | ErrorResponse | undefined}
     */
    public async getSituationNotice(
        params: GetSituationNoticeParams
    ): Promise<GetSituationNoticeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/record-new`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSituationNoticeResponse;
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
     * @name deleteSituationNotice
     * @async
     * @function
     * @description 상황 전파 이력 삭제
     * @param {DeleteSituationNoticeParams} params 요청 파라미터
     * @param {string[]} params.situation_uuid_list 삭제할 상황전파 고유 아이디
     * @return {DeleteSituationNoticeResponse | ErrorResponse | undefined}
     */
    public async deleteSituationNotice(
        params: DeleteSituationNoticeParams
    ): Promise<DeleteSituationNoticeResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/delete`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteSituationNoticeResponse;
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
     * @name approveSituationNoticeEnd
     * @async
     * @function
     * @description 상황 전파 상황 종료 요청 승인
     * @param {RefuseSituationNoticeEndParams} params 요청 파라미터
     * @param {string} params.situation_uuid 상황 종료 승인할 상황전파 고유 아이디
     * @return {RefuseSituationNoticeEndResponse | ErrorResponse | undefined}
     */
    public async approveSituationNoticeEnd(
        params: RefuseSituationNoticeEndParams
    ): Promise<RefuseSituationNoticeEndResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/endapproval`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as RefuseSituationNoticeEndResponse;
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
     * @name refuseSituationNoticeEnd
     * @async
     * @function
     * @description 상황 전파 상황 종료 요청 거절
     * @param {RefuseSituationNoticeEndParams} params 요청 파라미터
     * @param {string} params.situation_uuid 상황 종료 거절할 상황전파 고유 아이디
     * @return {RefuseSituationNoticeEndResponse | ErrorResponse | undefined}
     */
    public async refuseSituationNoticeEnd(
        params: RefuseSituationNoticeEndParams
    ): Promise<RefuseSituationNoticeEndResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/endrefuseapproval`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as RefuseSituationNoticeEndResponse;
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
     * @name approveSituationNoticeModify
     * @async
     * @function
     * @description 상황 전파 상황 편집 승인
     * @param {ApproveSituationNoticeModifyParams} params 요청 파라미터
     * @param {string} params.situation_uuid 편집 승인할 상황전파 고유 아이디
     * @return {ApproveSituationNoticeModifyResponse | ErrorResponse | undefined}
     */
    public async approveSituationNoticeModify(
        params: ApproveSituationNoticeModifyParams
    ): Promise<ApproveSituationNoticeModifyResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/modifyapproval`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as ApproveSituationNoticeModifyResponse;
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
     * @name exportSituationNotice
     * @async
     * @function
     * @description 상황 전파 이력 엑셀 다운로드 요청
     * @param {ExportSituationNoticeParams} params 요청 파라미터
     * @param {string} [params.situation_step] 재난 구분
     * @param {string} [params.situation_level1] 재난 상황
     * @param {string} [params.start_time] 검색 시작 시간(Unixtime)
     * @param {string} [params.end_time] 검색 끝 시간(Unixtime)
     * @return void
     */
    public async exportSituationNotice(params: ExportSituationNoticeParams) {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/recordexcel`, {
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
     * @name getSituationNoticeSummary
     * @async
     * @function
     * @param {GetSituationNoticeSummaryParams} params 요청 파라미터
     * @param {boolean} [params.is_allsummary] 전체 or 공원별 데이터 요청 (true: 전체, false: 접속한 유저 그룹)
     * @description 상황별 수량 및 진행, 종료된 상황 정보
     * @return {GetSituationNoticeSummaryResponse | ErrorResponse | undefined}
     */
    public async getSituationNoticeSummary(
        params: GetSituationNoticeSummaryParams
    ): Promise<GetSituationNoticeSummaryResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/summary`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSituationNoticeSummaryResponse;
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
     * @name getSituationStatistic
     * @async
     * @function
     * @description 년, 월, 주 단위 통계 정보
     * @param {GetSituationStatisticParams} params 요청 파라미터
     * @return {GetSituationStatisticResponse | ErrorResponse | undefined}
     */
    public async getSituationStatistic(
        params: GetSituationStatisticParams
    ): Promise<GetSituationStatisticResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/statistic`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSituationStatisticResponse;
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
     * @name getTravelRoadStatistic
     * @async
     * @function
     * @description 탐방로 통제 통계 정보
     * @param {GetSituationStatisticParams} params 요청 파라미터
     * @return {GetTravelRoadStatisticResponse | ErrorResponse | undefined}
     */
    public async getTravelRoadStatistic(
        params: GetSituationStatisticParams
    ): Promise<GetTravelRoadStatisticResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/travelroadstatistic`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetTravelRoadStatisticResponse;
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
     * Situation Notice Record -> Response SOP (대응 SOP)
     *******************************************************************************/
    /**
     * @name getSituationResponse
     * @async
     * @function
     * @description 대응 SOP 이력 요청
     * @param {GetSituationResponseParams} params 요청 파라미터
     * @param {string} params.situation_uuid 상황전파 고유 아이디
     * @return {GetSituationResponseResponse | ErrorResponse | undefined}
     */
    public async getSituationResponse(
        params: GetSituationResponseParams
    ): Promise<GetSituationResponseResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/responsesop/record`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as GetSituationResponseResponse;
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
     * @name postSituationResponse
     * @async
     * @function
     * @description 대응 SOP 등록
     * @param {FormData} params 요청 파라미터
     * @param {string} params.situation_uuid 상황전파 고유 아이디. 값이 없으면 등록, 있으면 편집
     * @param {string} params.situation_parent_uuid 상위 상황전파 고유 아이디
     * @param {string} params.situation_user_name 유저명
     * @param {string} params.situation_place_name 장소명
     * @param {object} params.situation_location 위,경도
     * @param {string} [params.situation_time] 발생 시간(UNIX TIME)
     * @param {string} params.situation_national_park 국립공원명
     * @param {string} params.situation_name 이벤트명
     * @param {string} params.situation_level1 재난레벨1
     * @param {string} params.situation_level2 재난레벨2
     * @param {string} [params.situation_level3] 재난레벨3
     * @param {object} params.situation_message 재난 메시지
     * @param {object} params.situation_message.casualties 재난 메시지 level1 산불or재난 인 경우, 인명피해
     * @param {string} params.situation_message.casualties.dead 사망
     * @param {string} params.situation_message.casualties.injury 부상
     * @param {object} params.situation_message.property_loss 재난 메시지 level1 산불or재난 인 경우, 재산피해
     * @param {string} params.situation_message.property_loss.amount_money 금액
     * @param {string} params.situation_message.property_loss.area 면적
     * @param {string} params.situation_message.message 재난 메시지 level1 안전사고인 경우 피해상황
     * @param {object} params.situation_travel_road_control 탐방로 통제 정보
     * @param {boolean} params.situation_use_sms SMS 사용여부
     * @param {object} [params.situation_send_sms_user] SMS 유저 uuid 목록
     * @param {string} [params.situation_send_sms_message] SMS 전송 메시지
     * @param {boolean} params.situation_use_broadcast 방송 여부
     * @param {string} [params.situation_update_time] 내용 수정 시간(UNIX TIME)
     * @param {File} [params.image] 이미지 파일 바이너리(중복 가능)
     * @param {File} [params.hwp] hwp 파일 바이너리(중복 가능)
     * @return {PostSituationResponseResponse | ErrorResponse | undefined}
     */
    public async postSituationResponse(
        params: FormData
    ): Promise<PostSituationResponseResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/responsesop/register`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as PostSituationResponseResponse;
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
     * @name deleteSituationResponse
     * @async
     * @function
     * @description 대응 SOP 삭제
     * @param {DeleteSituationResponseParams} params 요청 파라미터
     * @param {string[]} params.situation_uuid_list 삭제할 대응 SOP 고유 아이디
     * @return {DeleteSituationResponseResponse | ErrorResponse | undefined}
     */
    public async deleteSituationResponse(
        params: DeleteSituationResponseParams
    ): Promise<DeleteSituationResponseResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/responsesop/delete`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as DeleteSituationResponseResponse;
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
     * @name requestApprovalSituationNoticeEnd
     * @async
     * @function
     * @description 상황 종료 요청
     * @param {RequestApprovalSituationNoticeEndParams} params 요청 파라미터
     * @param {string} params.situation_uuid 상황 종료 요청 할 상황전파 고유 아이디
     * @return {RequestApprovalSituationNoticeEndResponse | ErrorResponse | undefined}
     */
    public async requestApprovalSituationNoticeEnd(
        params: RequestApprovalSituationNoticeEndParams
    ): Promise<RequestApprovalSituationNoticeEndResponse | ErrorResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/responsesop/reqsituationend`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as RequestApprovalSituationNoticeEndResponse;
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
     * @name exportSituationResponse
     * @async
     * @function
     * @description 대응 SOP 목록 엑셀 다운로드 요청
     * @param {ExportSituationResponseParams} params 요청 파라미터
     * @param {string} params.parent_situation_uuid 상황 전파 고유 아이디
     * @return void
     */
    public async exportSituationResponse(params: ExportSituationResponseParams) {
        const response = await executeRequest(`${this.baseUrl}/situationnotice/responsesop/recordexcel`, {
            method: "POST",
            data: params,
            timeout: HTTP_REQUEST_TIMEOUT,
            responseType: "blob",
        });
        if (response && response.status == 200) {
            downloadFile(response);
        }
    }
}
