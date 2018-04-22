import * as utils from './react_utils';

const render = (el, domEl) => {
    if (!window.rootDomElement) {
        window.rootDomElement = domEl;
    }

    if (typeof(el) === 'function') {
        return domEl.appendChild(el());
    }
    console.log('Rendering main tree...')
    return domEl.appendChild(el);
};

const ReactDOM = {
    render
};

export default ReactDOM;