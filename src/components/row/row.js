import React from 'react';
import './row.css';

// Wrapper to show left and right lists
/**
 * КОмпонент обертка для отображения
 * списка элементов слева и деталей элемента справа на экране
 * @param left
 * @param right
 * @returns {*}
 * @constructor
 */
const Row = ({left, right}) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    );
}

export default Row;



