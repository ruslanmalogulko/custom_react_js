import utils from './react_utils';
import ReactDOM from './react-dom';

const { isClass, isStateless, isArray, isObject } = utils;

const manageChilds = (domElement, childs) => {
    return childs.forEach(child => {
        if (isObject(child)) {
            return domElement.appendChild(child);
        }
        if (isArray(child)) {
            return manageChilds(domElement, child);
        }
        if (typeof(child) === 'string' || typeof(child) === 'number') {
            return domElement.innerHTML += child;
        }
    });
};

const handleAttrs = (domElement, props) => {
    if (props) {
        Object.keys(props).forEach((key) => {
            if (key.indexOf('on') === 0) {
                domElement.addEventListener(key.substring(2).toLowerCase(), props[key]);
            } else {
                if (key === 'style') {
                    domElement.setAttribute(key,
                        Object.keys(props[key]).reduce((acc, item) => {
                            acc += `${item.replace( /([a-z])([A-Z])/g, '$1-$2' )
                                .toLowerCase()}: ${props[key][item]}; `; return acc}, ''))
                } else if ( key === 'className') {
                    domElement.className = props[key];
                } else {
                    domElement.setAttribute(key, props[key]);
                }
            }
        });
    }
};

let counterId = 0;
const classCache = {};

const buildElement = (el, props, childs) => {
    if (isClass(el)) {
        counterId++;

        const instance = classCache[counterId] ? classCache[counterId] : new el(props);

        if (!classCache[counterId]) {
            classCache[counterId] = instance;
        }

        instance.props = props;

        return instance.render();
    }

    if (isStateless(el)) {
        return el({ ...props, children: childs });
    }

    const domElement = document.createElement(el);

    manageChilds(domElement, childs);
    handleAttrs(domElement, props);

    return domElement;
};

const createElement = (el, props, ...childs) => {
    if (!window.rootReactElement) {
        window.rootReactElement = el;
    }
    return buildElement(el, props, childs);
};

const updateTree = () => {
    if (window.rootDomElement && window.rootReactElement) {
        const container = window.rootDomElement;

        counterId = 0;
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
        ReactDOM.render(React.createElement(window.rootReactElement, null, null), container);
    };
};

class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    render() {
        // will be overriden
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        updateTree();
    }
}

const React = {
    createElement,
    Component
};

export default React;