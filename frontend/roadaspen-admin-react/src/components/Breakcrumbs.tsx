import { NavLink } from 'umi';
import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc
const routes = [
    { path: '/', breadcrumb: '首页' },
    { path: '/list', breadcrumb: 'List Page' },
];

const Breadcrumbs = ({ breadcrumbs }) => (
    <div>
        {breadcrumbs.map((breadcrumb, index) => (
            <span key={breadcrumb.key}>
                <NavLink to={breadcrumb.props.match.url}>
                    {breadcrumb}
                </NavLink>
                {(index < breadcrumbs.length - 1) && <i> / </i>}
            </span>
        ))}
    </div>
)

export default withBreadcrumbs(routes)(Breadcrumbs);