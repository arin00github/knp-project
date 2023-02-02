/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from "react";

import { AiOutlineAppstore, AiOutlineSetting } from "react-icons/ai";
import { BsClipboard } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { ImEarth } from "react-icons/im";
import { TbReport, TbReportAnalytics } from "react-icons/tb";
import { VscRadioTower } from "react-icons/vsc";
import { RouteComponentProps } from "react-router-dom";

import {
    MENU_3DGIS,
    MENU_ASSET_MGT,
    MENU_AUTH_MGT,
    MENU_BROAD_HIST,
    MENU_CODE,
    MENU_COMM_CODE,
    MENU_DASHBOARD,
    MENU_GROUP_MGT,
    MENU_MANUAL_MGT,
    MENU_NPK_ASSET,
    MENU_NPK_MGT,
    MENU_REGULRA_MGT,
    MENU_RESR_REPORT,
    MENU_SETUP,
    MENU_SITU_NOTION,
    MENU_SITU_NOTION_HIST,
    MENU_SITU_REPORT,
    MENU_SITU_STATUS,
    MENU_SPECIAL_STATUS,
    MENU_SYS_SETUP,
    MENU_USER_ACCESS_HIST,
    MENU_USER_MGT,
} from "../../../services/interfaces";
import {
    AssetManagementPage,
    AuthManagementPage,
    BroadcastHistoryPage,
    CommonCodePage,
    DashboardSituationStatusPage,
    DashboardSpecialStatusPage,
    DisasterHistoryPage,
    GisPage,
    GroupManagementPage,
    ManualManagementPage,
    RootRoutePage,
    ParkManagementPage,
    PeriodicalReportManagementPage,
    ReportDisasterPage,
    ResourceStatusPage,
    SystemSettingPage,
    UserLogsPage,
    UserManagementPage,
} from "../../pages";
import { DashboardSituationStatus, DashboardSpecialStatus } from "../dashboard";
import { BroadcastList, DisasterDetail, DisasterList } from "../disasterManagement";
import { GisWrapper } from "../gis";
import { AssetList, EditAsset, ParkManagement, ResourceList } from "../management";
import { ManualManagementList } from "../manualManagement";
import { PeriodicalReportManagement } from "../periodicalReportManagement";
import { ReportDisaster } from "../reportDisaster";
import {
    AuthManagement,
    CommonCode,
    UserLogsList,
    UserManagement,
    SmsGroup,
    NationalParkGroup,
    DisasterReportManagement,
    HelpMessageManagement,
    SmsTemplateManagement,
} from "../setting";

export interface Menu {
    name: string;
    code: MENU_CODE | "";
    icon?: ReactElement;
    path: string;
    component?: React.ComponentType<RouteComponentProps<any>>;
    children?: Menu[];
    hideChildren?: boolean;
    isLeafMenu?: boolean;
}

const DashboardMenu: Menu = {
    name: "대시보드",
    code: MENU_DASHBOARD,
    icon: <AiOutlineAppstore />,
    path: "/dashboard",
    component: RootRoutePage,
    children: [
        {
            name: "특보현황",
            code: MENU_SPECIAL_STATUS,
            path: "/dashboard/special-status",
            component: DashboardSpecialStatusPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/dashboard/special-status",
                    component: DashboardSpecialStatus,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "상황현황",
            code: MENU_SITU_STATUS,
            path: "/dashboard/situation-status",
            component: DashboardSituationStatusPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/dashboard/situation-status",
                    component: DashboardSituationStatus,
                    isLeafMenu: true,
                },
            ],
        },
    ],
};

const GisMenu: Menu = {
    name: "3D GIS",
    code: MENU_3DGIS,
    icon: <ImEarth />,
    path: "/gis",
    component: GisPage,
    children: [
        {
            name: "",
            code: "",
            path: "/gis",
            component: GisWrapper,
            isLeafMenu: true,
        },
    ],
    hideChildren: true,
};

const ReportDisasterMenu: Menu = {
    name: "상황전파",
    code: MENU_SITU_NOTION,
    icon: <VscRadioTower />,
    path: "/report-disaster",
    component: ReportDisasterPage,
    children: [
        {
            name: "",
            code: "",
            path: "/report-disaster",
            component: ReportDisaster,
            isLeafMenu: true,
        },
    ],
    hideChildren: true,
};

const DisasterManagementMenu: Menu = {
    name: "상황관리",
    code: MENU_SITU_REPORT,
    icon: <BsClipboard />,
    path: "/disaster-management",
    component: RootRoutePage,
    children: [
        {
            name: "상황전파이력",
            code: MENU_SITU_NOTION_HIST,
            path: "/disaster-management/disaster-history",
            component: DisasterHistoryPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/disaster-management/disaster-history",
                    component: DisasterList,
                    isLeafMenu: true,
                },
                {
                    name: "대응 SOP",
                    code: "",
                    path: "/disaster-management/disaster-history/responses/:id",
                    component: DisasterDetail,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "방송이력",
            code: MENU_BROAD_HIST,
            path: "/disaster-management/broadcast-history",
            component: BroadcastHistoryPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/disaster-management/broadcast-history",
                    component: BroadcastList,
                    isLeafMenu: true,
                },
            ],
        },
    ],
};

