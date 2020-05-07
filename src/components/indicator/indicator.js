import React from 'react';
import './indicator.css';

/**
 * Заглущка на случай ошибки отображения какого-либо компонента.
 * @returns {*}
 * @constructor
 */
const  Indicator = () => {
    return (
        <div className="error-indicator">
            <span className="boom"> BOOM! </span>
            <span> Something went wrong </span>
            <span> but we know and already solving this problem</span>
        </div>
    );
};

export default Indicator;