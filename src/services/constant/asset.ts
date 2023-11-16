// 자산 타입 (asset_type_cd)
export const ASSET_TYPE_OFFICE = "OFFICE"; // 사무소
export const ASSET_TYPE_SUBOFF = "SUBOFF"; // 분소
export const ASSET_TYPE_BNDR = "BNDR"; //경계
export const ASSET_TYPE_CCTV = "CCTV"; // CCTV
export const ASSET_TYPE_CLIMB = "CLIMB"; // 암벽장/빙벽장
export const ASSET_TYPE_AWS = "AWS"; // 자동기상관측장비
export const ASSET_TYPE_CMN = "CMN"; // 일반자산
export const ASSET_TYPE_ROCKFALL = "RCK"; // 낙석계측기자산
export const ASSET_TYPE_TRAIL = "TRL"; // 탐방로
export const ASSET_TYPE_RNF = "RNF"; // 자동우량(우량국)
export const ASSET_TYPE_WTL = "WTL"; // 자동우량(수위국)
export const ASSET_TYPE_WRN = "WRN"; // 자동우량(경보국)
export type ASSET_TYPE =
    | typeof ASSET_TYPE_OFFICE
    | typeof ASSET_TYPE_SUBOFF
    | typeof ASSET_TYPE_CCTV
    | typeof ASSET_TYPE_CLIMB
    | typeof ASSET_TYPE_AWS
    | typeof ASSET_TYPE_CMN
    | typeof ASSET_TYPE_ROCKFALL
    | typeof ASSET_TYPE_TRAIL
    | typeof ASSET_TYPE_RNF
    | typeof ASSET_TYPE_WTL
    | typeof ASSET_TYPE_WRN;

// 자산 종류 (layer_id)
export const LAYER_NPK_BNDR = "layer_npk_bndr"; // 공원경계
export const LAYER_NPO_BNDR = "layer_npo_bndr"; // 공원사무소경계
export const LAYER_NPO_MAIN = "layer_npo_main_pt"; // 공원사무소(사무소)
export const LAYER_NPO_BRANCH = "layer_npo_branch_pt"; // 공원사무소(분소)
export type LAYER_ID = typeof LAYER_NPK_BNDR | typeof LAYER_NPO_BNDR | typeof LAYER_NPO_MAIN | typeof LAYER_NPO_BRANCH;
