import base64url from "base64url";

import { executeRequest, HTTP_REQUEST_TIMEOUT } from "../HttpService";

import { AuthApiInterface, CheckLoginResponse } from "./AuthInterface";

export class AuthHttp implements AuthApiInterface {
    private baseUrl = "/auth";

    private redirectToLogin() {
        const redirectUrl = base64url.encode(window.location.pathname);
        window.location.replace(`${this.baseUrl}/login?redirect=${redirectUrl}`);
    }

    public async checkLogin(): Promise<CheckLoginResponse | undefined> {
        const response = await executeRequest(`${this.baseUrl}/checkLogin`, {
            method: "GET",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            return response.data as CheckLoginResponse;
        }
        if (response && response.status == 401) {
            this.redirectToLogin();
            return undefined;
        }
        return undefined;
    }

    public async logout(): Promise<string | undefined> {
        const response = await executeRequest(`${this.baseUrl}/logout`, {
            method: "GET",
            timeout: HTTP_REQUEST_TIMEOUT,
        });
        if (response && response.status == 200) {
            this.redirectToLogin();
            return response.data as string;
        }
        if (response && response.status == 401) {
            window.location.reload();
            return undefined;
        }
        return undefined;
    }
}

const AuthService = (): AuthApiInterface => {
    return new AuthHttp();
};
export default AuthService;
