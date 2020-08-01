import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page";
import './app.css';

import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";

/**
 * Главный компонент приложения
 */
export default class App extends Component{

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true
    }

    componentDidCatch(error, errorInfo) {
        // TODO сделать обработку  ошибок
        console.log('catch!!!');
    }

    render () {
        const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;

        const personDetails = (
          <ItemDetails
              getImageUrl={getPersonImage}
              getData={getPerson}
              itemId={11} />
        );

        const starshipDetails = (
          <ItemDetails
              getImageUrl={getStarshipImage}
              getData={getStarship}
              itemId={10} />
        );

        return (
            <div className="stardb-app">
                <ErrorBoundry>
                    <Header />
                    <Row
                        left={personDetails}
                        right={starshipDetails}
                        />

                </ErrorBoundry>


            </div>
            )

    };
};


/*

<div className="row mb2">
    <div className="col-md-6">
        <ItemList
            renderItem={(item) =>item.name}
            getData={this.swapiService.getAllPlanets}
            onItemSelected={this.onPersonSelected}/>
    </div>
    <div className="col-md-6">
        <ItemDetails personId={this.state.selectedPerson}/>
    </div>
</div>*/
