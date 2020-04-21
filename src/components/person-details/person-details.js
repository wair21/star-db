import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";

import './person-details.css';
import Spinner from "../spinner";

export default class PersonDetails extends Component {

    state = {
        personId: null,
        loading: false
    };

    swapiService = new SwapiService();

    componentDidMount(props) {
        this.updatePerson()
    };

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.setState({personId:this.props.personId, loading:true});
            this.updatePerson();
        }
    };

    updatePerson() {
        const { personId } = this.state;

        if(!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({person, loading: false});
            })
    }



    render() {

        if(!this.state.person) {
            return <span>There is no info. Try again. </span>
        }

        const { id, name, gender, birthYear, eyeColor} = this.state.person;

        if (this.state.loading) {
            return <Spinner/>
        }

        return (
            <div className="person-details card">
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

                <div className="card-body">
                    <h4>{name} {this.props.personId}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender:</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year:</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color:</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}