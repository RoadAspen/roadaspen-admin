import { Component } from 'react';
import { withRouter, IRouteComponentProps } from 'umi';

// 每当跳转时，默认滚动到最顶端， 监听路由跳转
class ScrollToTop extends Component<IRouteComponentProps, {}> {
	componentDidUpdate(prevProps: { location: any; }) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}
	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);