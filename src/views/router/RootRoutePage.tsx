import React from "react";

import { RouteComponentProps } from "react-router-dom";

import { SubMenuRoutes } from "./SubMenuRoutes";

export const RootRoutePage = ({ match }: RouteComponentProps): JSX.Element => {
    return <SubMenuRoutes parentPath={match.path} />;
};
