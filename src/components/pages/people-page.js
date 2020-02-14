import React, { PureComponent } from 'react';
import { PersonList } from '../sw-components/item-lists';
import PersonDetails from '../sw-components/person-details';
import Row from '../row';

export default class PeoplePage extends PureComponent {
    state = {
        selectedItem: 4
    };

    onItemSelected = (selectedItem) => {
        this.setState({ selectedItem });
    };

    render() {
        const { selectedItem } = this.state;

        return(
            <Row 
                left={<PersonList onItemSelected={this.onItemSelected} />} 
                right={<PersonDetails itemId={selectedItem} />} />
        );
    }
};