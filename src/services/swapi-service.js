/**
 * Класс вызова апи
 */
export default class SwapiService {

    _apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const rec = await fetch(`${this._apiBase}${url}`);

        // Если не все ок, то кидаем ошибку.
        if(!rec.ok) {
            throw new Error(`Could not fetch ${url}, received status ${rec.status}`);
        }

        return await rec.json();
    }

    // Получение всех людей
    async getAllPeople() {
        const rec = await this.getResource(`/people/`);
        return rec.results;
    }

    // Получение информации по человеку по его id
    getPerson(id) {
        return this.getResource(`/people/${id}`);
    }

    // Получение всех планет
    async getAllPlanets() {
        const rec = await this.getResource(`/planets/`);
        return rec.results;
    }

    // Получение информации по планете по его id
    getPlanet(id) {
        return this.getResource(`/planets/${id}`);
    }
    // Получение всех кораблей
    async getAllStarships() {
        const rec = await this.getResource(`/starships/`);
        return rec.results;
    }

    // Получение информации по кораблю по его id
    getStarship(id) {
        return this.getResource(`/starships/${id}`);
    }
}

const swapi = new SwapiService();
swapi.getAllPeople()
    .then((rec) => {
        console.log(rec);
    });




