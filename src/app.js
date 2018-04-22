import ReactDOM from './react_custom/react-dom';
import React from './react_custom/react';
import Main from './components/main.jsx';


ReactDOM.render(
    React.createElement(Main, null, null),
    document.getElementById('app')
);

