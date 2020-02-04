import React from 'react';
import '../styles/bootstrap.min.css';
import SwapiService from '../services';

const App = () => {

    const swapi = new SwapiService();
    swapi.getPerson(3).then((p) => {
        /* people.forEach((p) => {
            console.log(p.name);
        }); */
        console.log(p.name);
    }); 
    
    return (<div>Hello World!</div>);
};

export default App;