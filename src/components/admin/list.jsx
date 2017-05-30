import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';


class ArticleList extends Component {
    render() {
        return (
            <div>
                <div>
                    <Button icon="create" mini floating />
                </div>
                <div>
                    <List>
                        <ListItem caption="javascript" rightIcon="edit delete" />
                    </List>
                </div>
            </div>
        );
    }
}


export default ArticleList;
