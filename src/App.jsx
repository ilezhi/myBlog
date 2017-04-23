import React, { Component } from 'react';

export default class App extends Component {
    componentDidMount() {
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({a: 1, b: 2})
        })
        .then(res => res.json())
        .then(res => console.log(res));
    }
    render() {
        return (
            <h1>This is react!</h1>
        )
    }
}