const PeriodicalReportManagementMenu: Menu = {
    name: "정기 보고 관리",
    code: MENU_REGULRA_MGT,
    icon: <TbReportAnalytics />,
    path: "/periodical-report-management",
    component: PeriodicalReportManagementPage,
    children: [
        {
            name: "산불일보",
            code: "",
            path: "/periodical-report-management/PD001",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "재난예경보시설 일보",
            code: "",
            path: "/periodical-report-management/PD002",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "안점점검의 날",
            code: "",
            path: "/periodical-report-management/PD003",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "안전관리 전담자 실적",
            code: "",
            path: "/periodical-report-management/PD004",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "탐방객안전교육",
            code: "",
            path: "/periodical-report-management/PD005",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "재난 취약지구 정비",
            code: "",
            path: "/periodical-report-management/PD006",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "재난 예경보 시스템 점검",
            code: "",
            path: "/periodical-report-management/PD007",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "장비 유지 관리",
            code: "",
            path: "/periodical-report-management/PD008",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "급경사지 점검",
            code: "",
            path: "/periodical-report-management/PD009",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "추락위험지구 점검",
            code: "",
            path: "/periodical-report-management/PD010",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
        {
            name: "대피소 훈련",
            code: "",
            path: "/periodical-report-management/PD011",
            component: PeriodicalReportManagement,
            isLeafMenu: true,
        },
    ],
    hideChildren: true,
};

const ManualMenu: Menu = {
    name: "매뉴얼 관리",
    code: MENU_MANUAL_MGT,
    icon: <TbReport />,
    path: "/manual",
    component: ManualManagementPage,
    children: [
        {
            name: "",
            code: "",
            path: "/manual",
            component: ManualManagementList,
            isLeafMenu: true,
        },
    ],
    hideChildren: true,
};

const ManagementMenu: Menu = {
    name: "국립공원 자산관리",
    code: MENU_NPK_ASSET,
    icon: <HiOutlineDatabase />,
    path: "/management",
    component: RootRoutePage,
    children: [
        {
            name: "국립공원관리",
            code: MENU_NPK_MGT,
            path: "/management/park",
            component: ParkManagementPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/management/park",
                    component: ParkManagement,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "자산관리",
            code: MENU_ASSET_MGT,
            path: "/management/asset",
            component: AssetManagementPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/management/asset",
                    component: AssetList,
                    isLeafMenu: true,
                },
                {
                    name: "자산등록",
                    code: "",
                    path: "/management/asset/add-asset",
                    component: EditAsset,
                    isLeafMenu: true,
                },
                {
                    name: "자산수정",
                    code: "",
                    path: "/management/asset/modify-asset/:layer_id/:id",
                    component: EditAsset,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "장비관리",
            code: MENU_RESR_REPORT,
            path: "/management/resource",
            component: ResourceStatusPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/management/resource",
                    component: ResourceList,
                    isLeafMenu: true,
                },
            ],
        },
    ],
};

const SettingMenu: Menu = {
    name: "설정",
    code: MENU_SETUP,
    icon: <AiOutlineSetting />,
    path: "/setting",
    component: RootRoutePage,
    children: [
        {
            name: "권한 관리",
            code: MENU_AUTH_MGT,
            path: "/setting/auth",
            component: AuthManagementPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/setting/auth",
                    component: AuthManagement,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "그룹 관리",
            code: MENU_GROUP_MGT,
            path: "/setting/group",
            component: GroupManagementPage,
            children: [
                {
                    name: "국립공원 그룹",
                    code: "",
                    path: "/setting/group/npk-group",
                    component: NationalParkGroup,
                    isLeafMenu: true,
                },
                {
                    name: "SMS 그룹",
                    code: "",
                    path: "/setting/group/sms-group",
                    component: SmsGroup,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "사용자 관리",
            code: MENU_USER_MGT,
            path: "/setting/user",
            component: UserManagementPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/setting/user",
                    component: UserManagement,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "시스템 설정",
            code: MENU_SYS_SETUP,
            path: "/setting/system",
            component: SystemSettingPage,
            children: [
                {
                    name: "재난 보고서 관리",
                    code: "",
                    path: "/setting/system/disaster-report",
                    component: DisasterReportManagement,
                    isLeafMenu: true,
                },
                {
                    name: "SMS 템플릿 관리",
                    code: "",
                    path: "/setting/system/sms-template",
                    component: SmsTemplateManagement,
                    isLeafMenu: true,
                },
                {
                    name: "도움말 관리",
                    code: "",
                    path: "/setting/system/help-message",
                    component: HelpMessageManagement,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "공통 코드",
            code: MENU_COMM_CODE,
            path: "/setting/code",
            component: CommonCodePage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/setting/code",
                    component: CommonCode,
                    isLeafMenu: true,
                },
            ],
        },
        {
            name: "사용자 접속 이력",
            code: MENU_USER_ACCESS_HIST,
            path: "/setting/user-logs",
            component: UserLogsPage,
            children: [
                {
                    name: "",
                    code: "",
                    path: "/setting/user-logs",
                    component: UserLogsList,
                    isLeafMenu: true,
                },
            ],
        },
    ],
};

export const MENUS: Menu[] = [
    DashboardMenu,
    GisMenu,
    ReportDisasterMenu,
    DisasterManagementMenu,
    PeriodicalReportManagementMenu,
    ManualMenu,
    ManagementMenu,
    SettingMenu,
];
