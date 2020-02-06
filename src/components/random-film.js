import React, { PureComponent } from 'react';
import SwapiService from '../services';
import Spinner from './spinner/spinner';

export default class RandomFilm extends PureComponent {
    swapiService = new SwapiService();

    state = {
        film: {},
        loading: true
    };

    constructor() {
        super();
        this.updateFilm();
    }

    onFilmLoaded = (film) => {
        this.setState({
          film,
          loading: false
        });
    };

    updateFilm() {
        const id = 2;
        this.swapiService
            .getFilm(id)
            .then(this.onFilmLoaded);
    }

    render() {
        const { film, loading } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <FilmView film={film} /> : null;
        return (
            <div className="random-film jumbotron rounded">
              {spinner}
              {content}
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
