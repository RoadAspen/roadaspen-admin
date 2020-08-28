import React, { useState, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { main } from '@/assets/css/main/main.scss';
// import Loadable from 'react-loadable';
import Aside from '@/components/main/Aside';
import Content from '@/components/main/Content';
import Header from '@/components/main/Header';
import Page from '@/components/main/Page';
import Footer from '@/components/main/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { renderRoutes } from 'react-router-config';
// import Consumer from '@/pages/main/Consumer';

// main 页面左右布局。采用flex， aside 宽度固定，右侧 content 宽度自适应
// content 页面上下布局， 采用 flex ，header，footer 高度固定。page 高度自适应

const Main = (props: any) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    function toggle() {
        setCollapsed(!collapsed);
    }
    return (
        <div className={main}>
            <Aside collapsed={collapsed} />
            <Content>
                <Header collapsed={collapsed} onClick={toggle} />
                <Page>
                    <ErrorBoundary>
                        <Suspense fallback={<div>页面正在加载。。。</div>}>
                            {/*Suspense 可以置于 懒加载组件之上的任何位置。 fallback 在懒加载之前添加一个loading组件*/}
                            <Switch>{renderRoutes(props.route.routes)}</Switch>
                        </Suspense>
                    </ErrorBoundary>
                </Page>
                <Footer />
            </Content>
        </div>
    );
};

export default Main;
