import React, { PureComponent } from 'react';
import Header from './header';
import RandomFilm from './random-film';
import ErrorButton from './error-button';
import ErrorIncator from './error-indicator/error-indicator';
import PeoplePage from './people-page';
import '../styles/index.css';
import '../styles/bootstrap.min.css';


export default class App extends PureComponent {
  state = {
    showRandomFilm: true,
    hasError: false
  };

  toggleRandomFilm = () => {
    this.setState((state) => {
      return {
        showRandomFilm: !state.showRandomFilm
      };
    });
  };

  componentDidCatch() {
    console.log("componentDidCatch()");
    this.setState({
      hasError: true
    });
  };

  render() {
    if(this.state.hasError) {
      return <ErrorIncator />;
    }

    const film = this.state.showRandomFilm ? <RandomFilm /> : null;
    return (
        <div>
            <Header />
            {film}
            <button className="toggle-film-button btn btn-warning btn-lg"
                    onClick={this.toggleRandomFilm}>
                Toggle Random film
            </button>
            <ErrorButton  className="menu-button"/>
            <PeoplePage />
            <PeoplePage />
            <PeoplePage />
            <footer className="page-footer">
              <hr />
              <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
              </div>
            </footer>
        </div>
    );
  };
};
