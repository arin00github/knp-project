// 권한 코드 (auth_code)
export const AUTH_SYSADMIN = "SYSADMIN"; // 시스템 관리자
export const AUTH_NPKADMIN = "NPKADMIN"; // 사무소 관리자
export const AUTH_GENERAL = "GENERAL"; // 일반 사용자
export type AUTH_CODE = typeof AUTH_SYSADMIN | typeof AUTH_NPKADMIN | typeof AUTH_GENERAL | "";
