/**
 * pages 아래에 작성된 모든 컴포넌트 내보내기 관리
 * @file src/views/pages/index.ts
 * @author Lee HyoJeong
 * @version 1.0
 * @see none
 * @history
 * - 2023-02-02, 최초 작성
 */

// 대시보드
export * from "./dashboard/DashboardSpecialStatusPage";
export * from "./dashboard/DashboardSituationStatusPage";
// 3D GIS
export * from "./gis/GisPage";
// 상황 전파
export * from "./reportDisaster/ReportDisasterPage";
// 상황 및 보고 관리
export * from "./disasterManagement/DisasterHistoryPage";
export * from "./disasterManagement/BroadcastHistoryPage";
// 정기 보고 관리
export * from "./periodicalReportManagement/PeriodicalReportManagementPage";
// 메뉴얼 관리
export * from "./manualManagement/ManualManagementPage";
// 국립공원 자산관리
export * from "./management/ParkManagementPage";
export * from "./management/AssetManagementPage";
export * from "./management/ResourceStatusPage";
// 설정
export * from "./setting/UserManagementPage";
export * from "./setting/AuthManagementPage";
export * from "./setting/CommonCodePage";
export * from "./setting/UserLogsPage";
export * from "./setting/GroupManagementPage";
export * from "./setting/SystemSettingPage";
