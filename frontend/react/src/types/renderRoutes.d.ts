import * as React from "react";
import { RouteComponentProps, SwitchProps, match } from "react-router";
import { Location } from "history";

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
    route?: RouteConfig;
}

export interface RouteAuthConfig {
    key?: React.Key;
    location?: Location;
    component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType;
    path?: string | string[];
    exact?: boolean;
    strict?: boolean;
    routes?: RouteConfig[];
    render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
    [propName: string]: any;
}