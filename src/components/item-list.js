import React, { PureComponent } from 'react';
import Spinner from './spinner/spinner';
import ErrorIncator from './error-indicator/error-indicator';
import SwapiService from '../services/index';

export default class ItemList extends PureComponent {
  swapiService = new SwapiService();

  state = {
    peopleList: {},
    loading: true,
    error: false
  };

  onPeopleListLoaded = (peopleList) => {
    this.setState({
      peopleList,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      loading: false,
      error: true
    });
  };

  componentDidMount() {
    this.swapiService
        .getAllPeople()
        .then(this.onPeopleListLoaded)
        .catch(this.onError);
  };

  renderItems = (arr) => {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
  };

  render() {
    const { peopleList, loading, error } = this.state;
    const hasData = !(loading || error);
    const items = hasData ? this.renderItems(peopleList) : null;
    const spinner = loading ? <Spinner /> : null;
    const errMsg = error ? <ErrorIncator /> : null;

    return (
        <ul className="item-list list-group">
            {items}
            {spinner}
            {errMsg}
        </ul>
    );
  };
};
