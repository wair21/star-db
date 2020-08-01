import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";

import './item-details.css';
import Spinner from "../spinner";

export default class ItemDetails extends Component {

    state = {
        itemId: null,
        loading: false,
        getData: null,
        getImageUrl: function () {

        }
    };

    swapiService = new SwapiService();

    componentWillMount(props) {
        const {itemId, getData, getImageUrl} = this.props;
        this.setState({ itemId, getData, getImageUrl });
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

    /**
     *  Update item info
     */
    updatePerson() {
        const { itemId, getData, getImageUrl } = this.state;

        if(!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({item,
                    loading: false,
                    getImageUrl: getImageUrl(item)
                });
            })
    }


    render() {
        const {getImageUrl} = this.state;

        if(!this.state.item) {
            return <span>There is no info. Try again. </span>
        }

        const { id, name, gender, birthYear, eyeColor} = this.state.item;

        if (this.state.loading) {
            return <Spinner/>
        }

        return (
            <div className="item-details card">
                <img className="person-image" alt="empty 1"
                     src={getImageUrl} />

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