/**
 * tms-knp 통신 데이터 인터페이스 정의 파일
 * @file src/services/api/tmsKnp/TmsKnpInterface.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-11-10, 최초 작성
 */

/*******************************************************************************
 * common interface
 *******************************************************************************/
interface AuthResponse {
    code: number;
    message: string;
    responseTime: string;
}

export interface ErrorResponse {
    code: number;
    message: string;
    responseTime: string;
    response: undefined;
}

/*******************************************************************************
 * login
 *******************************************************************************/
/**
 * checkLogin API interface
 */
export interface CheckLoginResult {
    gid: string;
    uid: string;
    user_account: string;
    user_name: string;
    mobile_num?: string;
}

export interface CheckLoginResponse extends AuthResponse {
    response: CheckLoginResult;
}
