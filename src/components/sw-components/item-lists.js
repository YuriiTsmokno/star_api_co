import React from 'react';
import ItemList from '../item-list';
import withData from '../hoc-helpers/withData';
import SwapiService from '../services/index';

const swapiService = new SwapiService();
const { getAllPeople, getAllPlanents, getAllStarships } = swapiService;

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    };
};

const renderName = ({name}) => <span>{name}</span>;
const renderNameAndModel = ({name, model}) => <span>{name} ({model})</span>;

const PersonList = withData(withChildFunction(ItemList, renderName), getAllPeople);
const PlanetList = withData(withChildFunction(ItemList, renderName), getAllPlanents);
const StarshipList = withData(withChildFunction(ItemList, renderNameAndModel), getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
};