export type configureUrlParams = {
    testurl: string;
    devurl: string;
};

/**
 * Configure url based on environment
 * @param param.testurl - test url
 * @param param.devurl - dev url
 * @returns
 */
export const configureUrl = ({ testurl, devurl }: configureUrlParams) => {
    if (process.env.NODE_ENV === "development") {
        return devurl;
    } else if (process.env.NODE_ENV === "test") {
        return testurl;
    } else {
        return devurl;
    }
};

export const makeTestUrl = (url: string) => {
    return `http://localhost:8080${url}`;
};

export const TMS_URL = "/tms-knp/api/v1";

export const AUTH_API_URL = {
    checkLogin_test: makeTestUrl("/auth/checkLogin"),
    checkLogin_dev: "/auth/checkLogin",
    userAuth_test: makeTestUrl(`${TMS_URL}/auth/get/user-auth`),
    userAuth_dev: `${TMS_URL}/auth/get/user-auth`,
};

export const LAYER_API_URL = {
    getLayerList_test: makeTestUrl(`${TMS_URL}/layer/get/layer-list`),
    getLayerList_dev: `${TMS_URL}/layer/get/layer-list`,
    getStyleList_test: makeTestUrl(`${TMS_URL}/layer/get/style-list`),
    getStyleList_dev: `${TMS_URL}/layer/get/style-list`,
    getAssetGroups_test: makeTestUrl(`${TMS_URL}/layer/get/list`),
    getAssetGroups_dev: `${TMS_URL}/layer/get/list`,
    getAssetGroupDetail_test: makeTestUrl(`${TMS_URL}/layer/get/layer_byid`),
    getAssetGroupDetail_dev: `${TMS_URL}/layer/get/layer_byid`,
};

export const CODE_API_URL = {
    getCodeInfo_test: makeTestUrl("/code/get/code-info"),
    getCodeInfo_dev: "/code/get/code-info",
};

export const RESOURCE_API_URL = {
    getResourceInfo_test: makeTestUrl(`${TMS_URL}/resource/get/resource-info`),
    getResourceInfo_dev: `${TMS_URL}/resource/get/resource-info`,
};

export const USER_API_URL = {
    getUserList_test: makeTestUrl(`${TMS_URL}/admin/user/get/user-list`),
    getUserList_dev: `${TMS_URL}/admin/user/get/user-list`,
    getUserDetail_test: makeTestUrl(`${TMS_URL}/admin/user/get/user`),
    getUserDetail_dev: `${TMS_URL}/admin/user/get/user`,
    postUser_test: makeTestUrl(`${TMS_URL}/admin/user/post/user`),
    postUser_dev: `${TMS_URL}/admin/user/post/user`,
    putUser_test: makeTestUrl(`${TMS_URL}/admin/user/put/user`),
    putUser_dev: `${TMS_URL}/admin/user/put/user`,
    deleteUser_test: makeTestUrl(`${TMS_URL}/admin/user/delete/user`),
    deleteUser_dev: `${TMS_URL}/admin/user/delete/user`,
};
