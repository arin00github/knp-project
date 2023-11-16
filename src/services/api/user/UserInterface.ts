import { ErrorResponse, TmsKnpResponse } from "../HttpService";

/**
 * get user list 사용자 목록 조회 (관리자)
 */
export interface GetUsersByAdminParams {
    gid?: string;
    auth_code?: string;
    user_filter?: string;
}

export interface UserByAdmin {
    uid: string;
    user_account: string;
    user_name: string;
    auth_code: string;
    auth_name: string;
    gid: string;
    group_name: string;
    mobile_num: string;
    email: string;
    dept_cd: string;
    umjp_cd: string;
    umpg_cd: string;
    umjo_cd: string;
    dept_nm: string;
    umjp_nm: string;
    umpg_nm: string;
    umjo_nm: string;
    reg_date: string;
    upd_date: string;
    bjcd: string;
}

export type GetUsersByAdminResult = UserByAdmin;

export interface GetUsersByAdminResponse extends TmsKnpResponse {
    response: {
        results: GetUsersByAdminResult[];
        total_count: number;
    };
}

export interface UserDetailByAdmin extends UserByAdmin {
    npk_cds: string[];
    user_img_type: string;
    user_img: string;
    birth_date: string;
    enter_date: string;
    retire_date: string;
    umjd_cd: string;
    twofa_type: string;
    is_lock_login: boolean;
    is_multi_login: boolean;
    is_sleeper_account: boolean;
    last_login_date: string;
    pw_changed_date: string;
    pw_expire_days: number;
    session_count: number;
    session_list: {
        session_id: string;
        client_id: string;
        login_date: string;
    };
}

export interface GetUserDetailResponse extends TmsKnpResponse {
    response: UserDetailByAdmin;
}

/** 사용자 생성 parameter */
export type PostUserByAdminParams = Partial<UserByAdmin>;

/** 사용자 수정 params */
export type PutUserByAdminParams = Pick<UserByAdmin, "uid"> & Partial<Omit<UserByAdmin, "uid">>;

/**  */
export type DeleteUserByAdminParams = {
    uids: string[];
};

/*******************************************************************************
 * [설정 > 사용자 설정]
 *******************************************************************************/
/**
 * [설정 > 사용자 설정] 사용자 정보 조회 API
 */
export interface UserInfo extends Omit<UserByAdmin, "bjcd"> {
    bjcd: string[];
    bjcd_sido: string[];
    bjcd_sig: string[];
    bjcd_emd: string[];
}

export type GetUserInfoResult = UserInfo;

export interface GetUserInfoResponse extends TmsKnpResponse {
    response: GetUserInfoResult;
}

export interface UserApiInterface {
    getUsersByAdmin(params: GetUsersByAdminParams): Promise<GetUsersByAdminResponse | ErrorResponse | undefined>;
    getUserDetail(params: { uid: string }): Promise<GetUserDetailResponse | ErrorResponse | undefined>;
    putUserByAdmin(params: PutUserByAdminParams): Promise<TmsKnpResponse | ErrorResponse | undefined>;
    postUserByAdmin(params: PostUserByAdminParams): Promise<TmsKnpResponse | ErrorResponse | undefined>;
    deleteUserByAdmin(params: { uids: string[] }): Promise<TmsKnpResponse | ErrorResponse | undefined>;
}
