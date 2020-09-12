import { useEffect } from 'react';
// 当每次界面更新时，就滚动到页面顶部
function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

export default ScrollToTopOnMount;
