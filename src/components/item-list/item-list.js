import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './item-list.css';
import Spinner from "../spinner";

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state= {
        peopleList: null
    }

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((peopleList) => {
                this.setState({
                    peopleList
                });
            });
    }

    /**
     * Create new item in people list
     * @param arr
     * @returns {*[]}
     */
    renderItems (arr) {
        if(!arr) {
            arr = [
                {
                 id: 1,
                 name: 'Luke'
                },
                {
                    id: 2,
                    name: 'Nikkie'
                }
            ];
        }
        return arr.map(({id, name}) => {
            return (
                <li key={id}
                    onClick={()=> this.props.onItemSelected(id)}
                    className="list-group-item">
                    {name}
                </li>
            );
        })
    }

    render() {
        const { peopleList } = this.state;

        if (peopleList) {
            return <Spinner/>
        }

        const itemList = this.renderItems(peopleList);

        return (
            <ul className="item-list list-group">
                {itemList}
            </ul>
        );
    }
}