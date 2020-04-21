import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import Indicator from '../indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

    // Создание нового сервиса.
    swapiService = new SwapiService();

    state ={
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePlanet();
        this._interval = setInterval(this.updatePlanet, 5000);
    }

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false, error: false});
    };

    onError = (error) => {
        this.setState({error: true});
    };

    //  Update planet by request
    updatePlanet= () => {
        const id = Math.floor(Math.random()*25) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        const { planet, loading, error } = this.state;

        // While loading, show indicator
       let view;

       if(error) {
            view = <Indicator/>;
       } else {
           if (loading) {
               view = <Spinner/>;
           } else {
               view = <PlanetView planet={planet}/>;
           }
       }


        return (
            <div className="random-planet jumbotron rounded">
                {view}
            </div>
        );
    }
}

const PlanetView = ({planet}) => {
    const {  id, name, population, rotationPeriod, diameter } = planet;

    return (
     <React.Fragment>
         <img className="planet-image"
              src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
         <div>
             <h4>{name}</h4>
             <ul className="list-group list-group-flush">
                 <li className="list-group-item">
                     <span className="term">Population:</span>
                     <span>{population}</span>
                 </li>
                 <li className="list-group-item">
                     <span className="term">Rotation Period:</span>
                     <span>{rotationPeriod}</span>
                 </li>
                 <li className="list-group-item">
                     <span className="term">Diameter:</span>
                     <span>{diameter}</span>
                 </li>
             </ul>
         </div>
     </React.Fragment>
    );
};