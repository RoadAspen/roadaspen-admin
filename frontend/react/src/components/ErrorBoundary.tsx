/**
 * 错误边界处理，当内部js处理错误时，用来显示错误代码
 */
import * as React from 'react';

export interface IErrorBoundaryProps {
    children: React.ReactElement;
}

export interface IErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    constructor(props: IErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error: any) {
        console.log(123123);
        // 生命周期方法，当内部出现错误时执行
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // 显式错误日志
        // 你同样可以将错误日志上报给服务器
        // logErrorToMyService(error, errorInfo);
        console.log(error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <h1>Something went wrong.</h1>;
        }
        return <>{this.props.children}</>;
    }
}
