import { Component } from 'react';
import {withRouter} from 'umi';

class ScrollToTop extends Component {
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