/**
 * React App 컴포넌트
 * @file src/app.tsx
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";

import "./i18n/i18n";

import { CheckLoginResponse } from "./services/api/auth/AuthInterface";
import AuthService from "./services/api/auth/AuthService";
import CodeService from "./services/api/code/CodeService";
import LayerService from "./services/api/layer/LayerService";
import { NewTmsKnpInterface } from "./services/api/tmsKnp/TmsKnpApi";
import {
    GetCodeInfoResponse,
    GetLayersResponse,
    GetLayerStylesResponse,
    GetResourceInfoResponse,
    GetUserAuthResponse,
    MenuRole,
} from "./services/api/tmsKnp/TmsKnpInterface";
//import { CommonState } from "./services/store/common/common-slice";
import { InitDataState, setStoredInitData, setStoredLoginUserInfo } from "./services/store/common/init-data-slice";
import { setStoredWsMessage, setWebSocket } from "./services/store/common/ws-slice";
import { useAppDispatch, useAppSelector } from "./services/store/hooks";
import { GlobalFonts, GlobalStyles } from "./styles";
import { darkTheme, lightTheme } from "./styles/theme";
import { Menu, MENUS } from "./views/components/common";
import { Layout } from "./views/layouts/Layout";

import "react-pro-sidebar/dist/css/styles.css";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "rc-tree/assets/index.css";

const App = (): JSX.Element => {
    const themeMode = process.env.THEME_MODE;

    const CODE_NPK = "NPK"; // 국립공원 코드
    const CODE_NPO = "NPO"; // 국립공원사무소 코드
    const CODE_ASSET_TYPE = "ASSET_TYPE"; // 자산타입 코드
    const CODE_DSST = "DSST"; // 재난구분 코드
    const CODE_SITU = "SITU"; // 재난상황 코드

    const dispatch = useAppDispatch();

    const storedCommon = useAppSelector((state) => state.common);
    const { locale } = storedCommon;

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { loginUserInfo } = storedInitData;

    const { i18n } = useTranslation();

    //웹 소켓 담는 변수
    const ws = useRef<WebSocket | null>(null);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    //const [loading, setLoading] = useState<boolean>(true);

    // const createWebSocket = useCallback(
    //     (gid: string, uid: string, isRetry = false) => {
    //         const protocol = window.location.protocol.indexOf("https") > -1 ? "wss://" : "ws://";
    //         const currentHost = `${protocol}${window.location.host}`;
    //         ws.current = new WebSocket(`${currentHost}/tms-knp-notice/api/v1/ws`);
    //         dispatch(setWebSocket(ws.current));

    //         ws.current.onopen = () => {
    //             const msg = {
    //                 cmd: "userregistry",
    //                 body: { group_id: gid, user_id: uid },
    //             };
    //             ws.current?.send(JSON.stringify(msg));
    //         };

    //         ws.current.onmessage = (event: MessageEvent) => {
    //             const parseMessage = JSON.parse(event.data);
    //             if (Object.keys(parseMessage).length > 0) {
    //                 dispatch(setStoredWsMessage(parseMessage));
    //             }
    //         };

    //         ws.current.onclose = (event: CloseEvent) => {
    //             if (!event.wasClean && !isRetry) {
    //                 createWebSocket(gid, uid, true);
    //             }
    //         };

    //         ws.current.onerror = (event: Event) => {
    //             console.error("WebSocket connection error", event);
    //         };
    //     },
    //     [dispatch]
    // );

    /**
     * @private
     * @description [useEffect hook] mouth 시 소켓 연결
     */
    // useEffect(() => {
    //     if (!ws.current && loginUserInfo) {
    //         createWebSocket(loginUserInfo.gid, loginUserInfo.uid);
    //     }
    // }, [createWebSocket, loginUserInfo]);

    /**
     * @name checkLogin
     * @async
     * @function
     * @description 로그인 여부 확인
     * @return {Promise<CheckLoginResponse>}
     */
    const checkLogin = useCallback(async (): Promise<CheckLoginResponse> => {
        const authService = AuthService();

        const checkLoginResponse = await authService.checkLogin();
        return new Promise((resolve, reject) => {
            if (checkLoginResponse) {
                resolve(checkLoginResponse as CheckLoginResponse);
            } else {
                reject();
            }
        });
    }, []);

    /**
     * @private
     * @description [useEffect hook] 로그인 여부 확인 useCallback 호출
     */
    useEffect(() => {
        let isComponentMounted = true;
        checkLogin().then((checkLoginResponse) => {
            if (isComponentMounted) {
                dispatch(setStoredLoginUserInfo(checkLoginResponse.response));
                setIsAuthenticated(true);
            }
        });
        return () => {
            isComponentMounted = false;
        };
    }, [checkLogin, dispatch]);

    /**
     * @name getUserAuth
     * @async
     * @function
     * @description 사용자 권한 정보 조회
     * @return {Promise<GetUserAuthResponse>}
     */
    const getUserAuth = useCallback(async (uid: string): Promise<GetUserAuthResponse> => {
        const tmsKnpService = NewTmsKnpInterface();
        const getUserAuthResponse = await tmsKnpService.getUserAuth({ uid: uid });
        return new Promise((resolve, reject) => {
            if (getUserAuthResponse?.code === 200) {
                resolve(getUserAuthResponse as GetUserAuthResponse);
            } else {
                reject(getUserAuthResponse?.message);
            }
        });
    }, []);

    /**
     * @name getLayers
     * @async
     * @function
     * @description 레이어 목록 조회
     * @return {Promise<GetLayersResponse>}
     */
    const getLayers = useCallback(async (): Promise<GetLayersResponse> => {
        const layerService = LayerService();
        const getLayersResponse = await layerService.getLayers();
        return new Promise((resolve, reject) => {
            if (getLayersResponse?.code === 200) {
                resolve(getLayersResponse as GetLayersResponse);
            } else {
                reject(getLayersResponse?.message);
            }
        });
    }, []);

    /**
     * @name getLayerStyles
     * @async
     * @function
     * @description 레이어 스타일 조회
     * @return {Promise<GetLayerStylesResponse>}
     */
    const getLayerStyles = useCallback(async (): Promise<GetLayerStylesResponse> => {
        const layerService = LayerService();
        const getLayerStylesResponse = await layerService.getLayerStyles();
        return new Promise((resolve, reject) => {
            if (getLayerStylesResponse) {
                resolve(getLayerStylesResponse as GetLayerStylesResponse);
            } else {
                reject();
            }
        });
    }, []);

    // /**
    //  * @name getResourceInfo
    //  * @async
    //  * @function
    //  * @description 장비 정보 조회
    //  * @return {Promise<GetResourceInfoResponse>}
    //  */
    // const getResourceInfo = useCallback(async (): Promise<GetResourceInfoResponse> => {
    //     const tmsKnpService = NewTmsKnpInterface();
    //     const getResposneInfoResponse = await tmsKnpService.getResourceInfo();
    //     return new Promise((resolve, reject) => {
    //         if (getResposneInfoResponse?.code === 200) {
    //             resolve(getResposneInfoResponse as GetResourceInfoResponse);
    //         } else {
    //             reject(getResposneInfoResponse?.message);
    //         }
    //     });
    // }, []);

    /**
     * @name getCodeInfo
     * @async
     * @function
     * @description 코드 정보 조회
     * @return {Promise<GetCodeInfoResponse>}
     */
    const getCodeInfo = useCallback(async (pCode: string): Promise<GetCodeInfoResponse> => {
        const codeService = CodeService();
        const getCodeInfoResponse = await codeService.getCodeInfo({ p_code: pCode });
        return new Promise((resolve, reject) => {
            if (getCodeInfoResponse?.code === 200) {
                resolve(getCodeInfoResponse as GetCodeInfoResponse);
            } else {
                reject(getCodeInfoResponse?.message);
            }
        });
    }, []);

    /**
     * @name filterMenusByRoles
     * @function
     * @description 권한을 기반으로 메뉴 정보 필터링
     * @return {Menu[]}
     */
    const filterMenusByRoles = useCallback((menus: Menu[], roles: MenuRole[]): Menu[] => {
        return menus.filter((menu) => {
            if (menu.isLeafMenu) {
                return true;
            }

            const hasRole = roles.find((role) => role.menu_code === menu.code);
            if (hasRole && menu.children) {
                menu.children = filterMenusByRoles(menu.children, roles);
            }
            return hasRole;
        });
    }, []);

    useEffect(() => {
        const isComponentMounted = true;
        if (isAuthenticated && loginUserInfo) {
            Promise.all([
                getUserAuth(loginUserInfo.uid),
                // getLayers(),
                // getLayerStyles(),
                //getResourceInfo(),
                getCodeInfo(CODE_NPK),
                getCodeInfo(CODE_NPO),
                getCodeInfo(CODE_ASSET_TYPE),
                getCodeInfo(CODE_DSST),
                getCodeInfo(CODE_SITU),
            ]).then(
                ([
                    getUserAuthResponse,
                    //  getLayersResponse,
                    //  getLayerStylesResponse,
                    // getResourceInfoResponse,
                    getNpkCodeInfoResponse,
                    getNpoCodeInfoResponse,
                    getAssetTypeCodeInfoResponse,
                    getDisasterCodeInfoResponse,
                    //  getSituationCodeInfoResponse,
                ]) => {
                    if (isComponentMounted) {
                        if (
                            getUserAuthResponse &&
                            //     getLayersResponse &&
                            //     getLayerStylesResponse &&
                            //    getResourceInfoResponse &&
                            getNpkCodeInfoResponse &&
                            getNpoCodeInfoResponse &&
                            getAssetTypeCodeInfoResponse &&
                            getDisasterCodeInfoResponse
                            //   getSituationCodeInfoResponse
                        ) {
                            const _userAuth = getUserAuthResponse.response;
                            const _authMenus = filterMenusByRoles(MENUS, _userAuth.user_menu_role);
                            const _parkCodes = getNpkCodeInfoResponse.response.results;
                            // 국립공원코드 중 사용자권한정보의 국립코드 배열에 포함된 코드만 별도 저장
                            const _authParkCodes = _parkCodes.filter((parkCode) =>
                                _userAuth.npk_cds.includes(parkCode.code)
                            );
                            dispatch(
                                setStoredInitData({
                                    userAuth: _userAuth,
                                    layers: [],
                                    layerStyles: [],
                                    resources: [],
                                    authMenus: _authMenus,
                                    parkOfficeCodes: getNpoCodeInfoResponse.response.results,
                                    assetTypeCodes: getAssetTypeCodeInfoResponse.response.results,
                                    disasterCodes: getDisasterCodeInfoResponse.response.results,
                                    situationCodes: [],
                                    parkCodes: _parkCodes,
                                    authParkCodes: _authParkCodes,
                                })
                            );
                        }
                    }
                }
            );
        }
    }, [
        dispatch,
        filterMenusByRoles,
        getCodeInfo,
        // getLayerStyles,
        //  getLayers,
        // getResourceInfo,
        getUserAuth,
        isAuthenticated,
        loginUserInfo,
    ]);

    /**
     * @private
     * @description [useEffect hooks] 저장된 공통데이터를 다국어 처리에 적용
     */
    useEffect(() => {
        const {
            layers,
            layerStyles,
            resources,
            parkCodes,
            parkOfficeCodes,
            assetTypeCodes,
            disasterCodes,
            situationCodes,
        } = storedInitData;
        const translationResources = {
            LAYER: layers.reduce((prev, curr) => ({ ...prev, [curr.layer_id]: curr.layer_name }), {} as object),
            LAYER_STYLES: layerStyles.reduce((prev, curr) => ({ ...prev, [curr.layer_id]: curr.image }), {} as object),
            RESOURCE: resources.reduce(
                (prev, curr) => ({ ...prev, [curr.resource_code]: curr.resource_name }),
                {} as object
            ),
            PARK: parkCodes.reduce((prev, curr) => ({ ...prev, [curr.code]: curr.code_name }), {} as object),
            PARK_OFFICE: parkOfficeCodes.reduce(
                (prev, curr) => ({ ...prev, [curr.code]: curr.code_name }),
                {} as object
            ),
            ASSET_TYPE: assetTypeCodes.reduce((prev, curr) => ({ ...prev, [curr.code]: curr.code_name }), {} as object),
            DISASTER: disasterCodes.reduce((prev, curr) => ({ ...prev, [curr.code]: curr.code_name }), {} as object),
            SITUATION: situationCodes.reduce((prev, curr) => ({ ...prev, [curr.code]: curr.code_name }), {} as object),
        };
        i18n.addResourceBundle(locale, "translations", translationResources);
    }, [i18n, locale, storedInitData]);

    return (
        <ThemeProvider theme={themeMode === "DARK" ? darkTheme : lightTheme}>
            <GlobalStyles />
            <GlobalFonts />
            <Layout />
        </ThemeProvider>
    );
};

export default App;
