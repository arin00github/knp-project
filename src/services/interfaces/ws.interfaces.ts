import { GetSituationNoticeResult, GetSituationResponseResult } from "../api/tmsKnpNotice/TmsKnpNoticeInterface";

import { DS_STEP, DSAS_STEP, SITU_LEVEL } from "./disaster.interfaces";

export const MSG_DISASTER_REG = "regsituation"; // 상황 전파 발생
export const MSG_DISASTER_MODIFY = "modsituation"; // 상황 수정
export const MSG_DISASTER_DELETE = "delsituation"; // 상황 삭제
export const MSG_RESPONSE_REG = "regresponsesop"; // 대응 SOP 등록
export const MES_RESPONSE_MODIFY = "modresponsesop"; // 대응 SOP 수정
export const MES_RESPONSE_DELETE = "delresponsesop"; // 대응 SOP 삭제
export const MSG_END_REQ = "reqendsituation"; // 상황 종료 요청
export const MSG_END_APPROVE = "reqendsituationapploval"; // 상황 종료 요청 승인
export const MSG_END_REFUSE = "endsituationrefuseapproval"; // 상황 종료 요청 거절
export const MSG_EDIT = "reqmodapploval"; // 편집 승인

// 상황 전파 발생
export interface WsMessageDisasterReg {
    cmd: typeof MSG_DISASTER_REG;
    body: GetSituationNoticeResult;
}

// 상황 수정
export interface WsMessageDisasterModify {
    cmd: typeof MSG_DISASTER_MODIFY;
    body: GetSituationNoticeResult;
}

// 상황 삭제
export interface WsMessageDisasterDelete {
    cmd: typeof MSG_DISASTER_DELETE;
    body: {
        situation_uuid_list: string[];
    };
}

// 대응 SOP 등록
export interface WsMessageResponseReg {
    cmd: typeof MSG_RESPONSE_REG;
    body: GetSituationResponseResult;
}

// 대응 SOP 수정
export interface WsMessageResponseModify {
    cmd: typeof MES_RESPONSE_MODIFY;
    body: GetSituationResponseResult;
}

// 대응 SOP 삭제
export interface WsMessageResponseDelete {
    cmd: typeof MES_RESPONSE_DELETE;
    body: {
        situation_uuid_list: string[];
    };
}

// 상황 종료 요청
export interface WsMessageEndRequest {
    cmd: typeof MSG_END_REQ;
    body: {
        situation_uuid: string;
        situation_step: DS_STEP;
        situation_level1: SITU_LEVEL;
        situation_name: string;
        situation_national_park: string;
    };
}

// 상황 종료 요청 승인
export interface WsMessageEndApprove {
    cmd: typeof MSG_END_APPROVE;
    body: {
        situation_uuid: string;
        situation_step: DS_STEP;
        situation_level1: SITU_LEVEL;
        situation_approval_step: DSAS_STEP;
        situation_name: string;
        situation_national_park: string;
    };
}

// 상황 종료 요청 거절
export interface WsMessageEndRefuse {
    cmd: typeof MSG_END_REFUSE;
    body: {
        situation_uuid: string;
        situation_step: DS_STEP;
        situation_level1: SITU_LEVEL;
        situation_approval_step: DSAS_STEP;
        situation_name: string;
        situation_national_park: string;
    };
}

// 편집 승인
export interface WsMessageEdit {
    cmd: typeof MSG_EDIT;
    body: {
        situation_uuid: string;
        situation_step: DS_STEP;
        situation_level1: SITU_LEVEL;
        situation_approval_step: DSAS_STEP;
        situation_name: string;
        situation_national_park: string;
    };
}
