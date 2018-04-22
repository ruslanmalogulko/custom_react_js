import React from '../react_custom/react';

const Item = ({ item, idx, removeItemHandler }) => (
    <li className="list-item">
        <div className="close-button" onClick={() => removeItemHandler(idx)}></div>
        <div>{item}</div>
    </li>
);

const Body = ({ items, children, removeItemHandler }) => (
    <section>
        <ul>
            {items.length ?
                items.map((item, idx) => <Item item={item} idx={idx} removeItemHandler={removeItemHandler} />) :
                'There is no items in list yet.'
            }
        </ul>
        <div className="controls">
            {children}
        </div>
    </section>
);

export default Body;