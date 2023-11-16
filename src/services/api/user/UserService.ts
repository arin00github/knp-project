import { ErrorResponse, HTTP_REQEST, TmsKnpResponse, executeRequest } from "../HttpService";
import { USER_API_URL, configureUrl } from "../pathCollection";

import {
    GetUserDetailResponse,
    GetUsersByAdminParams,
    GetUsersByAdminResponse,
    PutUserByAdminParams,
    UserApiInterface,
    UserByAdmin,
} from "./UserInterface";

export class UserService implements UserApiInterface {
    public async getUsersByAdmin(
        params: GetUsersByAdminParams
    ): Promise<GetUsersByAdminResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: USER_API_URL.getUserList_test,
            devurl: USER_API_URL.getUserList_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST, data: params });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as GetUsersByAdminResponse;
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

    public async getUserDetail(params: { uid: string }): Promise<GetUserDetailResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: USER_API_URL.getUserDetail_test,
            devurl: USER_API_URL.getUserDetail_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST, data: params });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as GetUserDetailResponse;
                case 401:
                    window.location.reload();
                    break;
                default:
                    return resObject.data as ErrorResponse;
            }
        } else {
            return undefined;
        }
        return undefined;
    }
    public async putUserByAdmin(params: PutUserByAdminParams): Promise<TmsKnpResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: USER_API_URL.putUser_test,
            devurl: USER_API_URL.putUser_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST, data: params });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as TmsKnpResponse;
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
    public async postUserByAdmin(params: Partial<UserByAdmin>): Promise<TmsKnpResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: USER_API_URL.postUser_test,
            devurl: USER_API_URL.postUser_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST, data: params });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as TmsKnpResponse;
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
    public async deleteUserByAdmin(params: { uids: string[] }): Promise<TmsKnpResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: USER_API_URL.deleteUser_test,
            devurl: USER_API_URL.deleteUser_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST, data: params });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as TmsKnpResponse;
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
