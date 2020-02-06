import React, { PureComponent } from 'react';

export default class ItemList extends PureComponent {
    render() {
        return (
            <ul className="item-list list-group">
                <li className="list-group-item">Luke Skywalker</li>
                <li className="list-group-item">Darth Vader</li>
                <li className="list-group-item">R2-D2</li>
            </ul>
        );
    };
};
