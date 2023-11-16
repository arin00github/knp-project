// 정기보고 상태 (periodic_state)
export const PERIODIC_STATE_SAVE = "SAVE";
export const PERIODIC_STATE_SUBMIT = "SUBMIT";
export type PERIODIC_STATE = typeof PERIODIC_STATE_SAVE | typeof PERIODIC_STATE_SUBMIT | "";

// 정기보고 코드 (periodic_code)
export const PERIODIC_CODE_PD001 = "PD001"; // 산불일보
export const PERIODIC_CODE_PD002 = "PD002"; // 재난예경보시설 일보
export const PERIODIC_CODE_PD003 = "PD003"; // 안점점검의 날
export const PERIODIC_CODE_PD004 = "PD004"; // 안전관리 전담자 실적
export const PERIODIC_CODE_PD005 = "PD005"; // 탐방객안전교육
export const PERIODIC_CODE_PD006 = "PD006"; // 재난 취약지구 정비
export const PERIODIC_CODE_PD007 = "PD007"; // 재난 예경보 시스템 점검
export const PERIODIC_CODE_PD008 = "PD008"; // 장비 유지 관리
export const PERIODIC_CODE_PD009 = "PD009"; // 급경사지 점검
export const PERIODIC_CODE_PD010 = "PD010"; // 추락위험지구 점검
export const PERIODIC_CODE_PD011 = "PD011"; // 대피소 훈련
export type PERIODIC_CODE =
    | typeof PERIODIC_CODE_PD001
    | typeof PERIODIC_CODE_PD002
    | typeof PERIODIC_CODE_PD003
    | typeof PERIODIC_CODE_PD004
    | typeof PERIODIC_CODE_PD005
    | typeof PERIODIC_CODE_PD006
    | typeof PERIODIC_CODE_PD007
    | typeof PERIODIC_CODE_PD008
    | typeof PERIODIC_CODE_PD009
    | typeof PERIODIC_CODE_PD010
    | typeof PERIODIC_CODE_PD011;
