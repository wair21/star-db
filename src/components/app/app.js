import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page";
import './app.css';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";

export default class App extends Component{

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true
    }

    componentDidCatch(error, errorInfo) {
        console.log('catch!!!');
    }

    render () {
        return (
            <div>
                <Header />
                <RandomPlanet />
                <PeoplePage/>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            renderItem={(item) =>item.name}
                            getData={this.swapiService.getAllPlanets}
                            onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
            )

    };
};
