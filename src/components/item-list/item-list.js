import React, { Component } from 'react';
import './item-list.css';
import Spinner from "../spinner";

/**
 * Компонент отображения даннных в виде списка
 */
export default class ItemList extends Component {

    // itemList - список сущностей для отображения
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
            const label = this.props.children(item);
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

       // Пока грузится, показываем индикатор загрузки.
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