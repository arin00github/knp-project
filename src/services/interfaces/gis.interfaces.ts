import { GetTrailLayerBufferResult } from "../api/tmsKnp/TmsKnpInterface";

// 자산 geometry 타입 구분
export const GEOMETRY_POINT = "POINT"; // 발생
export const GEOMETRY_MULTI_LINE_STRING = "MULTILINESTRING"; // 진행
export type GEOMETRY_TYPE = typeof GEOMETRY_POINT | typeof GEOMETRY_MULTI_LINE_STRING;

/**
 * 팝업 open 관련 필요 정보 정의 interface
 */
export interface AssetPopupInfo {
    searchTrail?: boolean;
    x: number;
    y: number;
    features: FeatureType[] | GetTrailLayerBufferResult[];
}

/**
 * gis 기본 feature type 정의 interface
 */
export interface FeatureType {
    bbox: number[];
    geometry: {
        type: string;
        coordinates: number[];
    };
    geometry_name: string;
    id: string;
    properties:
        | CommonLayerProperties
        | CctvLayerProperties
        | OfficeLayerProperties
        | AwsLayerProperties
        | VrteLayerProperties
        | ShelterLayerProperties
        | CampSiteLayerProperties
        | RockFallSensorLayerProperties
        | RainFallLayerProperties
        | WaterLevelLayerProperties
        | WarningLayerProperties;
    type: string;
}

/**
 * 급경사지, 안전쉼터, 헬리포트 등 공통 레이어 properties interface
 * [급경사지, 안전쉼터, 헬리포트, 구급함, 추락위험, 재해문자전광판, 자동우량, 자동심장충격기]
 */
export interface CommonLayerProperties {
    [index: string]: string | number | null;
    asset_group: string;
    asset_kind: string;
    asset_nm: string;
    asset_type_cd: string;
    id: number;
    npk_cd: string;
    npo_cd: string;
    reg_date: string;
    upd_date: string | null;
}

/**
 * CCTV 레이어 properties interface
 */
export interface CctvLayerProperties {
    address: string;
    asset_nm: string;
    asset_type_cd: string;
    cctv_model: string;
    cctv_status_cd: string;
    cctv_type_cd: string;
    cctv_uri: string;
    id: number;
    mng_no: string;
    npk_cd: string;
    npo_cd: string;
    reg_date: string;
    upd_date: string | null;
}

/**
 * 사무소&분소 레이어 properties interface
 */
export interface OfficeLayerProperties {
    alt: number;
    asset_nm: string;
    asset_type_cd: string;
    code_cls_n: string;
    crt_ymd: string;
    ctg_cd: string;
    dept_seq: string | null;
    eng_nm: string;
    kor_nm: string;
    lat: number;
    lon: number;
    lno_addr: string;
    manager_name: string | null;
    manager_number: string | null;
    mng_no: string;
    npk_cd: string;
    npo_cd: string;
    rnm_addr: string;
    sno: number;
    symb_cd: string;
    telno: string;
    reg_date: string;
    upd_date: string | null;
    use_yn: string;
    vrte_open: number;
    vrte_open_part: number;
    vrte_close: number;
}

/**
 * AWS측정소 레이어 properties interface (TODO: 스키마 변경 예정)
 */
export interface AwsLayerProperties {
    asset_group: string;
    asset_kind: string;
    asset_nm: string;
    asset_type_cd: string;
    local_code: string;
    id: number;
    npk_cd: string;
    npo_cd: string;
    installation: string;
    eqp_changed: string;
    maintenance: string;
    maker: string;
    reg_date: string;
    upd_date: string | null;
}

/**
 * 낙석계측기 레이어 properties interface
 */
export interface RockFallSensorLayerProperties {
    asset_nm: string;
    asset_type_cd: string;
    install_date: string;
    lno_addr: string;
    mng_no: string;
    npk_cd: string;
    npo_cd: string;
    reg_date: string;
    upd_date: string | null;
}

/**
 * 수위국 레이어 properties interface
 */
export interface RainFallLayerProperties {
    asset_nm: string;
    asset_type_cd: string;
    eqp_changed: string;
    installation: string;
    npk_cd: string;
    npo_cd: string;
    rtu_id: number;
    sys_id: number;
    sstation: string;
    reg_date: string;
    upd_date: string | null;
}

/**
 * 경보국 레이어 properties interface
 */
export interface WarningLayerProperties {
    asset_nm: string;
    asset_type_cd: string;
    eqp_changed: string;
    installation: string;
    npk_cd: string;
    npo_cd: string;
    reg_date: string;
    rtu_id: number;
    sstation: string;
    sys_id: number;
    upd_date: string;
}

/**
 * 우량국 레이어 properties interface
 */
export interface WaterLevelLayerProperties {
    asset_nm: string;
    asset_type_cd: string;
    critical_lv1: number;
    critical_lv2: number;
    critical_lv3: number;
    eqp_changed: string;
    installation: string;
    npk_cd: string;
    npo_cd: string;
    reg_date: string;
    rtu_id: number;
    sys_id: number;
    sstation: string;
    status: number;
    upd_date: string | null;
}

/**
 * 탐방로 레이어 properties interface
 */
export interface VrteLayerProperties {
    asset_nm: string;
    asset_type_cd: string;
    avg_hdop: number;
    avg_pdop: number;
    avg_vdop: number;
    cos_schdcd: string;
    crt_ymd: string;
    ctg_cd: string;
    dtl_sect: string | null;
    gis_asrcp: number;
    gis_lt: number;
    lk_bnd_nid: string;
    lk_nnd_nid: string;
    mng_no: string;
    mpscos1_id: string | null;
    mpscos2_id: string | null;
    mpscos3_id: string | null;
    mpsct_yn: string;
    npk_cd: string;
    npo_cd: string | null;
    reg_date: string;
    rgsct_desc: string;
    sens_3g: string;
    sno: number;
    tdf_min: number;
    tdr_min: number;
    upd_date: string | null;
    use_yn: string;
    vrcos_enm: string;
    vrcos_id: string;
    vrcos_knm: string;
    vrte_lod: string | null;
    vrte_rglyn: string;
}

/**
 * 대피소 레이어 properties interface
 */
export interface ShelterLayerProperties {
    acmd_nop: number;
    alt: number;
    asset_nm: string;
    asset_type_cd: string;
    crt_ymd: string;
    ctg_cd: string;
    eng_nm: string;
    kor_nm: string;
    lat: number;
    lno_addr: string;
    lon: number;
    mng_no: string;
    npk_cd: string;
    npo_cd: string;
    reg_date: string;
    rnm_addr: string;
    rsvt_mth: string;
    sno: number;
    symb_cd: string;
    telno: string;
    upd_date: string | null;
    use_yn: string;
}

/**
 * 야영장 레이어 properties interface
 */
export interface CampSiteLayerProperties {
    alt: number;
    asset_nm: string;
    asset_type_cd: string;
    cmp_bqy: number;
    cmpf_levyn: string | null;
    crt_ymd: string;
    ctg_cd: string;
    eng_nm: string;
    kor_nm: string;
    lat: number;
    lno_addr: string;
    lon: number;
    mng_no: string;
    npk_cd: string;
    npo_cd: string;
    reg_date: string;
    rnm_addr: string;
    sno: number;
    symb_cd: string;
    telno: string;
    upd_date: string | null;
    use_yn: string;
}
