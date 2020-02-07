import React, { PureComponent } from 'react';
import Header from './header';
import RandomFilm from './random-film';
import ItemList from './item-list';
import PersonDetails from './person-details';
import '../styles/index.css';
import '../styles/bootstrap.min.css';


export default class App extends PureComponent {
  state = {
    showRandomFilm: true,
    selectedPerson: 4
  };

  toggleRandomFilm = () => {
    this.setState((state) => {
      return {
        showRandomFilm: !state.showRandomFilm
      };
    });
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };

  render() {
    const film = this.state.showRandomFilm ? <RandomFilm /> : null;

    return (
        <div >
            <Header />
            {film}
            <button className="toggle-film btn btn-warning btn-lg"
                    onClick={this.toggleRandomFilm}>
                Toggle Random film
            </button>
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onItemSelected={this.onPersonSelected} />
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson} />
                </div>
            </div>
        </div>
    );
  };
};
