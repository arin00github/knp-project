/**
 * 프로젝트 공용 HTTP 함수 정의
 * @file src/services/api/http-service.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-27, 최초 작성
 */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const HTTP_REQUEST_TIMEOUT = 15000;

export const HTTP_REQEST = {
    method: "POST",
    timeout: HTTP_REQUEST_TIMEOUT,
};

/**
 * @name buildParams
 * @function
 * @description parameter "," 단위로 변경하여 반환 하는 함수
 * @return {string}
 */
export const buildParams = (params: string[]): string => {
    return params.reduce((acc, item) => {
        return acc.length == 0 ? item : acc + "," + item;
    }, "");
};

/**
 * @name executeRequest
 * @async
 * @function
 * @description REST API 요청 실행 함수
 * @return {Promise<AxiosResponse | null>}
 */
export const executeRequest = async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse | null> => {
    try {
        return await axios(path, config);
    } catch (err) {
        const anyResult = err as AxiosError;
        if (anyResult && anyResult.response) {
            return anyResult.response;
        }
    }
    return null;
};

export interface TmsKnpResponse {
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
