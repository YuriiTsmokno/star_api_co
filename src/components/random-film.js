import React, { PureComponent } from 'react';
import SwapiService from './services/swapi-service';
import Spinner from './spinner/spinner';
import ErrorIncator from './error-indicator/error-indicator';

export default class RandomFilm extends PureComponent {
    swapiService = new SwapiService();

    state = {
      film: {},
      loading: true,
      error: false
    };

    onFilmLoaded = (film) => {
      this.setState({
        film,
        loading: false,
        error: false
      });
    };

    onError = (err) => {
      this.setState({
        error: true,
        loading: false
      });
    };

    updateFilm = () => {
      const id = Math.floor(Math.random() * 7) + 1;
      this.swapiService
          .getFilm(id)
          .then(this.onFilmLoaded)
          .catch(this.onError);
    };

    componentDidMount() {
      this.updateFilm();
      this.interval = setInterval(this.updateFilm, 3000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {

        const { film, loading, error } = this.state;

        const errMsg = error ? <ErrorIncator /> : null;
        const spinner = loading ? <Spinner /> : null;

        const hasData = !(loading || error);
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
