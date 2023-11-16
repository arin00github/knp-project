import { configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import commonReducer from "./common/common-slice";
import initDataReducer from "./common/init-data-slice";
import wsReducer from "./common/ws-slice";
import situationStatusReducer from "./dashboard/situation-status-slice";
import specialStatusReducer from "./dashboard/special-status-slice";
import broadcastsReducer from "./disasterManagement/broadcasts-slice";
import disastersReducer from "./disasterManagement/disasters-slice";
import responsesReducer from "./disasterManagement/responses-slice";
import gisReducer from "./gis/gis-slice";
import assetsReducer from "./management/assets-slice";
import parksReducer from "./management/parks-slice";
import resourcesReducer from "./management/resources-slice";
import manualReducer from "./manualManagement/manual-slice";
import periodicalReportsReducer from "./periodicalReportManagement/periodical-reports-slice";
import assetGroupReducer from "./setting/asset-group-slice";
import authReducer from "./setting/auth-slice";
import commonCodeReducer from "./setting/common-code-slice";
import groupsReducer from "./setting/groups-slice";
import helpMessageReducer from "./setting/help-message-slice";
import smsTemplateReducer from "./setting/sms-template-slice";
import systemsReducer from "./setting/systems-slice";
import userLogsReducer from "./setting/user-logs-slice";
import usersReducer from "./setting/users-slice";

/**
 * persist (store 페이지 새로고침시 유지) 에서 제외 하고자 하는 대상 state 는
 * 아래와 같이 config로 blacklist에 추가한다.
 */
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: [
        "common",
        "initData",
        "ws",
        "situationStatus",
        "specialStatus",
        "gis",
        "disasters",
        "responses",
        "broadcasts",
        "parks",
        "assets",
        "resources",
        "auth",
        "groups",
        "users",
        "userManagement",
        "userLogs",
        "commonCode",
        "systems",
        "smsTemplate",
        "helpMessage",
        "periodicalReports",
    ],
};

const commonConfig = {
    key: "common",
    storage,
    blacklist: ["pageLoading"],
};

const initDataConfig = {
    key: "initData",
    storage,
    blacklist: [],
};

const wsConfig = {
    key: "ws",
    storage,
    blacklist: ["socket", "message"],
};

const situationStatusConfig = {
    key: "situationStatus",
    storage,
    blacklist: [
        "situationSpreadLoading",
        "situationStatisticLoading",
        "weatherLoading",
        "resourceLoading",
        "statisticCodes",
        "situationStatusParams",
    ],
};

const specialStatusConfig = {
    key: "specialStatus",
    storage,
    blacklist: [
        "specialStatusLoading",
        "selectedMidLandWeatherLoading",
        "selectedParkWeatherLoading",
        "specialStatusContentLoading",
        "radarSizeUp",
        "selectedSituationParkCodes",
        "isSpecialStatusShow",
        "specialStatusParams",
    ],
};

const gisConfig = {
    key: "gis",
    storage,
    blacklist: [
        "allLayers",
        "allLayerStyles",
        "selectedLayers",
        "selectedRefreshMapLayers",
        "selectedSafetyMapLayers",
        "onClickMapLocation",
        "moveCoordinates",
        "isPopupOpen",
        "isMapInit",
        "trailLayerSearchAssetInfo",
        "trailLayerSearchLoading",
    ],
};

const disastersConfig = {
    key: "disasters",
    storage,
    blacklist: ["loading", "filterParams", "selectedIds"],
};

const responsesConfig = {
    key: "responses",
    storage,
    blacklist: ["loading", "selectedIds", "selectedRow", "selectedRowIndex", "isMapShow"],
};

const broadcastsConfig = {
    key: "broadcasts",
    storage,
    blacklist: ["loading", "filterParams", "selectedIds"],
};

const parksConfig = {
    key: "parks",
    storage,
    blacklist: ["loading", "filterParams", "selectedRowId", "isEditFormOpen"],
};

const manualConfig = {
    key: "manual",
    storage,
    blacklist: ["loading", "selectedIds"],
};

const assetsConfig = {
    key: "assets",
    storage,
    blacklist: ["loading", "filterParams", "selectedIds"],
};

const resourcesConfig = {
    key: "resources",
    storage,
    blacklist: ["loading", "filterParams"],
};

const authConfig = {
    key: "auth",
    storage,
    blackList: ["rowData", "authDetail"],
};

const groupsConfig = {
    key: "groups",
    storage,
    blacklist: ["loading", "filterParams", "selectedIds", "selectedRow", "isEditFormOpen", "searchUserKeyword"],
};

const usersConfig = {
    key: "users",
    storage,
    blacklist: ["loading", "filterParams", "selectedIds", "selectedRow", "isEditFormOpen", "formSelectBoxData"],
};

const usersLogsConfig = {
    key: "userLogs",
    storage,
    blacklist: ["loading", "searchParams"],
};

const commonCodeConfig = {
    key: "commonCode",
    storage,
    blackList: ["loading", "searchParams", "filterParams", "selectedRow", "isEditFormOpen"],
};

const systemsConfig = {
    key: "systems",
    storage,
    blacklist: ["loading", "reportData", "selectedIds", "reportButtonType"],
};

const smsTemplateConfig = {
    key: "smsTemplate",
    storage,
    blacklist: ["loading", "selectedIds", "selectedRow", "isEditFormOpen"],
};

const helpMessageConfig = {
    key: "helpMessage",
    storage,
    blacklist: ["loading", "selectedIds", "selectedRow", "isEditFormOpen"],
};

const periodicalReportsConfig = {
    key: "periodicalReports",
    storage,
    blacklist: [
        "loading",
        "filterParams",
        "selectedIds",
        "selectedRowId",
        "imageIds",
        "isEditFormOpen",
        "isRootGroupMember",
    ],
};

const assetGroupConfig = {
    key: "assetGroup",
    storage,
};

export const reducers = {
    common: persistReducer(commonConfig, commonReducer),
    initData: persistReducer(initDataConfig, initDataReducer),
    ws: persistReducer(wsConfig, wsReducer),
    situationStatus: persistReducer(situationStatusConfig, situationStatusReducer),
    specialStatus: persistReducer(specialStatusConfig, specialStatusReducer),
    gis: persistReducer(gisConfig, gisReducer),
    disasters: persistReducer(disastersConfig, disastersReducer),
    responses: persistReducer(responsesConfig, responsesReducer),
    broadcasts: persistReducer(broadcastsConfig, broadcastsReducer),
    parks: persistReducer(parksConfig, parksReducer),
    manual: persistReducer(manualConfig, manualReducer),
    assets: persistReducer(assetsConfig, assetsReducer),
    resources: persistReducer(resourcesConfig, resourcesReducer),
    auth: persistReducer(authConfig, authReducer),
    groups: persistReducer(groupsConfig, groupsReducer),
    users: persistReducer(usersConfig, usersReducer),
    userLogs: persistReducer(usersLogsConfig, userLogsReducer),
    commonCode: persistReducer(commonCodeConfig, commonCodeReducer),
    systems: persistReducer(systemsConfig, systemsReducer),
    smsTemplate: persistReducer(smsTemplateConfig, smsTemplateReducer),
    helpMessage: persistReducer(helpMessageConfig, helpMessageReducer),
    periodicalReports: persistReducer(periodicalReportsConfig, periodicalReportsReducer),
    assetGroup: persistReducer(assetGroupConfig, assetGroupReducer),
};

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
export const history = createBrowserHistory({ basename: baseUrl });

const middleware = [routerMiddleware(history)];

const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
