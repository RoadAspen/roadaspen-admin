declare namespace MainScssNamespace {
    export interface IMainScss {
        aside: string;
        asideCollapsed: string;
        asideNocollapsed: string;
        aside_collapsed: string;
        aside_nocollapsed: string;
        content: string;
        footerBox: string;
        footer_box: string;
        headerBox: string;
        header_box: string;
        logo: string;
        logout: string;
        main: string;
        page: string;
        pageBody: string;
        pageContent: string;
        pageTab: string;
        page_body: string;
        page_content: string;
        page_tab: string;
        trigger: string;
    }
}

declare const MainScssModule: MainScssNamespace.IMainScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MainScssNamespace.IMainScss;
};

export = MainScssModule;
