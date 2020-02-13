import React, { PureComponent } from 'react';
import ItemList from './item-list';
import PersonDetails from './person-details';
import Row from './row';
import ErrorBoundry from './error-boundry';
import SwapiService from './services/index';


export default class PeoplePage extends PureComponent {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 4
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson: selectedPerson
    });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
          {(item) => {
            return `${item.name} (${item.birthYear})`;
          }}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return (
      <>
        <Row left={itemList} right={personDetails} />
      </>
    );
  };
};
