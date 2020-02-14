import React, { PureComponent } from 'react';
import { StarshipList } from '../sw-components/item-lists';
import StarshipDetails from '../sw-components/starship-details';
import Row from '../row';

export default class PeoplePage extends PureComponent {
    state = {
        selectedItem: 9
    };

    onItemSelected = (selectedItem) => {
        this.setState({ selectedItem });
    };

    render() {
        const { selectedItem } = this.state;

        return(
            <Row 
                left={<StarshipList onItemSelected={this.onItemSelected} />} 
                right={<StarshipDetails itemId={selectedItem} />} />
        );
    }
};