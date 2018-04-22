import React from '../react_custom/react';

import Header from './header.jsx';
import Body from './body.jsx';
import Footer from './footer.jsx';

import './main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.removeItemHandler = this.removeItemHandler.bind(this);

        this.inputValue = '';
    }

    handleInput(event) {
        this.inputValue = event.target.value;
    }

    handleEnter(event) {
        if (event.key === 'Enter') {
            this.handleAdd();
        }
    }

    handleAdd() {
        if (!this.inputValue) return;

        const newItems = [...this.state.items, this.inputValue];
        this.inputValue = '';
        this.focusValue = document.querySelector('*:focus');
        this.setState({
            items: newItems
        });
        setTimeout(function (){document.querySelector('input').focus()}, 0);
    }

    handleRemove() {
        this.setState({
            items: []
        })
    }

    removeItemHandler(idx) {
        this.setState({
            items: this.state.items.filter((item, i) => (i !== idx) )
        })
    }

    render() {
        return (
            <div>
                <Header />
                <Body items={this.state.items} removeItemHandler={this.removeItemHandler}>
                    <input
                        placeholder="Input some value to add..."
                        className="input-new-value"
                        value={this.inputValue}
                        onKeyPress={this.handleInput}
                        onKeyDown={this.handleEnter}
                        />
                    <button className="control-button" onClick={this.handleAdd}>Add new item</button>
                    <button className="control-button" onClick={this.handleRemove}>Remove all items</button>
                </Body>
                <Footer items={this.state.items} />
            </div>
        );
    }
}

export default Main;