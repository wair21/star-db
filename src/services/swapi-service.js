/**
 * Класс вызова апи
 */
export default class SwapiService {

    // Base url.
    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        const rec = await fetch(`${this._apiBase}${url}`);

        // Если не все ок, то кидаем ошибку.
        if(!rec.ok) {
            throw new Error(`Could not fetch ${url}, received status ${rec.status}`);
        }

        return await rec.json();
    };

     /**  Get data by request  */
     // #region

    // Получение всех людей
    getAllPeople = async() => {
        const rec = await this.getResource(`/people/`);
        return rec.results.map(this._transformPeople);
    };

    // Получение информации по человеку по его id
    getPerson = async(id) => {
        const rec = await this.getResource(`/people/${id}/`);
        return this._transformPeople(rec);
    };

    // Получение всех планет
    getAllPlanets = async() => {
        const rec = await this.getResource(`/planets/`);
        return rec.results.map(this._transformPlanet);
    };

    // Получение информации по планете по его id
    getPlanet = async(id) => {
        const rec = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(rec);
    };

    // Получение всех кораблей
    getAllStarships = async() => {
        const rec = await this.getResource(`/starships/`);
        return rec.results.map(this._transformStarship);
    };

    // Получение информации по кораблю по его id
    getStarship = async(id) => {
        const rec = await this.getResource(`/starships/${id}`);
        return this._transformStarship(rec);
    };

    // #endregion


    /**  Work with data transformation */
    // #region

    /**
     * Get id from url.
     * @param item
     * @returns {string | *}
     * @private
     */
    _extractId = (item) => {
        const regexp = /\/([0-9]*)\/$/;
        return  item.url.match(regexp)[1];
    }

    // Преобразование данных планет
     _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    // Преобразование данных кораблей
     _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity,
        }
    }

    // Преобразование данных людей
     _transformPeople = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear ? person.birthYear : 'n/a',
            eyeColor: person.eyeColor ? person.eyeColor : 'n/a',
        }
    }

    // #endregion
}



