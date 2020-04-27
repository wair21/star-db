import React, { Component } from 'react';
import './people-page.css';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import Indicator from "../indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row";

export default class PeoplePage extends Component {

    /**
     *
     * @type {{selectedPerson: number, hasError: boolean}}
     */
    state = {
        selectedPerson: 3, // initial person
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

        // if error, show text
        if (this.state.hasError) {
            return <Indicator/>
        }

        // List of persons
        const itemList = (
            <ItemList
                renderItem={({name, gender}) =>`${name}  (${gender})`}
                getData={this.swapiService.getAllPeople}
                onItemSelected={this.onPersonSelected}/>
        );

        // person detail component
        const personDetails = (
            <PersonDetails personId={this.state.selectedPerson}/>
        );

        return (
            <div>
                <Row
                    left={itemList}
                    right={personDetails}/>
            </div>
        )
    }
}
