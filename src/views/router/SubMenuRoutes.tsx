import React, { useMemo } from "react";

import { Redirect, Route, Switch } from "react-router";

import { MENU_ASSET_G_MGT } from "@/services/constant";
import { InitDataState } from "@/services/store/common/init-data-slice";
import { useAppSelector } from "@/services/store/hooks";
import { Menu } from "@/views/components/common";

interface SubMenuRoutesProps {
    parentPath: string;
}

export const SubMenuRoutes = (props: SubMenuRoutesProps): JSX.Element => {
    const { parentPath } = props;

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { authMenus } = storedInitData;

    const subMenus: Menu[] = useMemo(() => {
        const parentPathArr = parentPath.split("/");
        if (parentPathArr.length === 2) {
            const parentMenu = authMenus.find((menu) => menu.path === parentPath);
            if (parentMenu && parentMenu.children) {
                return parentMenu.children;
            }
            return [];
        } else {
            const grandParentMenu = authMenus.find((menu) => menu.path === `/${parentPathArr[1]}`);
            if (grandParentMenu && grandParentMenu.children) {
                const parentMenu = grandParentMenu.children.find((menu) => menu.path === parentPath);
                if (parentMenu && parentMenu.children) {
                    return parentMenu.children;
                }
            }
            return [];
        }
    }, [authMenus, parentPath]);

    return (
        <Switch>
            {subMenus.map((subMenu, index) => (
                <Route key={index} path={subMenu.path} component={subMenu.component} exact={subMenu.isLeafMenu} />
            ))}
            <Redirect
                from="*"
                to={subMenus.find((val) => val.code === MENU_ASSET_G_MGT)?.path || "setting/asset-group"}
            ></Redirect>
        </Switch>
    );
};
