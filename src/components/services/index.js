export default class SwapiService {

    _apiBase = 'https://swapi.co/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img';
    
    getResource = async(url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    };

    getAllPeople = async() => {
        const res = await this.getResource(`/people/`);
        return res.results.map((person) => {
          return this._transformPerson(person);
        });
    };

    getPerson = async(id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    };

    getAllPlanents = async() => {
        const res = await this.getResource('/planets/');
        return res.results.map((planet) => {
          return this._transformPlanet(planet);
        });
    };

    getPlanet = async(id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    };

    getAllStarships = async() => {
        const res = await this.getResource(`/starships/`);
        return res.results.map((starship) => {
          return this._transformStarship(starship);
        });
    };

    getStarship = async(id) => {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    };

    getAllFilms = async() => {
        const res = await this.getResource(`/films/`);
        return res.results.map((film) => {
          return this._transformFilm(film);
        });
    };

    getFilm = async(id) => {
        const film = await this.getResource(`/films/${id}/`);
        return this._transformFilm(film);
    };

    getPersonImage = ({id}) => {
        return `${this._imageBase}/characters/${id}.jpg`;
    };

    getStarshipImage = ({id}) => {
        return `${this._imageBase}/starships/${id}.jpg`;
    };

    getPlanetImage = ({id}) => {
        return `${this._imageBase}/planets/${id}.jpg`;
    };

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    _transformFilm = (film) => {
        return {
            id: this._extractId(film),
            title: film.title,
            director: film.director,
            producer: film.producer,
            releaseDate: film.release_date
        };
    };

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        };
    };

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        };
    };

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        };
    };
}
