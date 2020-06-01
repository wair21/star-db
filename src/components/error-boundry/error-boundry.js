import React, { Component } from 'react';

import './error-boundry.css';
import Indicator from "../indicator";

export default class ErrorBoundry extends Component {
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