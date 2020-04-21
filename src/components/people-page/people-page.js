import React, { Component } from 'react';
import './people-page.css';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import Indicator from "../indicator";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {

    /**
     *
     * @type {{selectedPerson: number, hasError: boolean}}
     */
    state = {
        selectedPerson: 3,
        hasError: false
    }

    swapiService = new SwapiService();

    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson});
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    render() {

        if(this.state.hasError) {
            return <Indicator/>
        }

        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList
                        renderItem={({name, gender}) =>`${name}  (${gender})`}
                        getData={this.swapiService.getAllPeople}
                        onItemSelected={this.onPersonSelected}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson}/>
                </div>
            </div>
        )
    }
}