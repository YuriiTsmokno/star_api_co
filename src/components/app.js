import React, { PureComponent } from 'react';
import Header from './header';
import Footer from './footer';
import RandomFilm from './random-film';
import ErrorIncator from './error-indicator/error-indicator';
import ErrorBoundary from './error-boundry';
import SwapiService from './services/swapi-service';
import DummySwapiService from './services/dummy-swapi-service';
import { SwapiServiceProvider } from './swapi-service-context/swapi-service-context';
import PeoplePage from './pages/people-page';
import PlanetPage from './pages/planet-page';
import StarshipPage from './pages/starship-page';
import '../styles/index.css';
import '../styles/bootstrap.min.css';



export default class App extends PureComponent { 

  state = {
    showRandomFilm: true,
    hasError: false,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      }
    });
  }

  componentDidCatch() {
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
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="swapi-app">
              <Header onServiceChange={this.onServiceChange} />
              {film}
              <hr style={{background:"#444"}} />
              <PeoplePage />
              <hr style={{background:"#444"}} />
              <PlanetPage />
              <hr style={{background:"#444"}} />
              <StarshipPage />
              <Footer />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  };
};
