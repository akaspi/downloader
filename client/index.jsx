import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Store from './utils/Store';
import Root from './components/Root';

const store = new Store();

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);