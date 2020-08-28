declare namespace LoginScssNamespace {
    export interface ILoginScss {
        loginBg: string;
        loginFooter: string;
        loginFormBox: string;
        loginFormBtn: string;
        loginFormError: string;
        loginFormForgot: string;
        loginIcon: string;
        loginInput: string;
        loginTitle: string;
        login_bg: string;
        login_footer: string;
        login_form_box: string;
        login_form_btn: string;
        login_form_error: string;
        login_form_forgot: string;
        login_icon: string;
        login_input: string;
        login_title: string;
    }
}

declare const LoginScssModule: LoginScssNamespace.ILoginScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: LoginScssNamespace.ILoginScss;
};

export = LoginScssModule;
