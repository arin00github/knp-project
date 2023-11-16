/*******************************************************************************
 * code
 *******************************************************************************/

import { ErrorResponse, TmsKnpResponse } from "../HttpService";

/**
 * get code 코드 정보 API interface
 */
export interface GetCodeInfoParams {
    p_code?: string;
    p_codes?: string[];
}

export interface GetCodeInfoResult {
    p_code: string;
    code: string;
    code_name: string;
}

export interface GetCodeInfoResponse extends TmsKnpResponse {
    response: {
        results: GetCodeInfoResult[];
        total_count: number;
    };
}

export interface CodeApiInterface {
    getCodeInfo(params: { p_code: string }): Promise<GetCodeInfoResponse | ErrorResponse | undefined>;
}
