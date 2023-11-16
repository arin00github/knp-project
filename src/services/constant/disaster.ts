// 재난구분 (situation_step)
export const DS_OCCUR = "DS01"; // 발생
export const DS_PROCEED = "DS02"; // 진행
export const DS_COMPLETED = "DS03"; // 상황종료
export const DS_OCCUR_AND_PROCEED = "DS04"; // 발생, 진행
export type DS_STEP = typeof DS_OCCUR | typeof DS_PROCEED | typeof DS_COMPLETED | typeof DS_OCCUR_AND_PROCEED | "";

// 재난상황 (situation_level1)
export const SITU_NATURAL_DISASTER = "ST01"; // 자연재난
export const SITU_WILD_FIRE = "ST02"; // 산불
export const SITU_SAFETY_ACCIDENT = "ST03"; // 안전사고
export type SITU_LEVEL = typeof SITU_NATURAL_DISASTER | typeof SITU_WILD_FIRE | typeof SITU_SAFETY_ACCIDENT | "";

// 상황 위치검증 (situation_send_sms_user.trail_vicinity)
export const TRAIL_VICINITY_IN = "IN"; // 탐방로에서 반경 기준 미터 내부 인 경우
export const TRAIL_VICINITY_OUT = "OUT"; // 탐방로에서 반경 기준 미터 외부 인 경우
export type TRAIL_VICINITY = typeof TRAIL_VICINITY_IN | typeof TRAIL_VICINITY_OUT | "";

// 탐방로 통제 (travelRoad_state)
export const TRAVEL_ROAD_TOTAL = "전체"; // 전체
export const TRAVEL_ROAD_OPEN = "개방"; // 개방
export const TRAVEL_ROAD_PARTIAL_OPEN = "부분"; // 부분 개방
export const TRAVEL_ROAD_CLOSE = "통제"; // 통제
export type TRAVEL_ROAD_STATE =
    | typeof TRAVEL_ROAD_TOTAL
    | typeof TRAVEL_ROAD_OPEN
    | typeof TRAVEL_ROAD_PARTIAL_OPEN
    | typeof TRAVEL_ROAD_CLOSE
    | "";

// 승인상태 (situation_approval_step)
export const DSAS_PROCEED = "DSAS01"; // 진행중
export const DSAS_END_REQ = "DSAS02"; // 종료승인요청
export const DSAS_END = "DSAS03"; // 상황종료
export const DSAS_EDIT = "DSAS04"; // 편집가능
export type DSAS_STEP = typeof DSAS_PROCEED | typeof DSAS_END_REQ | typeof DSAS_END | typeof DSAS_EDIT;

// 재난상황 (situation_level1)에 따른 색상
export const SITU_COLOR_NATURAL_DISASTER = "#17a2b8"; // 자연재난
export const SITU_COLOR_WILD_FIRE = "#dc3545"; // 산불
export const SITU_COLOR_SAFETY_ACCIDENT = "#ffc107"; // 안전사고
export type SITU_COLOR =
    | typeof SITU_COLOR_NATURAL_DISASTER
    | typeof SITU_COLOR_WILD_FIRE
    | typeof SITU_COLOR_SAFETY_ACCIDENT
    | "";
