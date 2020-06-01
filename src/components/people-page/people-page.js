import React, { Component } from 'react';
import './people-page.css';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import Indicator from "../indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row";


class ErrorBoundry extends Component {

    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({hasError: true});
    }

    render () {
        if(this.state.hasError) {
            return <Indicator/>;
        }
        return this.props.children;
    }
}



/**
 * Копонент отображения персонажей
 */
export default class PeoplePage extends Component {

    /**
     *
     * @type {{selectedPerson: number, hasError: boolean}}
     */
    state = {
        selectedPerson: 3 // initial person
    }

    swapiService = new SwapiService();

    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson});
    }


    render() {

        // if error, show text
        if (this.state.hasError) {
            return <Indicator/>
        }

        // List of persons
        const itemList = (
            <ItemList
                getData={this.swapiService.getAllPeople}
                onItemSelected={this.onPersonSelected}>
                {(i) => (`${i.name}  (${i.birthYear})`)}
            </ItemList>
        );

        // person detail component
        const personDetails = (
            <ErrorBoundry>
                <PersonDetails personId={this.state.selectedPerson}/>
            </ErrorBoundry> 
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
