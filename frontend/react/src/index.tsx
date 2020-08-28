import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

const renderApp = (App: React.FC) => {
    ReactDOM.render(<App />, document.querySelector('#root') as HTMLElement);
};

renderApp(App);

// 当module.hot为true时，会触发热加载
//  eslint-disable-next-line prettier/prettier
if(module.hot) {
    module.hot.accept('./App.tsx', () => {
        const NextApp = require('./App.tsx').default as React.FC;
        renderApp(NextApp);
    });
}
