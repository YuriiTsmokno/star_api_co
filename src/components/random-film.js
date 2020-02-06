import React, { PureComponent } from 'react';
import SwapiService from '../services';
import Spinner from './spinner/spinner';
import ErrorIncator from './error-indicator/error-indicator';

export default class RandomFilm extends PureComponent {
    swapiService = new SwapiService();

    state = {
        film: {},
        loading: true,
        error: false
    };

    constructor() {
        super();
        this.updateFilm();
    };

    onFilmLoaded = (film) => {
        this.setState({
          film,
          loading: false
        });
    };

    onError = (err) => {
      this.setState({
        error: true,
        loading: false
      });
    };

    updateFilm() {
        const id = 20000;
        this.swapiService
            .getFilm(id)
            .then(this.onFilmLoaded)
            .catch(this.onError);
    };

    render() {
        const { film, loading, error } = this.state;
        const hasData = !(loading || error);
        const errMsg = error ? <ErrorIncator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <FilmView film={film} /> : null;
        return (
            <div className="random-film jumbotron rounded">
              {spinner}
              {content}
              {errMsg}
            </div>
        );
    };
};

const FilmView = ({ film }) => {
  const { id, title, director, producer, releaseDate } = film;
  return <>
    <img className="film-image"
        src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`}
        alt="film" />
    <div>
        <h4>{title}</h4>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <span className="term">Director:</span>
                <span>{director}</span>
            </li>
            <li className="list-group-item">
                <span className="term">Producer:</span>
                <span>{producer}</span>
            </li>
            <li className="list-group-item">
                <span className="term">Release Date:</span>
                <span>{releaseDate}</span>
            </li>
        </ul>
    </div>
  </>
}
