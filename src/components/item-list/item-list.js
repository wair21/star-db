import React, { Component } from 'react';
import './item-list.css';
import Spinner from "../spinner";

export default class ItemList extends Component {

    state= {
        itemList: null
    }

    componentDidMount() {
        const {  getData } = this.props;
        getData()
            .then((itemList) => {
                this.setState({ itemList });
            });
    }

    /**
     * Create new item in item list
     * @param arr
     * @returns {*[]}
     */
    renderItems (arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = this.props.renderItem(item);
            return (
                <li key={id}
                    onClick={()=> this.props.onItemSelected(id)}
                    className="list-group-item">
                    {label}
                </li>
            );
        })
    }

    render() {
        const { itemList } = this.state;

        // If nothing - show spinner
        if (!itemList) {
            return <Spinner/>
        }

        const itemList2 = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                { itemList2 }
            </ul>
        );
    }
}