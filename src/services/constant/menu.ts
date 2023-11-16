// 메뉴 코드 (menu_code)
// 대시보드
export const MENU_DASHBOARD = "DASHBOARD";
export const MENU_SPECIAL_STATUS = "SPECIAL_STATUS";
export const MENU_SITU_STATUS = "SITU_STATUS";
// 3D GIS
export const MENU_3DGIS = "3DGIS";
// 상황전파
export const MENU_SITU_NOTION = "SITU_NOTION";
// 상황관리
export const MENU_SITU_REPORT = "SITU_REPORT";
export const MENU_SITU_NOTION_HIST = "SITU_NOTION_HIST";
export const MENU_BROAD_HIST = "BROAD_HIST";
// 정기보고 관리
export const MENU_REGULRA_MGT = "REGULRA_MGT";
// 메뉴얼 관리
export const MENU_MANUAL_MGT = "MANUAL_MGT";
// 국립공원 자산관리
export const MENU_NPK_ASSET = "NPK_ASSET";
export const MENU_NPK_MGT = "NPK_MGT";
export const MENU_ASSET_MGT = "ASSET_MGT";
export const MENU_RESR_REPORT = "RESR_REPORT";
// 설정
export const MENU_SETUP = "SETUP";
export const MENU_AUTH_MGT = "AUTH_MGT";
export const MENU_GROUP_MGT = "GROUP_MGT";
export const MENU_USER_MGT = "USER_MGT";
export const MENU_SYS_SETUP = "SYS_SETUP";
export const MENU_ASSET_G_MGT = "ASSET_G_MGT";
export const MENU_COMM_CODE = "COMM_CODE";
export const MENU_USER_ACCESS_HIST = "USER_ACCESS_HIST";

export type MENU_CODE =
    | typeof MENU_DASHBOARD
    | typeof MENU_SPECIAL_STATUS
    | typeof MENU_SITU_STATUS
    | typeof MENU_3DGIS
    | typeof MENU_SITU_NOTION
    | typeof MENU_SITU_REPORT
    | typeof MENU_SITU_NOTION_HIST
    | typeof MENU_BROAD_HIST
    | typeof MENU_REGULRA_MGT
    | typeof MENU_MANUAL_MGT
    | typeof MENU_NPK_ASSET
    | typeof MENU_NPK_MGT
    | typeof MENU_ASSET_MGT
    | typeof MENU_RESR_REPORT
    | typeof MENU_SETUP
    | typeof MENU_AUTH_MGT
    | typeof MENU_GROUP_MGT
    | typeof MENU_USER_MGT
    | typeof MENU_SYS_SETUP
    | typeof MENU_COMM_CODE
    | typeof MENU_USER_ACCESS_HIST
    | typeof MENU_ASSET_G_MGT;
