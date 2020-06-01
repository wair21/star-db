import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";

import './item-details.css';
import Spinner from "../spinner";

export default class ItemDetails extends Component {

    state = {
        itemId: null,
        loading: false
    };

    swapiService = new SwapiService();

    componentWillMount(props) {
        this.setState({itemId:props.itemId, loading:true});
    }

    componentDidMount(props) {
        this.updatePerson();
    };

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({itemId:this.props.itemId, loading:true});
            this.updatePerson();
        }
    };

    updatePerson() {
        const { itemId } = this.state;

        if(!itemId) {
            return;
        }

        this.swapiService
            .getPerson(itemId)
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
            <div className="item-details card">
                <img className="person-image" alt="empty 1"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

                <div className="card-body">
                    <h4>{name} {this.props.itemId}</h4>
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