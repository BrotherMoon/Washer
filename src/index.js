import React from 'react';
import {render} from 'react-dom';
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import App from './App';

render(<App />, document.getElementById('app'));

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        render(<App />, document.getElementById('app'));
    });
}
