import React from 'react';
import ItemDetails, { Record } from '../item-details';
import withSwapiService from '../hoc-helpers/withSwapiService';

const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="model" label="Model:" />
            <Record field="length" label="Length:" />
            <Record field="costInCredits" label="Price:" />
        </ItemDetails>
    )
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    }
};

export default withSwapiService(mapMethodsToProps)(StarshipDetails);