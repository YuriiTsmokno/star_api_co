import React, { PureComponent } from 'react';
import Header from './header';
import Footer from './footer';
//import RandomFilm from './random-film';
import ErrorIncator from './error-indicator/error-indicator';
import ErrorBoundary from './error-boundry';
import { 
    PersonList,
    PlanetList,
    StarshipList,
     } from './sw-components/item-lists';
import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from './sw-components/details'; 
import SwapiService from './services/index';
import '../styles/index.css';
import '../styles/bootstrap.min.css';



export default class App extends PureComponent {

  swapiService = new SwapiService();

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
    this.setState({
      hasError: true
    });
  };

  render() {
    if(this.state.hasError) {
      return <ErrorIncator />;
    }

    //const film = this.state.showRandomFilm ? <RandomFilm /> : null;

    return (
      <ErrorBoundary>
        <div className="swapi-app">
            <Header />
            <PersonDetails itemId={4} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={5} />
            <hr style={{background:"#444"}} />
            <PersonList />
            <hr style={{background:"#444"}} />
            <PlanetList />
            <hr style={{background:"#444"}} />
            <StarshipList />

            <Footer />
        </div>
      </ErrorBoundary>
    );
  };
};
