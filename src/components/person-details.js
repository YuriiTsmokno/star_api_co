import React, { PureComponent } from 'react';
import SwapiService from '../services/index';
import Spinner from './spinner/spinner';
import ErrorIncator from './error-indicator/error-indicator';
import ErrorButton from './error-button';

export default class PersonDetails extends PureComponent {
  swapiService = new SwapiService();

  state = {
    person: {},
    loading: true,
    error: false
  };

  onPersonLoaded = (person) => {
    this.setState({
      person,
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

  updatePerson = () => {
    const { personId } = this.props;
    if(!personId) {
      return;
    };
    this.swapiService
        .getPerson(personId)
        .then(this.onPersonLoaded)
        .catch(this.onError);
  };

  componentDidMount() {
    this.updatePerson();
  };

  componentDidUpdate(prevProps) {
    if(this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  render() {
    const { person, loading, error } = this.state;

    const errMsg = error ? <ErrorIncator /> : null;
    const spinner = loading ? <Spinner /> : null;

    const hasData = !(loading || error);
    const personView = hasData ? <PersonView person={person} /> : null;

    return (
      <div className="person-details card">
        {errMsg}
        {spinner}
        {personView}
      </div>
    );
  };
};

const PersonView = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor } = person;

  return <>
    <img className="person-image"
      src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      alt="person" />

    <div className="card-body">
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Gender:</span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Birth Year:</span>
          <span>{birthYear}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Eye Color:</span>
          <span>{eyeColor}</span>
        </li>
      </ul>
      <ErrorButton />
    </div>
  </>
};
