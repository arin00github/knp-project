import { ErrorResponse, HTTP_REQEST, executeRequest } from "../HttpService";
import { CODE_API_URL, configureUrl } from "../pathCollection";

import { CodeApiInterface, GetCodeInfoResponse } from "./CodeInterface";

export class CodeService implements CodeApiInterface {
    public async getCodeInfo(params: { p_code: string }): Promise<GetCodeInfoResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: CODE_API_URL.getCodeInfo_test,
            devurl: CODE_API_URL.getCodeInfo_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST, data: params });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as GetCodeInfoResponse;
                case 401:
                    window.location.reload();
                    break;
                default:
                    return resObject.data as ErrorResponse;
            }
        } else {
            return undefined;
        }
    }
}
