import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';

export default class App extends Component {
    render() {
        return (
            <div className="title">
                <h1>This is react!</h1>
                <Button label="click" />
            </div>
        );
    }
}