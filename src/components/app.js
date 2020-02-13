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
import PersonDetails from './sw-components/person-details';
import PlanetDetails from './sw-components/planet-details';
import StarshipDetails from './sw-components/starship-details';
import SwapiService from './services/index';
import DummySwapiService from './services/dummy-swapi-service';
import { SwapiServiceProvider } from './swapi-service-context/swapi-service-context';

import '../styles/index.css';
import '../styles/bootstrap.min.css';



export default class App extends PureComponent { 

  state = {
    showRandomFilm: true,
    hasError: false,
    swapiService: new DummySwapiService()
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      }
    });
  }

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
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="swapi-app">
              <Header onServiceChange={this.onServiceChange} />
              <PersonDetails itemId={4} />
              <PlanetDetails itemId={5} />
              <StarshipDetails itemId={9} />
              <hr style={{background:"#444"}} />
              <PersonList />
              <hr style={{background:"#444"}} />
              <PlanetList />
              <hr style={{background:"#444"}} />
              <StarshipList />

              <Footer />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>

    );
  };
};
