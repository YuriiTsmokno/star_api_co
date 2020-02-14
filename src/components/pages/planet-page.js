import React, { PureComponent } from 'react';
import { PlanetList } from '../sw-components/item-lists';
import PlanetDetails from '../sw-components/planet-details';
import Row from '../row';

export default class PeoplePage extends PureComponent {
    state = {
        selectedItem: 7
    };

    onItemSelected = (selectedItem) => {
        this.setState({ selectedItem });
    };

    render() {
        const { selectedItem } = this.state;

        return(
            <Row 
                left={<PlanetList onItemSelected={this.onItemSelected} />} 
                right={<PlanetDetails itemId={selectedItem} />} />
        );
    }
};