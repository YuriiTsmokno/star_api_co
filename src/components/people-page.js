import React, { PureComponent } from 'react';
import ItemList from './item-list';
import PersonDetails from './person-details';
import ErrorIncator from './error-indicator/error-indicator';

export default class PeoplePage extends PureComponent {

  state = {
    selectedPerson: 4,
    hasError: false
  }

  componentDidCatch(error, info) {
    debugger;
    this.setState({
      hasError: true
    });
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson: selectedPerson
    });
  };

  render() {

    if(this.state.hasError) {
      return <ErrorIncator />
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    )
  }

}
