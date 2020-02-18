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
import StarshipDetails from './sw-components/starship-details';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login-page';
import SecretPage from './pages/secret-page';
import '../styles/index.css';
import '../styles/bootstrap.min.css';




export default class App extends PureComponent { 

  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  onExit = () => {
    this.setState({
      isLoggedIn: false
    });
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

    const { isLoggedIn } = this.state;

    if(this.state.hasError) {
      return <ErrorIncator />;
    }

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="swapi-app">
                <Header onServiceChange={this.onServiceChange} />
                <RandomFilm />
                <Switch>
                  <Route path="/" render={() => <h2 style={{textAlign:"center"}}>Welcome to SW_API</h2>} exact />
                  <Route path="/people/:id?" component={PeoplePage} />
                  <Route path="/planents" component={PlanetPage} />
                  <Route path="/starships" component={StarshipPage} exact />
                  <Route path="/starships/:id" 
                        render={({ match }) => {
                          const { id } = match.params;
                          return <StarshipDetails itemId={id} />;
                        }} />
                  <Route path="/login"
                        render={() => (
                          <LoginPage isLoggedIn={isLoggedIn}
                                      onLogin={this.onLogin} />
                        )} />
                  <Route path="/secret"
                        render={() => (
                          <SecretPage isLoggedIn={isLoggedIn} 
                                      onExit={this.onExit}/>
                        )} />
                  <Route render={() => (<h2 style={{textAlign:"center"}}>404 - Page not found!</h2>)}/>
                </Switch>
                <Footer />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  };
};
