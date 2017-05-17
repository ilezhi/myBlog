import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import { Button } from 'react-toolbox/lib/button';

let source = [];
let md = null;

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: []
        }
    }
    componentDidMount() {
        md = new Editor();
        md.render();
    }
    render() {
        return (
            <div>
                <Input type='text' label='标题' />
                <Autocomplete 
                    direction='down'
                    allowCreate={true}
                    selectedPosition='above'
                    label='添加标签'
                    source={source}
                    onChange={this.handleChange}
                    value={this.state.countries}
                />
                <div>
                    <textarea></textarea>
                </div>
                <Button label='保存' raised onClick={this.saveArticle} />
            </div>
        );
    }
    handleChange = tags => {
        if (tags.length) {
            let newTag = tags[0];
            !source.includes(newTag) && source.push(newTag);
        }

        this.setState({countries: tags});
    };

    saveArticle = () => {
        // test
        let cont = md.codemirror.getValue();
        let param = {
            title: 'javascript',
            content: cont
        };
        fetch('/api/article/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(param)
        })
        .then(res => res.json())
        .then(resp => {
            console.log(resp)
        });
    }
}