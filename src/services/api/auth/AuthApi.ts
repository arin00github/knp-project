import { AuthHttp } from "./AuthHttp";
import { CheckLoginResponse } from "./AuthInterface";

export interface AuthApi {
    checkLogin(): Promise<CheckLoginResponse | undefined>;
    logout(): Promise<string | undefined>;
}

export const NewAuthInterface = (): AuthApi => {
    return new AuthHttp();
};
