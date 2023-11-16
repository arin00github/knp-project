export const WMS_LAYER_ID = "wmsLayer";
export const LAYERS = {
    PARK_BOUNDARY_LAYER: "innodep:layer_npk_bndr",
    PARK_OFFICE_BOUNDARY_LAYER: "innodep:layer_npo_bndr",
    PARK_MAIN_OFFICE_LAYER: "innodep:layer_npo_main_pt",
    PARK_BRANCH_OFFICE_LAYER: "innodep:layer_npo_branch_pt",
    FALL_ROCK_SENSOR_LAYER: "innodep:layer_fall_rock_sensor_pt",
    VRTE_LK_LAYER: "innodep:layer_vrte_lk",
    CAMP_SITE_LAYER: "innodep:layer_cmpg_pt",
    HELIPORT_LAYER: "innodep:layer_heliport_pt",
    SHELTER_LAYER: "innodep:layer_shlt_pt",
    RTU_RAINFALL_LAYER: "innodep:layer_rtu_rainfall_pt",
    SAFETY_MAP_WILDFIRE_HISTORY_LAYER: "innodep:A2SM_FRFIRESTTUS",
    SAFETY_MAP_LANDSLIDE_HISTORY_LAYER: "innodep:A2SM_LNDSLD",
    SAFETY_MAP_LANDSLIDE_RISK_LAYER: "innodep:A2SM_SANSATAI",
};
export const DEFAULT_LAYERS = [
    LAYERS.PARK_BOUNDARY_LAYER,
    LAYERS.PARK_OFFICE_BOUNDARY_LAYER,
    LAYERS.VRTE_LK_LAYER,
    LAYERS.PARK_MAIN_OFFICE_LAYER,
    LAYERS.PARK_BRANCH_OFFICE_LAYER,
];
export const DISALLOWED_LAYERS = [
    LAYERS.PARK_BOUNDARY_LAYER,
    LAYERS.PARK_OFFICE_BOUNDARY_LAYER,
    LAYERS.CAMP_SITE_LAYER,
    LAYERS.HELIPORT_LAYER,
    LAYERS.SHELTER_LAYER,
];
export const SAFETY_MAPS = [
    LAYERS.SAFETY_MAP_WILDFIRE_HISTORY_LAYER,
    LAYERS.SAFETY_MAP_LANDSLIDE_HISTORY_LAYER,
    LAYERS.SAFETY_MAP_LANDSLIDE_RISK_LAYER,
];
export const SEARCH_RADIUS_DISALLOWED_LAYERS = [
    LAYERS.PARK_BOUNDARY_LAYER,
    LAYERS.PARK_OFFICE_BOUNDARY_LAYER,
    LAYERS.VRTE_LK_LAYER,
];
export const REFRESH_MAPS = [
    { layerId: LAYERS.RTU_RAINFALL_LAYER, refreshTime: 600000 },
    { layerId: LAYERS.FALL_ROCK_SENSOR_LAYER, refreshTime: 3600000 },
];

export const MAP_CONFIG = {
    position_x: "127.63714707549007", // x 좌표
    position_y: "35.30955130854542", // y 좌표
    position_z: "11500", // z 좌표
    camera_heading: "0", // 수평방향 회전각도
    camera_tilt: "-40", // 수직방향 회전각도
    camera_roll: "0", // 카메라자체 회전각도
};
