import React from 'react';
import Header from './header';
import RandomFilm from './random-film';
import ItemList from './item-list';
import PersonDetails from './person-details';
import '../styles/index.css';
import '../styles/bootstrap.min.css';


const App = () => {
    return (
        <div>
            <Header />
            <RandomFilm />
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList />
                </div>
                <div className="col-md-6">
                    <PersonDetails />
                </div>
            </div>
        </div>
    );
};

export default App;