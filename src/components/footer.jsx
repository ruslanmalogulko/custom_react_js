import React from '../react_custom/react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { items } = this.props;
        return (
            <section className="footer">
                {!!items.length && `There are ${items.length} items in list.`}
            </section>
        );
    }
}

export default Footer;